<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';

const props = defineProps({
    duration: {
        type: Number,
        default: 300,
    },
    closeOut: {
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
        validator(value: string) {
            return ['', 'fade'].includes(value);
        },
    },
    animationPopup: {
        type: String,
        default: 'slide-down',
        validator(value: string) {
            return ['', 'slide-down', 'slide-left'].includes(value);
        },
    },
});
const emit = defineEmits(['close']);
onMounted(() => {
    show.value = true;
    document.body.style.overflow = 'hidden';
});
onUnmounted(() => {
    show.value = false;
    document.body.style.overflow = 'initial';
});
const closeHandle = () => {
    if (props.closeOut) close();
};
const show = ref(false);
const close = () => {
    show.value = false;
    setTimeout(() => {
        emit('close');
        document.body.style.overflow = 'initial';
    }, props.duration);
};
const style = computed(() => {
    return {
        '--popup-duration': `${props.duration / 1000}s`,
    };
});
</script>

<template>
    <Teleport to="body">
        <Transition :name="animationMask">
            <div
                v-show="show"
                class="fixed top-0 left-0 z-40 h-screen w-screen bg-black/40"
                :style="style"
                @click="closeHandle"
            >
                <Transition :name="animationPopup">
                    <div
                        v-show="show"
                        :class="[
                            customClass ||
                                'fixed top-1/2 left-1/2 max-h-[80vh] max-w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-2xl',
                        ]"
                        @click.stop
                    >
                        <slot :close="close"></slot>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active {
    animation: fade var(--popup-duration) ease forwards;
}

.fade-leave-active {
    animation: fade var(--popup-duration) ease forwards reverse;
}

.slide-down-enter-active {
    animation: slide-down var(--popup-duration) ease forwards;
}

.slide-down-leave-active {
    animation: slide-down var(--popup-duration) ease forwards reverse;
}

.slide-left-enter-active {
    animation: slide-left var(--popup-duration) ease forwards;
}

.slide-left-leave-active {
    animation: slide-left var(--popup-duration) ease forwards reverse;
}

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes slide-down {
    0% {
        opacity: 0;
        transform: translate(-50%, calc(-50vh - 100%));
    }

    60% {
        transform: translate(-50%, -50%);
    }

    75% {
        transform: translate(-50%, -48%);
    }

    100% {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
}
@keyframes slide-left {
    0% {
        transform: translate(100%, -50%);
        opacity: 0;
    }

    100% {
        transform: translateX(0, -50%);
        opacity: 1;
    }
}
</style>
