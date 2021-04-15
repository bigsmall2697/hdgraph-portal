<template>
    <Modal
        :is-open="state.isOpen"
        :title="$t('modalVerificationSent.title')"
    >
        <template>
            <div class="modal-container">
                <img
                    :src="paperFly"
                    alt=""
                    class="check-icon"
                >
                <div class="check-your-email">
                    {{ $t('modalVerificationSent.checkEmail') }}<a
                        :href="`mailto:${state.email}`"
                        class="email-address"
                    >{{ state.email }}</a>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";

import paperFly from "../assets/paperfly-icon.png";

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
        return { paperFly };
    }
});
</script>

<style lang="postcss" scoped>
.modal-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.check-icon {
    width: 120px;
    height: 100px;
    margin-bottom: 20px;
}

.check-your-email {
    text-align: center;
}

.email-address {
    color: var(--color-melbourne-cup);
}
</style>
