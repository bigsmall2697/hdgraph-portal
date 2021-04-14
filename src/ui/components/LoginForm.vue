
<template>
    <form
        class="login-form"
        @submit.prevent="$emit('submit')"
    >
        <TextInput
            ref="inputEmail"
            :placeholder="$t('loginForm.enterEmail')"
            :value="state.email"
            :error="state.error && state.error.email"
            :valid="emailValid"
            :spellcheck-disabled="true"
            show-validation
            class="input-email"
            @input="handleEmailInput"
        />
        <TextInput
            ref="inputPassword"
            class="input-password"
            :value="state.password"
            :error="state.error && state.error.password"
            :placeholder="$t('common.password.nineCharacters')"
            obscure
            @input="handlePasswordInput"
        />
        <div class="forgot-password">
            {{ $t("accessMyAccount.forgotYourPassword") }}
            <router-link :to="{ name: 'forgot-password' }">
                {{ $t("accessMyAccount.resetIt") }}
            </router-link>
        </div>
        <Button
            class="button-login-submit"
            :label="$t('common.login.submit')"
            :busy="state.isBusy"
            :disabled="!emailValid || !passwordValid"
        />
        <div class="other-methods">
            <div class="left-bar" />
            <div class="or-text">
                or
            </div>
            <div class="right-bar" />
        </div>
        <button
            class="button-login-google"
            @click.prevent="$emit('googleLogin')"
        >
            <img
                class="social-icon"
                :src="googleSocial"
                alt=""
            >
            {{ $t('accessMyAccount.loginWithGoogle') }}
        </button>
        <button
            class="button-login-facebook"
            @click.prevent="$emit('facebookLogin')"
        >
            <img
                class="social-icon"
                :src="facebookSocial"
                alt=""
            >
            {{ $t('accessMyAccount.loginWithFacebook') }}
        </button>
        <CustomerSupportLink />
    </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, SetupContext, watch } from "@vue/composition-api";

import facebookSocial from "../assets/facebook.png";
import googleSocial from "../assets/google.svg";

import Warning from "./Warning.vue";
import TextInput from "./TextInput.vue";
import Button from "./Button.vue";
import Modal from "./Modal.vue";
import CustomerSupportLink from "./CustomerSupportLink.vue";
import CommunitySocialIcon from "./CommunitySocialIcon.vue";

export interface State {
    email: string;
    password: string;
    isBusy: boolean;
    error: any;
}

export default defineComponent({
    name: "ModalAccessByPrivateKey",
    components: {
        Button,
        Modal,
        CustomerSupportLink,
        CommunitySocialIcon,
        TextInput,
        Warning
    },
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: (Object as unknown) as PropType<State> },
    setup(props: { state: State }, context: SetupContext) {
        const emailValid = ref<boolean>(false);
        const passwordValid = ref<boolean>(false);
        const inputEmail = ref<HTMLInputElement | null>(null);
        const inputPassword = ref<HTMLInputElement | null>(null);

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function isEmailValid(): Promise<boolean> {
            const re = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;
            return re.test(props.state.email);
        }

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function isPasswordValid(): Promise<boolean> {
            return Promise.resolve(props.state.password.length >= 9);
        }

        watch(
            () => props.state.email,
            () => {
                if (props.state.email.length === 0) {
                    // Back out now if we have an empty value
                    emailValid.value = false;
                }

                // eslint-disable-next-line promise/always-return, promise/catch-or-return
                isEmailValid().then((result) => {
                    emailValid.value = result;
                });
            }
        );

        watch(
            () => props.state.password,
            () => {
                if (props.state.password.length === 0) {
                    // Back out now if we have an empty value
                    passwordValid.value = false;
                }

                // eslint-disable-next-line promise/always-return, promise/catch-or-return
                isPasswordValid().then((result) => {
                    passwordValid.value = result;
                });
            }
        );

        function handleEmailInput(email: string): void {
            props.state.error = null;
            context.emit("change", { ...props.state, email });
        }

        function handlePasswordInput(value: string): void {
            props.state.error = null;
            context.emit("change", { ...props.state, password: value });
        }

        return {
            inputEmail,
            inputPassword,
            emailValid,
            passwordValid,
            handleEmailInput,
            handlePasswordInput,
            facebookSocial,
            googleSocial
        };
    }
});
</script>

<style lang="postcss" scoped>
.login-form {
    align-items: stretch;
    display: flex;
    flex-direction: column;
    min-width: 400px;

    @media (max-width: 768px) {
        min-width: unset;
        padding: 0 25px;
        width: 100%;
    }
}

.input-email {
    margin-block-end: 10px;
}

.forgot-password {
    text-align: center;
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
    margin: 20px 0;

    @media (max-width: 600px) {
        padding: 20px 0;
    }
}

.button-login-submit {
    margin-block: 10px 20px;
}

.button-login-google {
    border: none;
    border-radius: 4px;
    outline: none;
    background: #ef4538;
    color: var(--color-white);
    font-size: 14px;
    font-weight: 500;
    padding: 16px 18px;
    margin-bottom: 16px;
    cursor: pointer;
    transition: 0.1s all linear;

    &:hover,
    &:focus {
        box-shadow: 0 5px 24px rgba(0, 0, 0, 0.3);
        transform: translateY(-2px);
    }
}

.button-login-facebook {
    border: none;
    border-radius: 4px;
    outline: none;
    background: #3664A2;
    color: var(--color-white);
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
    padding: 1px 18px;
    cursor: pointer;
    transition: 0.1s all linear;

    &:hover,
    &:focus {
        box-shadow: 0 5px 24px rgba(0, 0, 0, 0.3);
        transform: translateY(-2px);
    }
}

.button-login-google .social-icon {
    width: 24px;
    height: 24px;
    margin-right: 16px;
}

.button-login-facebook .social-icon {
    width: 54px;
    height: 54px;
    margin-right: 4px;
}

a {
    color: var(--color-melbourne-cup);
    cursor: pointer;
    text-decoration: none;
}

.other-methods {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.left-bar, .right-bar {
    background: var(--color-silver-polish);
    height: 1px;
    flex: 1;
}

.or-text {
    color: var(--color-china-blue);
    font-size: 14px;
    font-weight: 400;
    margin: 0 24px;
}
</style>
