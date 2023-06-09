<template>
  <el-dialog v-model="isShow" title="菜单">
    <el-form class="menu-form" label-width="100px">
      <el-form-item label="上级菜单" prop="id">
        <el-cascader
          v-model="pIdList"
          :options="props.menus"
          :props="{
            label: 'name',
            value: 'id',
            checkStrictly: true
          }"
          @change="onMenuSelectChange"
        />
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio-button :label="0">业务菜单</el-radio-button>
          <el-radio-button :label="1">系统菜单</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-row class="menu-icon">
          <el-col v-for="(item) in icons" :key="item.icon" :span="4">
            <jz-icon
              :icon="item.icon"
              :class="['svg-box', {'selected': formData.icon === item.icon}]"
              @click="onSetIcon(item.icon)"
            >
            </jz-icon>
          </el-col>
          <el-col :span="4">
            <div
              :class="['svg-box', {'selected': formData.icon === ''}]"
              @click="onSetIcon('')"
            >
              <span>无</span>
            </div>
          </el-col>
          <el-col :span="6">
            <el-input size="small" v-model="formData.icon" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="菜单排序" prop="order">
        <el-input-number v-model="formData.order" />
      </el-form-item>
      <el-form-item label="菜单URL" prop="url">
        <el-input v-model="formData.url" />
      </el-form-item>
      <el-form-item>
        <div class="pop-center-btn-wrap">
          <el-button :loading="isLoading" type="success" @click="submit">
            {{ formData.id ? '修改菜单' : '添加菜单' }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { MenuType } from '@/models/system/menu';
import { addMenuAsync, updMenuAsync } from '@/apis/system/menu';
import icons from './icons'

interface Props {
  menus: any[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'refresh'): void;
}>()

const isLoading = ref(false)

const isShow = ref(false)

let formData = ref<any>({})

const pIdList = ref<number[]>([])

const onMenuSelectChange = (e: string[]) => {
  formData.value.pId = e[e.length - 1]
}

const onSetIcon = (icon: string) => {
  formData.value.icon = icon
}

const resetValue = (pId: number) => {
  isShow.value = true
  formData.value = {
    type: MenuType.业务菜单,
    menuLevel: 0,
    pId: null
  }
  if (pId) {
    pIdList.value = [pId]
    formData.value.pId = pId
  } else {
    pIdList.value = []
  }
}

const setValue = (setFormData: AnyObject) => {
  isShow.value = true
  formData.value = { 
    ...setFormData
  }

  if (formData.value.pId) {
    pIdList.value = [formData.value.pId]
  } else {
    pIdList.value = []
  }
}

defineExpose({
  resetValue,
  setValue
})

const submit = async() => {
  isLoading.value = true
  try {
    if (!formData.value.pId) {
      delete formData.value.pId
    }
    if (formData.value.id) {
      await updMenuAsync(formData.value)
      ElMessage.success('更新菜单成功!')
    } else {
      await addMenuAsync(formData.value)
      ElMessage.success('新增菜单成功!')
    }
    isShow.value = false
    emit('refresh')
  } catch(e) {
  } finally {
    isLoading.value = false
  }
}

</script>

<style lang="scss">
.menu-icon {
  padding-top: 6px;
  .svg-box {
    display: inline-block;
    padding: 4px;
    cursor: pointer;
    line-height: 1;
    margin-bottom: 10px;
    &.selected {
      background-color: #eee;
    }
  }
}
</style>
