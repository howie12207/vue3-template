<script setup>
import { useCommonStore } from '@/stores/common';
import { useMeta } from 'vue-meta';

useMeta({
    title: '首頁',
});

const commonStore = useCommonStore();
</script>

<template>
    <div>{{ commonStore.test }}</div>
</template>
