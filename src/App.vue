<script setup>
import { useMeta } from 'vue-meta';

useMeta({
    htmlAttrs: { lang: 'zh-TW' },
});
</script>

<template>
    <metainfo>
        <template #title="{ content }">
            {{ content ? `${content} | Template` : 'Template' }}
        </template>
    </metainfo>

    <div>
        <RouterView />
    </div>
</template>
