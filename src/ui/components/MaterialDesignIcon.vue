<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        :class="{ 'mdi-spin': spin, 'mdi-slow-spin': slowSpin }"
        v-on="this.$listeners"
    >
        <path :d="icon" />
    </svg>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    name: "MaterialDesignIcon",
    props: {
        spin: Boolean,
        slowSpin: Boolean,
        size: { type: Number, default: 24 },
        icon: { type: String, required: true }
    }
});
</script>

<style scoped lang="postcss">
@keyframes mdi-spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.mdi-spin {
    animation: mdi-spin 2s infinite linear;

    @media screen and (prefers-reduced-motion: reduce) {
        animation: none;
    }
}

.mdi-slow-spin {
    animation: mdi-spin 4s infinite linear;

    @media screen and (prefers-reduced-motion: reduce) {
        animation: none;
    }
}
</style>
