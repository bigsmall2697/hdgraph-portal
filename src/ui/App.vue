<template>
    <div id="app">
        <Header />
        <div class="main">
            <router-view />
        </div>
        <Footer />
        <Alerts />
        <ZoomTopButton />
        <ModalLogOut
            v-model="isOpen"
            forgot
        />
        <ModalReportError v-model="errorIsOpen" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext, watch } from "@vue/composition-api";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Alerts from "./components/Alerts.vue";
import ZoomTopButton from "./components/ZoomTopButton.vue";
import ModalLogOut from "./components/ModalLogOut.vue";
import ModalReportError from "./components/ModalReportError.vue";
import { getters } from "./store";

export default defineComponent({
    components: {
        Header,
        Footer,
        Alerts,
        ZoomTopButton,
        ModalLogOut,
        ModalReportError
    },
    model: { event: "error" },
    setup(props: {}, context: SetupContext) {
        const isInterface = computed(() => {
            if (context.root != null) {
                if (context.root.$route != null) {
                    return context.root.$route.path.startsWith("/interface");
                }
            }

            return false;
        });

        const isOpen = computed(() => !isInterface.value &&
                getters.isLoggedIn() &&
                getters.hasBeenToInterface());

        const errorIsOpen = ref(false);
        watch(
            () => getters.hasError(),
            (newValue: boolean) => {
                errorIsOpen.value = newValue;
            }
        );

        return {
            isOpen,
            errorIsOpen
        };
    }
});
</script>

<style lang="postcss" scoped>
#app {
    background-color: var(--color-peral);
    display: flex;
    flex-direction: column;
    font-family: "Montserrat", sans-serif;
    min-height: inherit;
}

.main {
    display: flex;
    flex-direction: column;

    /* to force the footer to the bottom of the page. */
    flex-grow: 1;

    /* NOTE: this is required because of Header */
    padding-block-start: 85px;
}
</style>
