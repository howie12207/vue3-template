<script setup>
import { computed } from 'vue';
import BaseMask from './BaseMask.vue';

const props = defineProps({
    width: {
        type: String,
        // only use px; % has problem
        default: '400px',
    },
    title: {
        type: String,
        default: '',
    },
    duration: {
        type: Number,
        default: 300,
    },
    closeOut: {
        type: Boolean,
        default: false,
    },
    center: {
        type: Boolean,
        default: false,
    },
    customClass: {
        type: String,
        default: '',
    },
    animationMask: {
        type: String,
        default: 'fade',
        validator(value) {
            return ['', 'fade'].includes(value);
        },
    },
    animationPopup: {
        type: String,
        default: 'slide-down',
        validator(value) {
            return ['', 'slide-down', 'slide-left'].includes(value);
        },
    },
});
const emit = defineEmits(['close', 'submit']);
const closeEmit = () => {
    emit('close');
};

const style = computed(() => {
    return {
        '--popup-width': props.width,
    };
});
</script>

<template>
    <BaseMask
        :duration="duration"
        :close-out="closeOut"
        :customClass="customClass"
        :animation-mask="animationMask"
        :animation-popup="animationPopup"
        @close="closeEmit"
    >
        <template #default="{ close }">
            <div
                :style="style"
                :class="[
                    'relative mx-auto w-[var(--popup-width)] max-w-full rounded-lg bg-white p-4',
                    props.center && 'text-center',
                ]"
            >
                <FAIcon
                    icon="times"
                    class="absolute top-4 right-4 cursor-pointer transition hover:opacity-80"
                    @click="close"
                />
                <div v-if="title" class="mb-4 pb-2 text-lg font-bold">{{ title }}</div>

                <div class="my-4 max-h-[calc(80vh_-_120px)] overflow-y-auto">
                    <slot name="content" :close="close"></slot>
                </div>
            </div>
        </template>
    </BaseMask>
</template>
