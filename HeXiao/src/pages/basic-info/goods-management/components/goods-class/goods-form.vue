<script lang="ts">
export default {
  name: 'DefectiveForm',
}
</script>

<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import { defineForm, FormDialog, PageModelForm } from '@juzhenfe/page-model'
import { processdRequest } from '@/utils/request'
import { ElMessage } from 'element-plus'
import { tree } from '@/frame/utils'
import { setCascaderDataDisabled } from '@/utils/cascader-data-disabled'
import { genCode } from '@/utils/gen-code'

//下拉列表
// let reflections = reactive({
//   classList: [],
// }) // 用于存储列表
// ;(async () => {
//   const result = await processdRequest.get(
//     '/api/BackDefectiveClass/GetDefectiveCategoryDto'
//   )
//   console.log('result', result)
//   reflections.classList = result
// })()

const emit = defineEmits<{
  (e: 'submit-success'): void
}>()

const visible = ref(false)

const pageModelFormRef = ref<any>()
const reflections = reactive<{

}>({

})

const isAdd = ref(false)

const show = (data?: AnyObject) => {
  visible.value = true
  isAdd.value = data?.ClassID ? false : true
  nextTick(() => {
    pageModelFormRef.value.setFormData({ ...data })
    getTypeData()
  })
}

const hide = () => {
  visible.value = false
}

// 提交数据
const submit = async () => {
  const data = await pageModelFormRef.value.getFormData()
  console.log('提交数据', data)
  if (isAdd.value) {
    await processdRequest.post('/api/BackGoods/AddClass', {
      ...data
    })
    ElMessage.success('新增分类成功!')
  } else {
    await processdRequest.post('/api/BackGoods/EditClass', {
      ClassID: data.ClassID,
      ClassName: data.ClassName
    })
    ElMessage.success('修改分类成功!')
  }
  hide()
  emit('submit-success')
}

const dialogTitle = computed(() => {
  return isAdd.value ? '新增分类' : '更新分类'
})

// 获取物品分类数据
const getTypeData = async () => {
  // const result = await processdRequest.get<PageData<DutyClassModel[]>>(
  //   '/api/BackDefectiveClass/GetDefectiveCategoryDto'
  //   // {
  //   //   pageIndex: 1,
  //   //   pageSize: 999,
  //   // }
  // )
  // let types = tree(result.data, 'id', 'pId', 'childs')
  // const formData = await pageModelFormRef.value.getFormData(false)
  // if (formData.id) {
  //   types = setCascaderDataDisabled(types, formData.id, 'id', 'childs')
  // }
  // reflections.types = types
}

// 表单内容
const form = defineForm<DefectivesModel>({
  props: {
    labelWidth: '130px', //表单label宽度
  },
  //绑定数据
  async bindData(formData) {
    return formData
  },
  async beforeSubmit(formData) {
    return formData
  },
  //弹窗属性
  dialogProps: {
    width: '600px',
  },
  initialData: {}, //初始数据
  required: ['Code'], //
  els: [
    {
      eType: 'el-input',
      prop: 'ClassName',
      label: '分类名',
      props: {
        placeholder: '分类名',
      },
      style: {
        flexGrow: 1,
      },
    }
  ],
})

defineExpose({
  show,
  hide,
})
</script>

<template>
  <form-dialog v-model="visible" :title="dialogTitle" width="500px">
    <page-model-form
      ref="pageModelFormRef"
      :form="form"
      :reflections="reflections"
    />
    <template #bottom>
      <div class="actions">
        <el-button type="primary" @click="submit">{{
          isAdd ? '新增' : '修改'
        }}</el-button>
        <el-button type="info" @click="hide">取消</el-button>
      </div>
    </template>
  </form-dialog>
</template>

<style lang="scss" scoped></style>
