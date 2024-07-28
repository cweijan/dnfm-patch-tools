<script lang="ts" setup>
import { message, type ItemType, type MenuProps } from 'ant-design-vue';
import { reactive, ref } from 'vue';
import SkipCheck from './pages/SkipCheck.vue';
import SoundReplace from './pages/SoundReplace.vue';
import SoundBlock from './pages/SoundBlock.vue';
import NpkPath from './pages/reference/NpkPath.vue';
import NPKIntention from './pages/reference/NPKIntention.vue';
import { handler } from './util/ipcSender';

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
  getItem('手游补丁', null, [getItem('跳检测'), getItem('语音替换'), getItem('语音屏蔽')], { group: true }),
  getItem('参考资料', null, [getItem('NPK资源获取'), getItem('NPK用途对照')], { group: true }),
]);

const handleClick: MenuProps['onClick'] = e => {
  // if (e.key == 'NPK用途对照') {
  //   handler.emit('open', 'https://bbs.aladedalu.com/thread-2018-1-1.html')
  //   return;
  // }
  activeMenu.value = e.key as string
};
handler.on('notice', ({ success, text }) => {
  if (success) message.success(text)
  else message.error(text)
})
</script>

<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <a-layout-sider style="background-color: white; ">
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline" :items="items" @click="handleClick" />
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="p-2" style="background-color: #F5F5F5;height: calc(100vh - 30px)">
          <SkipCheck v-show="activeMenu == '跳检测'" />
          <SoundReplace v-show="activeMenu == '语音替换'" />
          <SoundBlock v-show="activeMenu == '语音屏蔽'" />
          <!-- 参考资料 -->
          <NpkPath v-show="activeMenu == 'NPK资源获取'" />
          <NPKIntention v-show="activeMenu == 'NPK用途对照'" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-space>
</template>
