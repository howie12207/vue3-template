<script setup>
import { useMeta } from 'vue-meta';
import { useCommonStore } from '@/stores/common';
import { version } from '../package.json';
import BaseLoading from '@/components/baseLoading/BaseLoading.vue';

useMeta({
    htmlAttrs: { lang: 'zh-TW' },
});

const commonStore = useCommonStore();

/* eslint-disable-next-line */
console.info(
    `version: %c${version}`,
    'color:white;background:#ff9f19;padding: 2px 0.5em; border-radius: 10px'
);
</script>

<template>
    <Metainfo>
        <template #title="{ content }">
            {{ content ? `${content} | Template` : 'Template' }}
        </template>
    </Metainfo>

    <RouterView v-slot="{ Component }">
        <Transition name="page_fade">
            <Component :is="Component" />
        </Transition>
    </RouterView>

    <Transition name="fade">
        <BaseLoading v-if="commonStore.isLoading" />
    </Transition>
</template>
