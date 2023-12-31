<template>
    <Modal
        :is-open="state.isOpen"
        :title="$t('modalAddTransfer.title')"
        @change="handleChange"
    >
        <form @submit.prevent.stop="handleSubmit">
            <IDInput
                v-model="transfer.to"
                class="input"
                :label="$t('common.toAccount')"
            />

            <br>

            <div>
                <span class="label">
                    Asset
                </span>
                <AssetInput
                    class="input"
                    @asset="handleAsset"
                    @amount="handleAmount"
                />
            </div>

            <br>

            <br>

            <Button
                :label="$t('modalAddTransfer.add')"
                type="submit"
            />
        </form>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "@vue/composition-api";
import { BigNumber } from "bignumber.js";

import AssetInput from "./AssetInput.vue";
import Button from "./Button.vue";
import IDInput from "./IDInput.vue";
import Modal from "./Modal.vue";

export interface State {
    isOpen: boolean;
}

export default defineComponent({
    name: "ModalAddTransfer",
    model: {
        prop: "state",
        event: "change"
    },
    props: { state: { type: Object as PropType<State>, required: true }},
    components: {
        AssetInput,
        Button,
        IDInput,
        Modal
    },
    setup(props, context) {
        const transfer = reactive({
            from: "",
            to: "",
            asset: "",
            amount: new BigNumber(0)
        });

        function handleAsset(asset: string): void {
            transfer.asset = asset;
        }

        function handleAmount(amount: BigNumber): void {
            transfer.amount = amount;
        }

        function handleSubmit(): void {
            context.emit("submit", {
                from: transfer.from,
                to: transfer.to,
                asset: transfer.asset,
                amount: transfer.amount
            });
        }

        function handleChange(): void {
            context.emit("change", { ...props.state, isOpen: false });
        }

        return {
            transfer,
            handleAsset,
            handleAmount,
            handleSubmit,
            handleChange
        };
    }
});
</script>

<style lang="postcss" scoped>
.input {
    padding-block-end: 5px;
}

.label {
    display: block;
    font-size: 16px;
    font-weight: 600;
    height: 24px;
    margin-block-end: 13px;
    padding: 0 8px;
}
</style>
