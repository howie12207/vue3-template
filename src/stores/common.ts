import { defineStore } from 'pinia';

export const useCommonStore = defineStore({
    id: 'common',
    state: () => ({
        isLoading: false,
        test: 'commonTest',
    }),
    actions: {},
});
