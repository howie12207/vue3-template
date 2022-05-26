import { defineStore } from 'pinia';

export const useCommonStore = defineStore({
    id: 'common',
    state: () => ({
        test: 'commonTest',
    }),
    actions: {},
});
