<script lang="ts" setup>
import type { ItemType, MenuProps } from 'ant-design-vue';
import { reactive, ref } from 'vue';
import SkipCheck from './pages/SkipCheck.vue';

// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
const selectedKeys = ref<string[]>(['skipCheck']);
const openKeys = ref<string[]>(['skipCheck']);

function getItem(label: string, icon?: any, children?: ItemType[], type?: 'group',): ItemType {
  return { key: label, icon, children, label, type, } as ItemType;
}
const items: ItemType[] = reactive([
  getItem('工具', null, [getItem('跳检测'), getItem('资源屏蔽')], 'group'),
]);

const handleClick: MenuProps['onClick'] = e => {
  console.log('click', e);
};
</script>

<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <a-layout-sider style="background-color: white;">
        <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width: 180px" mode="inline"
          :items="items" @click="handleClick" />
      </a-layout-sider>
      <a-layout>
        <a-layout-content style="background-color: white;">
          <SkipCheck />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-space>
</template>
