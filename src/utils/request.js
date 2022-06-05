import axios from 'axios';
// import { ElMessage } from 'element-plus';
// import { basePath } from '@/config/apiPath';
// import { useUserInfoStore } from '@/stores/userInfo';

const service = axios.create({
    baseURL: '',
    timeout: 12000,
    headers: {},
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        /* eslint-disable-next-line */
        console.error(`Axios request error: ${error}`);
        return Promise.resolve(false);
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data;
        return res;
    },
    error => {
        /* eslint-disable-next-line */
        console.error(`Axios response error: ${error}`);
        return Promise.resolve(false);
    }
);

export default service;
