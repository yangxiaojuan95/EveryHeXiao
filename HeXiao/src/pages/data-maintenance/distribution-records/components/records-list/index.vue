<script lang="tsx">
export default {
  name: 'RecordsList',
}
</script>

<script setup lang="tsx">
import { CirclePlus } from '@element-plus/icons-vue'

type Props = {
  modelValue? : any,
  data?: any,
  propd: any
}
let props = defineProps<Props>()
console.log(props.modelValue,'props.modelvalue')
let emit = defineEmits<{
  (e: 'updata:modelValue',val: any) : void
}>()
const handleClick = () => {
  props.modelValue.push({
    CouponID: '',
    ValidDays: ''
  })
  emit('updata:modelValue',props.modelValue)
}
const handleChange = (value: any) => {
  emit('updata:modelValue',props.modelValue)
}


</script>

<template>
  <div>
    <div class="select" v-for="(item,i) in props.modelValue">
      <el-select v-model="item.CouponID" placeholder="请选择数据" @change="handleChange">
        <el-option
        v-for="item in props.data"
        :key="item.CouponID"
        :label="item.CouponName"
        :value="item.CouponID"
        />
      </el-select>
      <div class="content">
        <!-- <div class="title">有效时间</div>
        <el-input v-model="item.ValidDays " @change="handleChange"></el-input> -->
        <el-icon class="icon" :size="28" @click="handleClick"><CirclePlus /></el-icon>
      </div>
      
    </div>
    
  </div>
</template>

<style scoped lang="scss">
.select{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-bottom: 10px;
}
.content{
  display: flex;
  justify-content: space-around;
  align-items: center;
    .title{
        width: 100px;
        padding-left: 30px;
    }
    .icon{
      padding-left: 10px;
    }
}
</style>
