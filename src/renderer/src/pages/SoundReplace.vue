<template>
    <div>
        <a-card title="替换为韩服语音" style="width: 450px" class="mb-5">
            <p class="text-red-500">
                只对安卓格斗家有效
            </p>
            <p>1. 使用UABEA打开韩服语音NPK</p>
            <p>2. 对NPK进行压缩, 压缩级别选择LZMA </p>
            <p>3. 生成替换补丁, 将修改后的文件替换到DNF手游文件目录</p>
        </a-card>
        <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="国服NPK" name="sourceNpk" :rules="[{ required: true, message: '请选择NPK文件!' }]">
                <a-input-group compact>
                    <a-input v-model:value="formState.sourceNpk" style="width: calc(100% - 50px)" allow-clear />
                    <a-tooltip title="选择文件">
                        <a-button @click="chooseFile('sourceNpk2')">
                            <template #icon>
                                <CopyOutlined />
                            </template>
                        </a-button>
                    </a-tooltip>
                </a-input-group>
            </a-form-item>
            <a-form-item label="韩服NPK" name="targetNpk" :rules="[{ required: true, message: '请选择NPK文件!' }]">
                <a-input-group compact>
                    <a-input v-model:value="formState.targetNpk" style="width: calc(100% - 50px)" allow-clear />
                    <a-tooltip title="选择文件">
                        <a-button @click="chooseFile('targetNpk2')">
                            <template #icon>
                                <CopyOutlined />
                            </template>
                        </a-button>
                    </a-tooltip>
                </a-input-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit" @click="reqFill">
                    生成替换补丁
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { CopyOutlined } from '@ant-design/icons-vue';
import { handler } from '@renderer/util/ipcSender';
import { message } from 'ant-design-vue';
import { reactive } from 'vue';

const formState = reactive({
    sourceNpk: '', targetNpk: '',
    successText: '生成替换补丁完成!'
});

const chooseFile = (type: string) => {
    handler.emit('chooseFile', { type })
}

handler.on('file', ({ type, path }) => {
    switch (type) {
        case 'sourceNpk2':
            formState.sourceNpk = path
            break
        case 'targetNpk2':
            formState.targetNpk = path
            break
    }
})

const reqFill = () => {
    if (!formState.sourceNpk || !formState.targetNpk) {
        message.error('请选择NPK文件!');
        return
    }
    handler.emit('skipCheck', formState)
}

</script>