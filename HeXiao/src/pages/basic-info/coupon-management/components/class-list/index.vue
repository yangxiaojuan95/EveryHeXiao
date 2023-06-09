<script lang="tsx">
export default {
  name: 'ClassList',
}
</script>

<script setup lang="tsx">
import { processdRequest } from '@/utils/request'
import { nextTick, reactive, ref, watch } from 'vue'

type Props = {
  modelValue? : any,
  data?: any
}
let props = defineProps<Props>()
const selectData = ref()
nextTick(() => {
  selectData.value = props.modelValue
})
watch(() => props.modelValue,
  (newValue,oldValue) => {
    selectData.value = props.modelValue
  },
  {
    deep: true
  }
)

let visable = ref(false)

let formData = ref({
  RepairID: '',
  Remarks: '',
  RepairDepartmentList: [],
  RepairMaintenanceList: [],
  RepairResponsibilityList: [],
})

/* 一级下拉列表 */
const responseOptions = ref([])
const responseProps = {
  multiple: true, //多选
  checkStrictly: false, //父子节点关联
  emitPath: true, //不显示路径
  // label: 'label', //显示的字段
  // value: 'value', //绑定的字段
  leaf: 'leaf', //是否是叶子节点
}

const show = async (RepairID: any) => {
  visable.value = true
  formData.value.RepairID = RepairID

  // 新组件
  const res = await processdRequest.get(
    '/api/Staff/GetMaintenanceDto'
  )
  responseOptions.value = res.data.map((item: any) => {
    return {
      value: item.ClassID,
      // ClassCode: item.ClassCode,
      label: item.ClassName,
      children: item.Items.map((ite:any) => {
        return {
          label: ite.ItemCode,
          value: ite.ItemDescribe
        }
      })
    }
  })
  console.log('responseOptions', responseOptions.value)
}

const cascaderRef = ref<any>() //级联选择器ref
let emit = defineEmits<{
  (e: 'updata:modelValue',val: any) : void
}>()
const handleChange = (value: any) => {
  // console.log('改变字段', value)
  // console.log('选中字段', selectData.value)
  let list = ref([])
  for(let i=0;i<selectData.value.length;i++){
    let selectList = selectData.value[i][1]
    list.value.push(selectList)
  }
  emit('updata:modelValue',list.value)
}


</script>

<template>
  <div>
    <el-cascader
      :options="props.data"
      :props="responseProps"
      clearable
      :show-all-levels="false"
      v-model="selectData"
      @change="handleChange"
      ref="cascaderRef"
    />
  </div>
</template>

<style scoped lang="scss">
.form {
  text-align: center;
  &-item {
    .label {
      width: 88px;
      padding: 20px 0;
      margin-right: 10px;
      white-space: nowrap;
    }
  }
  .remark {
    margin: 20px 0;
    display: flex;
    .label {
      width: 88px;
      padding: 20px 0;
      margin-right: 10px;
      white-space: nowrap;
    }
    &-text {
      width: 200px;
    }
  }
}
::v-deep .el-form-item__content {
  // justify-content: center;
}
.label_select {
  margin: 20px 0;
  display: flex;
  align-items: center;
  &:not(:nth-child(2n)) {
    margin-right: 80px;
  }
  .add {
    margin-left: 8px;
    cursor: pointer;
  }
}

.select-wrap {
  display: flex;
  // justify-content: center;
  .label {
    width: 88px;
    padding: 20px 0;
    margin-right: 10px;
    white-space: nowrap;
  }
}

.addList {
  display: flex;
  .item {
    display: flex;
    align-items: center;
    font-size: 16px;
    &:not(:last-child) {
      margin-right: 40px;
    }
  }
}
.close {
  cursor: pointer;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 50%;
}
.add-icon {
  cursor: pointer;
}
</style>
