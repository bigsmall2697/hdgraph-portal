<template>
    <div class="save-my-keystore-cards">
        <span class="body-title">{{
            $t("keystoreWarningCards.saveMyKeystoreFile")
        }}</span>

        <div class="card">
            <!-- <img
                :src="noLoseIcon"
                alt=""
                class="card-image"
            > -->
            <MaterialDesignIcon
                class="card-image"
                :icon="mdiLock"
            />
            <div class="card-body-wrapper">
                <span class="card-header">{{
                    $t("keystoreWarningCards.dontLoseIt")
                }}</span>
                <p class="card-body">
                    {{
                        $t("keystoreWarningCards.beCarefulItCanNotBeRecovered")
                    }}
                </p>
            </div>
        </div>

        <div class="card">
            <!-- <img
                :src="noShareIcon"
                alt=""
                class="card-image"
            > -->
            <MaterialDesignIcon
                class="card-image"
                :icon="mdiShareOff"
            />
            <div class="card-body-wrapper">
                <span class="card-header">{{
                    $t("keystoreWarningCards.dontShareIt")
                }}</span>
                <p class="card-body">
                    {{ $t("keystoreWarningCards.yourFundsWillBeStolen") }}
                </p>
            </div>
        </div>

        <div class="card">
            <!-- <img
                :src="makeBackupIcon"
                alt=""
                class="card-image"
            > -->
            <MaterialDesignIcon
                class="card-image"
                :icon="mdiContentCopy"
            />
            <div class="card-body-wrapper">
                <span class="card-header">{{
                    $t("keystoreWarningCards.makeABackup")
                }}</span>
                <p class="card-body">
                    {{ $t("keystoreWarningCards.secureIt") }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    mdiLock,
    mdiShareOff,
    mdiContentCopy
} from "@mdi/js";
import { defineComponent } from "@vue/composition-api";

import MaterialDesignIcon from "./MaterialDesignIcon.vue";

// import noLoseIcon from "../assets/icon-no-lose.svg";
// import noShareIcon from "../assets/icon-no-share.svg";
// import makeBackupIcon from "../assets/icon-make-backup.svg";

export default defineComponent({
    name: "KeystoreWarningCards",
    components: { MaterialDesignIcon },
    setup() {
        return {
            mdiLock,
            mdiShareOff,
            mdiContentCopy
        };
    }
});
</script>

<style lang="postcss" scoped>
.save-my-keystore-cards {
    display: flex;
    flex-flow: column nowrap;
    margin-block-end: 40px;
}

.body-title {
    color: var(--color-washed-black);
    font-size: 20px;
    font-weight: 500;
    margin-block-end: 40px;
    margin-inline: auto;
}

.card {
    align-items: center;
    background-color: var(--color-peral);
    border-radius: 4px;
    display: flex;
    flex-flow: row nowrap;
    margin-block-end: 7px;
    padding: 10px 20px;
}

.card-image {
    height: 80px;
    width: 60px;
    margin: 0 auto;
    margin-inline-end: 20px;
}

.card-body-wrapper {
    display: flex;
    flex-flow: column;
    text-align: start;
    flex: 1;
}

.card-header {
    font-size: 16px;
    font-weight: 500;
    margin-block-end: 5px;
}

.card-body {
    color: var(--color-china-blue);
    font-size: 14px;
    margin: 0;
    padding: 0;
}
</style>
