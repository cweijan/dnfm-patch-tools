<template>
    <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="onFinish" @finish-failed="onFinishFailed">
        <a-form-item label="原NPK" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="修改后的NPK" name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">
                开始处理
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

interface FormState {
    username: string;
    password: string;
    remember: boolean;
}

const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
});
const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>