<template>
    <Modal
        :is-open="state.isOpen"
        :title="$t('modalVerificationSent.title')"
    >
        <template>
            <img
                :src="imageCheck"
                alt=""
            >
            <div class="check-your-email">
                {{ $t('modalVerificationSent.checkEmail') }}<a
                    :href="`mailto:${state.email}`"
                    class="email-address"
                >{{ state.email }}</a>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";

import imageCheck from "../assets/circle.png";

import Modal from "./Modal.vue";

export interface State {
    isOpen: boolean;
    email: string;
}

interface Props {
    state: State;
}

export default defineComponent({
    name: "ModalVerificationSent",
    components: { Modal },
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: (Object as unknown) as PropType<State> },
    setup() {
        return { imageCheck };
    }
});
</script>

<style lang="postcss" scoped>
.check-icon {
    width: 120px;
    height: 120px;
}

.check-your-email {}

.email-address {
    color: var(--color-melbourne-cup);
}
</style>
