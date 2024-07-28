<template>
    <div>
        <a-card title="使用韩服语音" style="width: 300px" class="m-2">
            <!-- <template #extra>
                <a href="#">视频教程</a>
            </template> -->
            <p>1. 使用UABEA打开韩服语音NPK</p>
            <p>2. 对NPK进行压缩, 压缩级别选择LZMA </p>
            <p>3. 使用本工具跳过检测, 将修改后的文件替换到DNF手游文件目录</p>
        </a-card>
        <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="国服NPK" name="sourceNpk" :rules="[{ required: true, message: '请选择NPK文件!' }]">
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
    </div>
</template>

<script lang="ts" setup>
import { CopyOutlined } from '@ant-design/icons-vue';
import { handler } from '@renderer/util/ipcSender';
import { message } from 'ant-design-vue';
import { reactive } from 'vue';

const formState = reactive({ sourceNpk: '', targetNpk: '', });

const chooseFile = (type: string) => {
    handler.emit('chooseFile', { type })
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
    handler.emit('skipCheck', formState)
}

</script>