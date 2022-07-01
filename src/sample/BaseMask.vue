<script setup lang="ts">
import { ref } from 'vue';
import { useMeta } from 'vue-meta';
import BaseMask from '@/components/baseMask/BaseMask.vue';
import BasePopup from '@/components/baseMask/BasePopup.vue';

useMeta({
    title: 'Sample BaseMask',
});

const popupTarget = ref('');
const switchPopup = (target: string) => {
    popupTarget.value = target;
};
</script>

<template>
    <div>
        <button @click="switchPopup('defaultMask')">開啟預設mask</button>
        <br />
        <button @click="switchPopup('defaultPopup')">開啟預設popup</button>
        <br />
        <button @click="switchPopup('customPopup')">開啟自訂義popup</button>

        <BaseMask v-if="popupTarget === 'defaultMask'" @close="switchPopup" closeOut />

        <BasePopup v-else-if="popupTarget === 'defaultPopup'" @close="switchPopup" closeOut>
            <template #content="{ close }">
                <div class="h-80">123</div>
                <div class="h-80">123</div>
                <div class="h-80">123</div>
                <button @click="close">關閉</button>
            </template>
        </BasePopup>

        <BaseMask
            v-else-if="popupTarget === 'customPopup'"
            @close="switchPopup"
            closeOut
            animationPopup=""
            customClass="fixed top-[20%] left-1/2 -translate-x-1/2"
        >
            <template #default="{ close }">
                <div class="bg-white p-20">
                    123
                    <button @click="close">關閉</button>
                </div>
            </template>
        </BaseMask>
    </div>
</template>
