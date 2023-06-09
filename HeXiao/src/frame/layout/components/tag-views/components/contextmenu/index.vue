<script lang="ts">

export default {
  name: 'Contextmenu'
}
</script>

<script setup lang="ts">
import createBEMNameSpace from '@/frame/utils/bem';
import { computed } from 'vue';

export type Command = 'refresh' | 'close' | 'closeOthers' | 'closeAll' | 'cancel'

const { BEMSpace, createBEMName } = createBEMNameSpace('contextmenu')

interface Props {
  affix?: boolean;
  top: number;
  left: number;
}

type MenuItem = {
  title: string;
  icon: any;
  command: Command;
  show?: (affix: boolean) => boolean;
}

const props = withDefaults(defineProps<Props>(), {
  affix: false
})

const emit = defineEmits<{
  (e: 'command', command: Command): void;
}>()

const menus: MenuItem[] = [
  {
    title: '刷新',
    icon: '',
    command: 'refresh'
  },
  {
    title: '关闭这个',
    icon: '',
    show(affix: boolean) {
      return !affix
    },
    command: 'close'
  },
  {
    title: '关闭其它',
    icon: '',
    command: 'closeOthers'
  },
  {
    title: '关闭所有',
    icon: '',
    command: 'closeAll'
  },
  {
    title: '取消',
    icon: '',
    command: 'cancel'
  }
]

const contextmenus = computed(() => {
  return menus.filter(menu => !menu.show || menu.show(props.affix))
})

const style = computed(() => {
  return {
    top: props.top + 'px',
    left: props.left + 'px',
  }
})

const onTriggerCommand = (index: number) => {
  const command = contextmenus.value[index].command
  emit('command', command)
}

</script>

<template>

<ul :class="BEMSpace" :style="style" @click.stop>
  <li
    v-for="(menu, index) in contextmenus"
    :key="index"
    :class="createBEMName('item')"
    @click="onTriggerCommand(index)"
  >
    <span>{{ menu.title }}</span>
  </li>
</ul>

</template>

<style lang="scss" scoped>

.contextmenu {
  position: absolute;
  background-color: #fff;
  z-index: 9;
  padding: 6px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.contextmenu__item {
  line-height: 28px;
  font-size: 12px;
  padding: 0 15px;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background-color: #eee;
  }
}

</style>