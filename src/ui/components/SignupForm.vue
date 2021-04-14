<template>
    <form
        class="signup-form"
        @submit.prevent="$emit('submit')"
    >
        <div
            v-if="state.error && state.error.general"
            class="general-error"
        >
            {{ state.error.general }}
        </div>

        <TextInput
            ref="inputEmail"
            :placeholder="$t('signupForm.enterEmail')"
            :value="state.email"
            :error="state.error && state.error.email"
            :valid="emailValid"
            :spellcheck-disabled="true"
            show-validation
            class="input-email"
            @input="handleEmailInput"
        />

        <TextInput
            ref="inputFname"
            :placeholder="$t('signupForm.enterFirstname')"
            :value="state.fname"
            :valid="fnameValid"
            :spellcheck-disabled="true"
            show-validation
            class="input-email"
            @input="handleFnameInput"
        />

        <TextInput
            ref="inputLname"
            :placeholder="$t('signupForm.enterLastname')"
            :value="state.lname"
            :valid="lnameValid"
            :spellcheck-disabled="true"
            show-validation
            class="input-email"
            @input="handleLnameInput"
        />

        <TextInput
            ref="inputPassword"
            class="input-email"
            :value="state.password"
            :placeholder="$t('common.password.nineCharacters')"
            obscure
            @input="handlePasswordInput"
        />

        <Button
            class="button-signup-submit"
            :label="$t('common.signup.submit')"
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
            class="button-signup-google"
            @click.prevent="$emit('googleSignup')"
        >
            <img
                class="social-icon"
                :src="googleSocial"
                alt=""
            >
            {{ $t('createAccount.signupWithGoogle') }}
        </button>
        <button
            class="button-signup-facebook"
            @click.prevent="$emit('facebookSignup')"
        >
            <img
                class="social-icon"
                :src="facebookSocial"
                alt=""
            >
            {{ $t('createAccount.signupWithFacebook') }}
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
    fname: string;
    lname: string;
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
        const fnameValid = ref<boolean>(false);
        const lnameValid = ref<boolean>(false);
        const inputEmail = ref<HTMLInputElement | null>(null);
        const inputPassword = ref<HTMLInputElement | null>(null);
        const inputFname = ref<HTMLInputElement | null>(null);
        const inputLname = ref<HTMLInputElement | null>(null);

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function isEmailValid(): Promise<boolean> {
            const re = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;
            return re.test(props.state.email);
        }

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function isPasswordValid(): Promise<boolean> {
            return Promise.resolve(props.state.password.length >= 9);
        }

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function isFirstnameValid(): Promise<boolean> {
            return Promise.resolve(props.state.fname.length > 0);
        }

        // eslint-disable-next-line unicorn/consistent-function-scoping
        async function isLastnameValid(): Promise<boolean> {
            return Promise.resolve(props.state.lname.length > 0);
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

        watch(
            () => props.state.fname,
            () => {
                // eslint-disable-next-line promise/always-return, promise/catch-or-return
                isFirstnameValid().then((result) => {
                    fnameValid.value = result;
                });
            }
        );

        watch(
            () => props.state.lname,
            () => {
                // eslint-disable-next-line promise/always-return, promise/catch-or-return
                isLastnameValid().then((result) => {
                    lnameValid.value = result;
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

        function handleFnameInput(value: string): void {
            props.state.error = null;
            context.emit("change", { ...props.state, fname: value });
        }

        function handleLnameInput(value: string): void {
            props.state.error = null;
            context.emit("change", { ...props.state, lname: value });
        }

        return {
            inputEmail,
            inputPassword,
            inputFname,
            inputLname,
            emailValid,
            passwordValid,
            fnameValid,
            lnameValid,
            handleEmailInput,
            handlePasswordInput,
            handleFnameInput,
            handleLnameInput,
            facebookSocial,
            googleSocial
        };
    }
});
</script>

<style lang="postcss" scoped>
.signup-form {
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

.general-error {
    width: 100%;
    text-align: center;
    color: var(--color-warm-pink);
    margin-bottom: 16px;
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

.button-signup-submit {
    margin-block: 10px 20px;
}

.button-signup-google {
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

.button-signup-facebook {
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

.button-signup-google .social-icon {
    width: 24px;
    height: 24px;
    margin-right: 16px;
}

.button-signup-facebook .social-icon {
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
