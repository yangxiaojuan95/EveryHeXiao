<script lang="ts">
export default {
  name: 'SideTree'
}
</script>

<script setup lang="ts">
  import { jsonClone, tree } from '@/frame/utils';
  import { processdRequest } from '@/utils/request';
  import { ref } from 'vue';
  import TreeIcon from './icon.vue'

  type Props = {
    api: string;
    treeProps: {
      label: string;
      value: string;
      pId: string;
      children: string;
    };
    height?: string;
    needAll?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    height: '100%',
    needAll: true
  })

  const emit = defineEmits<{
    (e: 'update:type', typeId: string | null): void;
    (e: 'change', currentNode: any): void;
    (e: 'get-data', data: any[]): void;
  }>()

  const currentNode = ref<AnyObject | undefined | null>()
  const onNodeClick = (data: AnyObject | null) => {
    currentNode.value = data
    if (data) {
      emit('update:type', data[props.treeProps.value])
    } else {
      emit('update:type', null)
    }
    emit('change', currentNode.value)
  }

  const treeData = ref<any[]>([])

  const isLoadingTreeData = ref(false)

  const getSideTreeData = async () => {
    isLoadingTreeData.value = true
    try {
      const result = await processdRequest.get(props.api, {
        pageIndex: 1,
        pageSize: 9999
      })
      const treeProps = props.treeProps
      treeData.value = tree(result.data, treeProps.value, treeProps.pId, treeProps.children)
      
      emit('get-data', jsonClone(treeData.value))

      if (props.needAll) {
        treeData.value.unshift({
          [treeProps.label]: '全部',
          [treeProps.value]: null
        })
      }

      if (Array.isArray(treeData.value)) {
        onNodeClick(treeData.value[0])
      } else {
        onNodeClick(null)
      }
    } catch (error) {
      console.log('tree data error', error)
    } finally {
      isLoadingTreeData.value = false
    }
  }
  getSideTreeData()

  defineExpose({
    getData: getSideTreeData
  })

</script>

<template>
  <div 
    class="side-tree" 
    :style="{
      height: props.height
    }"
  >
    <el-scrollbar 
      v-loading="isLoadingTreeData"
      element-loading-text="类别数据加载中"
      height="100%"
    >
      <el-tree
        default-expand-all
        :current-node-key="null"
        :props="treeProps"
        :data="treeData"
        :node-key="treeProps.value"
        :indent="20"
        :icon="TreeIcon"
        :expand-on-click-node="false"
        @node-click="onNodeClick"
      >
        <template #default="{ node, data }">
          <span class="tree-node" :title="data[treeProps.label]">
            <!-- <template v-if="node.isLeaf">
              <jz-icon icon="fa-regular fa-file" :fontSize="14" style="color: rgb(122, 141, 176)" />
            </template> -->
            <!-- <template v-else>
              <jz-icon :icon="node.expanded ? 'fa-solid fa-folder-open' : 'fa-solid fa-folder'" :fontSize="14" style="color: rgb(249, 239, 158)" />
            </template> -->
            <span :class="['tree-node-label', { focus: currentNode?.[treeProps.value] === data[treeProps.value] }]">{{ data[treeProps.label] }}</span>
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<style lang="scss">
.side-tree {
  font-size: 14px;

  .el-tree-node__expand-icon {
    padding: 4px;
  }

  .el-tree-node {
    .el-tree-node__content {
      padding: 4px 0;

      &:hover {
        background-color: var(--hoverBg) !important;
      }
    }
    &.is-current {
      & > .el-tree-node__content {
        background-color: var(--themeLight);
        color: var(--theme);
        .el-tree-node__expand-icon {
          .icon {
            color: var(--theme);
          }
        }
      }
    }
  }

  .tree-node {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .tree-node-label {
    margin-left: 2px;
  }
}


</style>
