<script lang="ts">
export default {
  name: 'TagViews',
}
</script>

<script setup lang="ts">
import Contextmenu, { Command } from './components/contextmenu/index.vue'
import { Close } from '@element-plus/icons-vue'

import createBEMNameSpace from '@/frame/utils/bem'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagViewsStore } from '@/store/tag-views'
import { isRoutePathMatch, isSameRoute } from '@/router/utils'

const { BEMSpace, createBEMName } = createBEMNameSpace('tag-views')

const router = useRouter()
const route = useRoute()
const tagViewsStore = useTagViewsStore()

const tagViews = computed(() => {
  return tagViewsStore.tagViews
})

const currentTagIndex = computed({
  get() {
    return tagViews.value.findIndex((t) => isRoutePathMatch(route.path, t.path))
  },
  set(index: number) {
    const tag = tagViews.value[index]
    if (tag) {
      const isSame = isSameRoute(route.path, tag.path)
      if (isSame) {
        router.push(`/redirect/${encodeURIComponent(tag.path)}`)
      } else {
        router.push(tag.path)
      }
    }
  },
})

watch(
  () => route.path,
  () => {
    tagViewsStore.addTagView()
  },
  {
    immediate: true,
  }
)

const onRemoveTab = (index: number) => {
  const deleteTag = tagViews.value[index]
  tagViewsStore.closeTag(deleteTag)
}

const onToggleTab = (index: number) => {
  if (currentTagIndex.value === index) {
    return false
  }

  currentTagIndex.value = index
}

const showContextmenu = ref(false)
const invokeContextmenuTagIndex = ref(0)
const contextMentRect = reactive({
  top: 0,
  left: 0,
  affix: false,
})

const onShowContextmenu = (index: number, event: MouseEvent) => {
  showContextmenu.value = true

  invokeContextmenuTagIndex.value = index
  const tag = tagViews.value[index]
  contextMentRect.affix = tag.affix
  contextMentRect.top = event.pageY
  contextMentRect.left = event.pageX
}

const closeContextMenu = () => {
  showContextmenu.value = false
}

const handleDocumentClick = function () {
  closeContextMenu()
}

const onCommand = (command: Command) => {
  switch (command) {
    case 'refresh':
      // 刷新
      const redirectPath = encodeURIComponent(route.fullPath)
      router.push(`/redirect/${redirectPath}`)
      break;

    case 'cancel':
      // 默认会取消显示
      break;

    case 'close':
      onRemoveTab(invokeContextmenuTagIndex.value)
      break;

    case 'closeAll':
      tagViewsStore.closeAll()
      break;
  
    case 'closeOthers':
      tagViewsStore.closeOthers(tagViews.value[invokeContextmenuTagIndex.value])
      break;
  }

  closeContextMenu()
}

const refreshCurrentPage = () => {
  onCommand('refresh')
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

</script>

<template>
  <div :class="BEMSpace" @contextmenu.prevent>
    
    <div :class="createBEMName('container')">
      <el-scrollbar :class="createBEMName('scroll')">
        <ul :class="createBEMName('list')">
          <li
            v-for="(tag, index) in tagViews"
            :key="index"
            :class="[
              createBEMName('item'),
              { active: currentTagIndex === index },
            ]"
            @click="onToggleTab(index)"
            @contextmenu.prevent="onShowContextmenu(index, $event)"
          >
            <span>{{ tag.title }}</span>
            <el-icon
              v-if="!tag.affix"
              :class="createBEMName('close')"
              @click.stop="onRemoveTab(index)"
            >
              <Close />
            </el-icon>
          </li>
        </ul>
      </el-scrollbar>
      <div class="btn-refresh" @click="refreshCurrentPage">刷新</div>
    </div>

    <teleport to="body">
      <contextmenu v-if="showContextmenu" v-bind="contextMentRect" @command="onCommand" />
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.tag-views__container {
  display: flex;
  align-items: center;
  height: 30px;
}

.tag-views__scroll {
  flex-grow: 1;
  width: 0;
}

.btn-refresh {
  flex-shrink: 0;
  width: 60px;
  text-align: center;
  font-size: 14px;
  border-left: 1px solid #eee;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #666;
  }

  &:active {
    color: #333;
  }
}

.tag-views__list {
  flex-wrap: nowrap;
  @include flex-c-center;
  background-color: #fff;
  font-size: 12px;
}

.tag-views__item {
  padding: 0 20px;
  line-height: 30px;
  @include flex-c-center;
  flex-shrink: 0;
  cursor: pointer;
  color: #aeaeae;

  &.active {
    position: relative;
    color: var(--theme);
    font-weight: 600;

    .tag-views__close {
      width: 12px;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      left: 20px;
      right: 20px;
      background-color: var(--theme);
    }
  }

  &:hover {
    .tag-views__close {
      width: 12px;
    }
  }
}

.tag-views__close {
  margin-left: 4px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  width: 0;

  &:hover {
    background-color: #c0c4cc;
    color: #fff;
  }
}
</style>
