<script lang="ts" setup>
import type { ItemType, MenuProps } from 'ant-design-vue';
import { reactive, ref } from 'vue';
import SkipCheck from './pages/SkipCheck.vue';

const activeMenu = ref('跳检测')
const selectedKeys = ref<string[]>(['跳检测']);

interface Options {
  group?: boolean;
}

function getItem(label: string, icon?: any, children?: ItemType[], option: Options = {}): ItemType {
  const { group } = option;
  const type = group ? 'group' : null;
  return { key: label, icon, children, label, type } as ItemType;
}
const items: ItemType[] = reactive([
  getItem('工具', null, [getItem('跳检测'), getItem('资源屏蔽')], { group: true }),
  getItem('资料', null, [getItem('NPK用途对照')], { group: true }),
]);

const handleClick: MenuProps['onClick'] = e => {
  if (e.key == 'NPK用途对照') {
    return window.electron.ipcRenderer.send('open', 'https://bbs.aladedalu.com/thread-2018-1-1.html')
  }
  activeMenu.value = e.key as string
};
</script>

<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <a-layout-sider style="background-color: white;">
        <a-menu v-model:selectedKeys="selectedKeys" style="width: 180px" mode="inline" :items="items"
          @click="handleClick" />
      </a-layout-sider>
      <a-layout>
        <a-layout-content style="background-color: white;">
          <SkipCheck v-show="activeMenu == '跳检测'" />
          <!-- <Reference v-show="activeMenu == 'NPK用途对照'" /> -->
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-space>
</template>
