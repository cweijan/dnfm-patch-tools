<template>
    <div>
        <a-card title="怪物语音屏蔽" style="width: 350px" class="mb-5">
            <p>选择烦人的语音进行屏蔽, 参考:</p>
            <p>- 天界(深渊): sounds_mon_act7.npk</p>
            <p>- 布万加(雪山): sounds_mon_act5.npk</p>
            <p>- 黑色大地: sounds_mon_m_blackcrack.npk</p>
            <p>补丁生成后, 替换到DNF手游资源目录即可生效</p>
        </a-card>
        <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="国服NPK" name="blockNpk" :rules="[{ required: true, message: '请选择NPK文件!' }]">
                <a-input-group compact>
                    <a-input v-model:value="formState.blockNpk" style="width: calc(100% - 50px)" allow-clear />
                    <a-tooltip title="选择文件">
                        <a-button @click="chooseFile('blockNpk')">
                            <template #icon>
                                <CopyOutlined />
                            </template>
                        </a-button>
                    </a-tooltip>
                </a-input-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit" @click="reqFill">
                    生成屏蔽补丁
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

const formState = reactive({ blockNpk: '', targetNpk: '', });

const chooseFile = (type: string) => {
    handler.emit('chooseFile', { type })
}

handler.on('file', ({ type, path }) => {
    switch (type) {
        case 'blockNpk':
            formState.blockNpk = path
            break
    }
})

const reqFill = () => {
    if (!formState.blockNpk) {
        message.error('请选择NPK文件!');
        return
    }
    handler.emit('blockNpk', formState.blockNpk)
}

</script>