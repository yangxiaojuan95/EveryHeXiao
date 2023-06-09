<script lang="tsx">
export default {
  name: 'ClassList',
}
</script>

<script setup lang="tsx">
import { processdRequest } from '@/utils/request'
import { nextTick, reactive, ref, watch } from 'vue'
import { pathUrl } from '@/config';

type Props = {
  modelValue? : any,
  data?: any,
  bgList?: any
}
let props = defineProps<Props>()
console.log(props.modelValue,'props.modelvalue')
let bgImage = ref()
let emit = defineEmits<{
  (e: 'updata:modelValue',val: any) : void
}>()
const handleChange = (value: any) => {
  emit('updata:modelValue',bgImage)
}


</script>

<template>
  <div>
    <el-radio-group v-model="bgImage" class="select ml-4" @change="handleChange">
        <div v-for="(item,i) in props.bgList">
            <div class="radio">
                <el-image class="image" :src="`${pathUrl}${item.BackgroundTheme}`"></el-image>
                <div>
                    <el-radio :label="item.BackgroundTheme" size="large">{{ item.Name }}</el-radio>
                </div>
            </div>
            
        </div>
    </el-radio-group>
      
  </div>
</template>

<style scoped lang="scss">
.select{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-bottom: 10px;
    
}
.radio{
    margin-right: 20px;
}
.image{
    width: 100px;
    height: 100px;
}
</style>
