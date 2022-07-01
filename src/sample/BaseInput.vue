<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useMeta } from 'vue-meta';
import BaseInput from '@/components/baseInput/BaseInput.vue';
import { required, email, url, idNumber, atLeast } from '@/components/baseInput/rules';
import type { Ref } from 'vue';

type BaseInput = Ref<{ validateNow: (val?: string) => void } | null>;

useMeta({
    title: 'Sample BaseInput',
});

const accountRef: BaseInput = ref(null);
const passwordRef: BaseInput = ref(null);
const emailRef: BaseInput = ref(null);
const urlRef: BaseInput = ref(null);
const idNumberRef: BaseInput = ref(null);
const verifyCodeRef: BaseInput = ref(null);

const formData = reactive({
    account: '123',
    password: '',
    email: '',
    url: '',
    idNumber: '',
    verifyCode: '123',
});

const validList = reactive({
    account: false,
    password: false,
    email: false,
    url: false,
    idNumber: false,
    verifyCode: false,
});

const rules = {
    account: [
        {
            validate: (value: string) => {
                return test(value);
            },
            errMsg: '錯誤',
        },
    ],
    password: [required()],
    email: [email()],
    url: [url()],
    idNumber: [idNumber()],
    verifyCode: [atLeast(5)],
};

const validateAll = async () => {
    const res = await Promise.all([
        accountRef.value?.validateNow(),
        passwordRef.value?.validateNow(),
        emailRef.value?.validateNow(),
        urlRef.value?.validateNow(),
        idNumberRef.value?.validateNow(),
        verifyCodeRef.value?.validateNow(),
    ]);
    /* eslint-disable-next-line */
    console.log(res);
};

const test = async (value: string | number) => {
    const res = await new Promise(res => {
        setTimeout(() => {
            res('123');
        }, 1000);
    });
    return res === value;
};
</script>

<template>
    <div class="w-60">
        <BaseInput
            ref="accountRef"
            v-model:modalValue="formData.account"
            v-model:isValid="validList.account"
            label="帳號"
            id="account"
            :rules="rules.account"
        />
        <BaseInput
            ref="passwordRef"
            v-model:modalValue="formData.password"
            v-model:isValid="validList.password"
            label="密碼"
            type="password"
            id="password"
            :rules="rules.password"
        />
        <BaseInput
            ref="emailRef"
            v-model:modalValue="formData.email"
            v-model:isValid="validList.email"
            label="信箱"
            id="email"
            :rules="rules.email"
        />
        <BaseInput
            ref="urlRef"
            v-model:modalValue="formData.url"
            v-model:isValid="validList.url"
            label="網址"
            id="url"
            :rules="rules.url"
        />
        <BaseInput
            ref="idNumberRef"
            v-model:modalValue="formData.idNumber"
            v-model:isValid="validList.idNumber"
            label="身分證"
            id="idNumber"
            upperCase
            :rules="rules.idNumber"
        />
        <BaseInput
            ref="verifyCodeRef"
            v-model:modalValue="formData.verifyCode"
            v-model:isValid="validList.verifyCode"
            label="驗證碼"
            id="verifyCode"
            upperCase
            :rules="rules.verifyCode"
        />
        <button @click="validateAll">測試</button>
    </div>
</template>
