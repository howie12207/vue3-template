import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/home/MainPage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        // {
        //     path: '/login',
        //     name: 'login',
        //     meta: {
        //         blank: true,
        //         noAuth: true,
        //     },
        //     component: Login,
        // },
        {
            path: '/baseInput',
            name: 'baseInput',
            component: () => import('@/sample/BaseInput.vue'),
        },
        {
            path: '/baseMask',
            name: 'baseMask',
            component: () => import('@/sample/BaseMask.vue'),
        },

        {
            path: '/:pathMatch(.*)*',
            name: 'Not found',
            redirect: '/',
        },
    ],
});

export default router;
