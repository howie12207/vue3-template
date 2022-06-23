<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMeta } from 'vue-meta';
import { useCommonStore } from '@/stores/common';
import { version } from '../package.json';
import BaseLoading from '@/components/baseLoading/BaseLoading.vue';
import LayoutDefault from '@/layout/LayoutDefault.vue';

useMeta({
    htmlAttrs: { lang: 'zh-TW' },
});

const commonStore = useCommonStore();

// Layout
const route = useRoute();
const blank = computed(() => {
    return route.meta.blank;
});

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
        <Transition name="page-fade">
            <Component v-if="blank" :is="Component" />
            <LayoutDefault v-else>
                <Transition name="page-fade">
                    <Component :is="Component" />
                </Transition>
            </LayoutDefault>
        </Transition>
    </RouterView>

    <Transition name="fade">
        <BaseLoading v-if="commonStore.isLoading" />
    </Transition>
</template>
