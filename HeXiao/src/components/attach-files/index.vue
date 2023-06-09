<script lang="ts">
export default {
  name: 'AttachFiles'
}
</script>

<script setup lang="ts">
  import { dateFormat } from '@/frame/utils/date-helper';
import { ref } from 'vue';
  import { Upload } from '@element-plus/icons-vue'

  type AttachmentItem = {
    id: string;
    url: string;
    remarks: string;
    creationTime: string;
  }

  const innerUploadValue = ref('')
  const imgUploaderRef = ref<any>()

  type Props = {
    attachments: AttachmentItem[]
  }

  const props = defineProps<Props>()

  const triggerUpload = async () => {
    imgUploaderRef.value.onClickItem(0)
  }

  const formatName = (str: string) => {
    const name = str.split('_').slice(-1)[0]
    return name
  }

  const onChange = (result: string) => {
    const newImgs: AttachmentItem[] = result.split(',').filter(a => a.trim()).map(src => {
      return {
        id: '',
        url: src,
        remarks: '',
        creationTime: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
      }
    })

    newImgs.forEach(item => {
      props.attachments.push(item)
    })
  }

  const delImg = (index: number) => {
    props.attachments.splice(index, 1)
  }

  const openImg = (index: number) => {
    window.open(props.attachments[index].url)
  }

</script>

<template>
  <div v-if="attachments" class="attach-files">
    <div class="attach-file-header">
      <label for="">附件数({{ attachments?.length || 0 }})</label>
      <el-button :icon="Upload" class="upload-button" @click="triggerUpload">上传文件</el-button>
    </div>
    <div class="attach-file-list">
      <div v-for="(item, index) in props.attachments" :key="index" class="attach-file-item">
        <div class="item-info">
          <span class="item-url">{{ formatName(item.url) }}</span>
          <div class="actions">
            <el-button type="text" size="small" @click="openImg(index)">下载</el-button>
            <el-button type="text" size="small" @click="delImg(index)">删除</el-button>
          </div>
        </div>
        <div class="item-info">
          <div class="item-create-time">{{ item.creationTime.split(' ')[0] }}</div>
          <el-popover
            placement="top"
            :width="400"
            trigger="click"
          >
            <template #reference>
              <el-button type="text" size="small" @click="">备注</el-button>
            </template>
            <el-form>
              <el-form-item>
                <el-input type="textarea" v-model="item.remarks" />
              </el-form-item>
            </el-form>
          </el-popover>
        </div>
      </div>
    </div>

    <img-upload ref="imgUploaderRef" class="hidden-uplaoder" mode="file" mult saveOriginName v-model="innerUploadValue" @update:modelValue="onChange" />
  </div>
</template>

<style lang="scss" scoped>
.attach-files {
  flex-grow: 1;
  width: 0;
  color: #333;
}

.upload-button {
  margin-left: 15px;
}


.hidden-uplaoder {
  position: absolute;
  z-index: -1;
  opacity: 0;
  width: 0;
  height: 0;
}


.item-info {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 50%;
  display: flex;
  align-items: center;
}

.attach-file-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 10px 0;

  &:hover {
    background-color: rgb(242, 242, 242);
  }
}

.item-url {
  flex-shrink: 0;
  color: #333;
}

.actions {
  margin-left: 20px;
}

.item-create-time {
  flex-shrink: 0;
  color: #666;
  margin-right: 10px;
}

.remark-form-actions {
  text-align: right;
}

</style>