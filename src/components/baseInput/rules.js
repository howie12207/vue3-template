const isEmpty = value => {
    if (value === null || value === undefined || value === '') return true;
    return false;
};

export const required = (errMsg = '必填項，請勿空白') => ({
    validate: value => !isEmpty(value),
    errMsg,
});

export const email = (errMsg = '信箱格式錯誤') => ({
    validate: value => {
        if (isEmpty(value)) return true;
        return /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
        );
    },
    errMsg,
});

export const url = (errMsg = '網址格式錯誤') => ({
    validate: value => {
        try {
            if (isEmpty(value)) return true;
            new URL(value);
            return true;
        } catch {
            return false;
        }
    },
    errMsg,
});

export const number = (errMsg = '只能輸入數字') => ({
    validate: value => !/[^0-9]/.test(value),
    errMsg,
});

export const decimal = (errMsg = '只能輸入數字或小數') => ({
    validate: value => /^(\d+)(\.\d+)?$/.test(value),
    errMsg,
});

export const en = (errMsg = '只能輸入英文') => ({
    validate: value => /^[a-zA-Z]*$/.test(value),
    errMsg,
});

export const enAndNumber = (errMsg = '只能輸入英文或數字') => ({
    validate: value => /^[a-zA-Z0-9]*$/.test(value),
    errMsg,
});

export const idNumber = (errMsg = '身分證格式錯誤') => ({
    validate: value => {
        if (isEmpty(value)) return true;
        value = value.toUpperCase();
        const tab = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
        const A1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3];
        const A2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5];
        const Mx = [9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

        if (value.length != 10) return false;

        let i = tab.indexOf(value.charAt(0));
        if (i === -1) return false;

        let sum = A1[i] + A2[i] * 9;
        for (i = 1; i < 10; i++) {
            const v = parseInt(value.charAt(i));
            if (isNaN(v)) return false;
            sum = sum + v * Mx[i];
        }

        if (sum % 10 != 0) return false;

        return true;
    },
    errMsg,
});

export const only = (length, errMsg = `只能輸入 ${length} 位字元`) => ({
    validate: value => {
        if (isEmpty(value)) return true;
        return value.length === length;
    },
    errMsg,
});

export const between = (min, max, errMsg = `只能輸入 ${min} ~ ${max} 位字元`) => ({
    validate: value => {
        if (isEmpty(value)) return true;
        return value.length >= min && value.length <= max;
    },
    errMsg,
});

export const atLeast = (length, errMsg = `至少輸入 ${length} 位字元`) => ({
    validate: value => {
        if (isEmpty(value)) return true;
        return value.length >= length;
    },
    errMsg,
});
