<script lang="ts">
// 类别组件
export default {
  name: 'GoodsClass',
}
</script>

<script setup lang="ts">
import { processdRequest } from '@/utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import SideTree from '@/components/dialogs/components/side-tree/index.vue'
import { triggerImportFile } from '@/utils'
import StoreForm from './store-form.vue'

interface Props {
  typeId?: string
  
}

const props = defineProps<Props>()

const currentType = ref('')

const sideTreeRef = ref<any>()

const emit = defineEmits<{
  (e: 'update:typeid', typeId: string): void
  (e: 'get-data', data: any[]): void
}>()

const currentNode = ref<any | undefined>()

const onNodeChnage = (node: any) => {
  currentNode.value = node
  console.log(node,node?.AreaID)
  emit('update:typeid', node?.AreaID)
}

const onGetTreeData = (list: any[]) => {
  emit('get-data', list)
}

const getTypeData = () => {
  sideTreeRef.value.getData()
}

// 删除当前选中的分类
const delCurrentType = async () => {
  if (!currentNode.value) {
    return false
  }
  console.log('删除', currentNode.value)

  if (currentNode.value.childs?.length) {
    ElMessage.warning('该类别下有分类，不可删除!')
  } else {
    await ElMessageBox.confirm('是否删除当前选择的分类？', '提示', {
      type: 'warning',
    })
    await processdRequest.post('/api/BackShop/DelClass', {
      IdList: [currentNode.value.AreaID],
    })
    currentNode.value = undefined
    ElMessage.success('删除分类成功!')
    getTypeData()
  }
}

const goodsTypesRef = ref<any>()
// 新增分类
const addType = () => {
  // const data: AnyObject = {
  //   ClassName: currentNode.value.ClassName,
  //   ClassCode: currentNode.value.ClassCode,
  // }
  // if (currentNode.value?.ID) {
  //   data.pId = currentNode.value.ID
  // }
  currentNode.value = undefined
  goodsTypesRef.value.show()
}

// 更新分类
const updateType = () => {
  //判断不能修改

  goodsTypesRef.value.show(currentNode.value)
}

// 表单数据提交成功
const onSubmitSuccess = () => {
  getTypeData()
  currentNode.value = undefined
}

/**
 * 点击导入按钮
 */
const handleClickImport = () => {
  triggerImportFile(async function (files) {
    const file = files[0]
    try {
      const fromData = new FormData()
      fromData.append('File', file)
      await processdRequest.post(
        '/api/BackDefectiveSubitem/Index',
        fromData,
        undefined,
        {
          loading: '上传中',
        }
      )
      ElMessage.success('上传成功!')
      getTypeData()
    } catch (error) {}
  })
}

/**
 * 下载模板
 */
const handleDownload = () => {
  window.open(`/templates/设备类目.xlsx?t=${+new Date()}`)
}
</script>

<template>
  <div class="goods-types">
    <header class="head">商品分类</header>
    <div class="goods-types__list">
      <side-tree
        ref="sideTreeRef"
        v-model:type="currentType"
        method="get"
        api="/api/BackShop/GetClassList"
        :tree-props="{
          label: 'AreaName',
          value: 'Id',
          pId: 'pId',
          children: 'childs'
        }"
        @change="onNodeChnage"
        @get-data="onGetTreeData"
      />
    </div>

    <div class="type-actions">
      <el-button type="primary" @click="addType">新增</el-button>
      <el-button :disabled="!currentNode" type="primary" @click="updateType"
        >修改</el-button
      >
      <el-button :disabled="!currentNode" type="danger" @click="delCurrentType"
        >删除</el-button
      >
    </div>

    <store-form ref="goodsTypesRef" @submit-success="onSubmitSuccess" />
  </div>
</template>

<style lang="scss" scoped>
.goods-types {
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    flex-shrink: 0;
    padding: 10px 5px;
    border-bottom: 1px solid #efefef;
  }
}

.goods-types__list {
  flex-grow: 1;
  height: 0;
  margin-top: 10px;
}

.type-actions {
  padding: 15px 0;
  flex-shrink: 0;
  border-top: 1px solid #efefef;
}

.import-btn {
  margin-left: 10px;
}
</style>
