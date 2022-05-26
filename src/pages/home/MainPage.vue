<script setup>
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore();
</script>

<template>
    <div>{{ commonStore.test }}</div>
</template>
