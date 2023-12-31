<template>
    <CirclePage>
        <div class="wrap">
            <div class="title-wrap">
                <div class="page-title">
                    {{ $t("convertUnits.title") }}
                </div>
                <div class="page-subtitle">
                    {{ $t("convertUnits.ourHelpfulConversionTool") }}
                </div>
            </div>

            <div>
                <UnitConverter />
            </div>

            <div class="hbar-unit-reference-guide">
                <div class="block-title">
                    {{ $t("convertUnits.hbarUnitReferenceGuide") }}
                </div>

                <div class="unit-table">
                    <table>
                        <tbody>
                            <tr
                                v-for="hu in hbarUnitRef"
                                :key="hu.key"
                            >
                                <td>{{ hu.name }}</td>
                                <template>
                                    <div class="sub-row-container">
                                        <td class="amount">
                                            {{ hu.amount }} {{ hu.symbol }}
                                        </td>
                                        <td class="amount-hbar">
                                            {{ hu.amountInHbar }} ℏ
                                        </td>
                                    </div>
                                </template>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </CirclePage>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

import UnitConverter from "../components/UnitConverter.vue";
import CirclePage from "../components/CirclePage.vue";

export default defineComponent({
    components: {
        UnitConverter,
        CirclePage
    },
    props: {},
    setup() {
        const hbarUnitRef = [
            {
                name: "Tinybar",
                symbol: "tℏ",
                amount: "100,000,000",
                amountInHbar: "1"
            },
            {
                name: "Microbar",
                symbol: "μℏ",
                amount: "1,000,000",
                amountInHbar: "1"
            },
            {
                name: "Milibar",
                symbol: "mℏ",
                amount: "1,000",
                amountInHbar: "1"
            },
            {
                name: "Hbar",
                symbol: "ℏ",
                amount: "1",
                amountInHbar: "1"
            },
            {
                name: "Kilobar",
                symbol: "kℏ",
                amount: "1",
                amountInHbar: "1,000"
            },
            {
                name: "Megabar",
                symbol: "Mℏ",
                amount: "1",
                amountInHbar: "1,000,000"
            },
            {
                name: "Gigabar",
                symbol: "Gℏ",
                amount: "1",
                amountInHbar: "1,000,000,000"
            }
        ];
        return { hbarUnitRef };
    }
});
</script>

<style lang="postcss" scoped>
.wrap {
    margin: 0 auto;
    max-width: 1024px;
    padding: 100px 20px;

    @media (max-width: 500px) {
        padding: 5px 20px;
    }
}

.title-wrap {
    margin-block-end: 60px;
    margin-block-start: 0;
    text-align: center;

    @media (max-width: 500px) {
        margin-block-end: 15px;
    }
}

.page-title {
    font-size: 45px;
    font-weight: 500;
    margin: 0;

    @media (max-width: 500px) {
        font-size: 40px;
    }
}

.page-subtitle {
    color: var(--color-china-blue);
    font-size: 14px;
    margin: 0 auto;
    margin-block-start: 20px;
    max-width: 700px;

    @media (max-width: 500px) {
        margin-block-start: 5px;
    }
}

.hbar-unit-reference-guide {
    background-color: var(--color-boysenberry-shadow-transparent);
    border-radius: 5px;
    margin-block-start: 60px;
    padding-block-start: 20px;
}

.block-title {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
}

.unit-table {
    color: var(--color-washed-black);
    margin-block-start: 20px;
}

table {
    border-top: 1px solid var(--color-jupiter);
    width: 100%;
}

tr {
    border-bottom: 1px solid var(--color-jupiter);
    position: relative;

    @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px 0;
    }
}

td {
    padding: 18px 10px;
    position: relative;

    @media (max-width: 500px) {
        padding: 0 10px;
    }
}

tr > td:first-child {
    @media (max-width: 500px) {
        font-weight: 500;
    }
}

.sub-row-container > td:last-child {
    @media (max-width: 500px) {
        text-align: end;
    }

    @media (max-width: 336px) {
        white-space: nowrap;
    }
}

.sub-row-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-block-start: 5px;
}

span {
    font-size: 9px;
    margin-block-start: -10px;
    position: absolute;
}

.unit-short {
    position: relative;
}
</style>
