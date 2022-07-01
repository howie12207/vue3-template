<script setup lang="ts">
import { ref, computed } from 'vue';

type InputValue = string;

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    modalValue: {
        type: String,
        default: '',
    },
    isValid: {
        type: Boolean,
        default: true,
    },
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
        validator: (value: string) => ['text', 'password', 'number'].includes(value),
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    maxlength: {
        type: String,
        default: '',
    },
    inputmode: {
        type: String as () => 'text' | 'numeric' | 'decimal',
        default: 'text',
    },
    rules: {
        type: Array as () => Array<{
            validate: (value: string) => Promise<boolean> | boolean;
            errMsg: string;
        }>,
        default: () => [],
    },
    upperCase: {
        type: Boolean,
        default: false,
    },
    clearBtn: {
        type: Boolean,
        default: true,
    },
    disableInputValid: {
        type: Boolean,
        default: false,
    },
    // multi: {
    //     type: Boolean,
    //     default: false,
    // },
});
const emits = defineEmits(['update:modalValue', 'update:isValid', 'input', 'change', 'blur']);

const inputRef = ref(null);

// type
const showPassword = ref(false);
const typeFilter = computed(() => {
    if (props.type !== 'password') return props.type;
    return showPassword.value ? 'text' : 'password';
});

const clean = () => {
    emits('input', '');
    emits('update:modalValue', '');
    activate.value = false;
};

// Input
const onInput = (e: { target: HTMLInputElement }) => {
    let value = e.target.value;
    if (props.upperCase) value = value.toUpperCase();
    emits('input', value);
    emits('update:modalValue', value);
    if (activate.value && !props.disableInputValid) validate(value);
};

// Change
const onChange = (e: { target: HTMLInputElement }) => {
    emits('change', e);
};

// Blur
const onBlur = (e: { target: HTMLInputElement }) => {
    activate.value = true;
    validate(e.target.value);
    emits('blur', e);
};

// Validate
const activate = ref(false);
const validate = async (value: InputValue) => {
    // no rules return valid tur
    if (props.rules.length === 0) emits('update:isValid', true);

    let isValid = true;
    for (const item of props.rules) {
        const valid = await item.validate(value);
        if (valid) continue;
        isValid = false;
        errMsg.value = item.errMsg;
        break;
    }
    emits('update:isValid', isValid);
    return isValid;
};
const errMsg = ref('');

const validateNow = async (value = props.modalValue) => {
    activate.value = true;
    const res = await validate(value);
    return res;
};

defineExpose({
    validateNow,
});
</script>

<template>
    <section :class="[{ 'error-item': activate && !props.isValid }, 'mx-4']">
        <div>
            <slot name="label">
                <label :for="id">{{ props.label }}</label>
            </slot>
            <div></div>
        </div>

        <div
            :class="[
                'flex items-center rounded border border-solid border-gray-300 transition focus-within:border-blue-500 hover:border-gray-500',
                { 'border-red-500': activate && !props.isValid },
            ]"
        >
            <input
                ref="inputRef"
                class="w-full bg-transparent px-2 py-1 outline-0"
                :id="props.id"
                :value="props.modalValue"
                :type="typeFilter"
                :placeholder="props.placeholder"
                :disabled="props.disabled"
                :maxlength="props.maxlength"
                :inputmode="props.inputmode"
                @input="onInput"
                @change="onChange"
                @blur="onBlur"
            />
            <Transition name="fade">
                <FAIcon
                    class="mr-1 h-4 w-4 cursor-pointer transition hover:text-gray-500"
                    v-if="props.type === 'password' && props.modalValue"
                    :icon="showPassword ? 'eye' : 'eye-slash'"
                    @click="showPassword = !showPassword"
                />
            </Transition>
            <Transition name="fade">
                <FAIcon
                    class="mr-1 h-2 w-2 cursor-pointer rounded-full border border-solid border-gray-300 p-1 transition hover:border-gray-500"
                    v-if="props.clearBtn && props.modalValue"
                    icon="times"
                    @click="clean"
                />
            </Transition>
        </div>
        <div class="h-5 overflow-hidden">
            <Transition name="fade-up">
                <div class="text-sm text-red-500" v-if="activate && !props.isValid">
                    {{ errMsg }}
                </div>
            </Transition>
        </div>
    </section>
</template>
