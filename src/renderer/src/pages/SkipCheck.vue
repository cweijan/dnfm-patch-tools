<template>
    <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="原NPK" name="sourceNpk" :rules="[{ required: true, message: '请选择NPK文件!' }]">
            <a-input-group compact>
                <a-input v-model:value="formState.sourceNpk" style="width: calc(100% - 50px)" allow-clear />
                <a-tooltip title="选择文件">
                    <a-button @click="chooseFile('sourceNpk')">
                        <template #icon>
                            <CopyOutlined />
                        </template>
                    </a-button>
                </a-tooltip>
            </a-input-group>
        </a-form-item>
        <a-form-item label="修改后的NPK" name="targetNpk" :rules="[{ required: true, message: '请选择NPK文件!' }]">
            <a-input-group compact>
                <a-input v-model:value="formState.targetNpk" style="width: calc(100% - 50px)" allow-clear />
                <a-tooltip title="选择文件">
                    <a-button @click="chooseFile('targetNpk')">
                        <template #icon>
                            <CopyOutlined />
                        </template>
                    </a-button>
                </a-tooltip>
            </a-input-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit" @click="reqFill">
                开始处理
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { CopyOutlined } from '@ant-design/icons-vue';
import { handler, sendIPC } from '@renderer/util/ipcSender';
import { message } from 'ant-design-vue';

const formState = reactive({ sourceNpk: '', targetNpk: '', });

const chooseFile = (type: string) => {
    sendIPC('chooseFile', { type })
}

handler.on('file', ({ type, path }) => {
    switch (type) {
        case 'sourceNpk':
            formState.sourceNpk = path
            break
        case 'targetNpk':
            formState.targetNpk = path
            break
    }
})

const reqFill = () => {
    if (!formState.sourceNpk || !formState.targetNpk) {
        message.error('请选择NPK文件!');
        return
    }
    sendIPC('skipCheck', formState)
}

</script>