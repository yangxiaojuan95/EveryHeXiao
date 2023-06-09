<script lang="tsx">
export default {
  name: 'UploadImg',
}
</script>

<script setup lang="tsx">
import { computed, reactive, ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { processdRequest } from '@/utils/request'
import { pathUrl } from '@/config';

type Props = {
  modelValue?: string,
  mult?: boolean
}
// 传入的参数
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
})
let mult = ref(false)
const fileList = computed(() => {
  // return props.modelValue?.split(',') ?? []
  //过滤fileList中的空字符串
  mult.value = props.mult
  console.log(props.modelValue,'props.modelValue')
  return props.modelValue?.split(',').filter((item) => item) ?? []
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const upload = async (param: { file: string | Blob }) => {
  const formData = new FormData()
  formData.append('file', param.file)
  const url = `/api/Upload/UploadImage?type=0`
  const result = await processdRequest.post(url, formData)
  if (result[0]) {
    let newFileList = [...fileList.value, result[0]]
    emit('update:modelValue', newFileList.join(','))
  }
}

const deleteImg = (index: any) => {
  let newFileList = [...fileList.value]
  newFileList.splice(index, 1)
  emit('update:modelValue', newFileList.join(','))
}
</script>

<template>
  <div class="box">
    <div class="imgs" v-for="(item, i) in fileList" :key="i">
      <span class="el-upload-list__item-delete">
        <el-icon class="remove" @click="deleteImg(i)">
          <Delete />
        </el-icon>
      </span>
      <img
        style="width: 100px; height: 100px; margin-right: 20px"
        :src="`${pathUrl}${item}`"
      />
    </div>
    <el-upload
      class="avatar-uploader"
      :modelValue="fileList"
      action=""
      :http-request="upload"
    >
      <el-icon v-if="props.mult==false&&fileList.length<1" class="avatar-uploader-icon">
        <Plus />
      </el-icon>
      <el-icon v-if="props.mult==true" class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
    <!-- <el-button size="small" @click="uploadImg" type="primary">点击上传</el-button><br> -->
  </div>
</template>

<style scoped lang="scss">
::v-deep .el-upload-list {
  display: none;
}

.box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.imgs {
  width: 100px;
  height: 100px;
  position: relative;
  margin-right: 20px;
}

img {
  width: 100%;
  height: 50%;
  border-radius: 6px;
}
.imgs:hover > .el-upload-list__item-delete {
  position: absolute;
  display: block;
  width: 100px;
  height: 100px;
  left: 0;
  top: 0;
  border-radius: 5px;
  background: rgba(38, 39, 39, 0.5);
  z-index: 999;
  cursor: pointer;
  text-align: right;
}

.remove {
  position: absolute;
  left: 48%;
  top: 48%;
  transform: translate(-50%, -50%);
  display: block;
  color: white;
}

.avatar-uploader {
  border: 1px dashed #8c939d;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #f4f4f4;
  transition: var(--el-transition-duration-fast);
  margin-right: 20px;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
