<template>
    <div class="create-account">
        <div class="wrap">
            <PageTitle :title="state.title">
                {{ $t("createAccount.wantToLogin") }}
                <router-link :to="{ name: 'access-my-account' }">
                    {{ $t("common.accessMyAccount") }}
                </router-link>
            </PageTitle>
            <MaterialDesignIcon
                v-if="state.isBusy"
                :icon="mdiLoading"
                class="spinner action"
                spin
            />
            <img
                v-if="state.verified"
                src="../assets/verify-icon.png"
                alt=""
                class="verify-icon"
            >
            <div
                v-if="state.error"
                class="general-error"
            >
                {{ state.error }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mdiLoading } from "@mdi/js";
import { defineComponent, reactive, onMounted } from "@vue/composition-api";

import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import PageTitle from "../components/PageTitle.vue";

import firebase from "firebase";

interface State {
    title: any;
    isBusy: boolean;
    verified: boolean;
    error: any;
}

export default defineComponent({
    name: "EmailVerified",
    components: {
        MaterialDesignIcon,
        PageTitle
    },
    setup(props, context) {
        const state: State = reactive({ title: context.root.$t("createAccount.verificationPending"), isBusy: false, verified: false, error: null });

        onMounted(async() => {
            try {
                state.isBusy = true;

                if (!firebase.auth().isSignInWithEmailLink(window.location.href)) {
                    throw new Error("EMAIL_LINK_INCORRECT");
                }

                const user = JSON.parse(window.localStorage.getItem("signupInfo") || "");
                const result = await firebase.auth().signInWithEmailLink(user.email, window.location.href);
                // eslint-disable-next-line no-console
                console.log(result);

                // const addUserFunc = firebase.functions().httpsCallable("addUser");
                // await addUserFunc({
                //     userData: {
                //         uid: "",
                //         user_email: user.email || "",
                //         user_fname: user.fname || "",
                //         user_lname: user.lname || "",
                //         phone: user.phone || ""
                //     }
                // });
                window.localStorage.removeItem("signupInfo");

                state.title = context.root.$t("createAccount.verificationSuccess");
                state.verified = true;
                state.error = null;
            } catch (error) {
                state.title = context.root.$t("createAccount.verificationFailed");
                state.error = context.root.$t("createAccount.verificationError");
            } finally {
                state.isBusy = false;
            }
        });

        return {
            state,
            mdiLoading
        };
    }
});
</script>

<style lang="postcss" scoped>
a {
    color: var(--color-melbourne-cup);
    cursor: pointer;
    text-decoration: none;
}

a:hover,
a:focus {
    text-decoration: underline;
}

.create-account {
    display: flex;
    flex-direction: column;
}

.wrap {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 80px 0;

    @media (max-width: 600px) {
        padding: 20px 0;
    }
}

.verify-icon {
    width: 200px;
    height: 200px;
}

.general-error {
    width: 100%;
    text-align: center;
    color: var(--color-warm-pink);
    margin-bottom: 24px;
    margin-bottom: 24px;
}
</style>
