<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<script setup lang="ts">
  import { useSystemStore } from '@/store/system';
import { processdRequest } from '@/utils/request';
import { PageModelForm, defineForm } from '@juzhenfe/page-model'
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

  const pageModelFormRef = ref<any>()

  const from = defineForm<SystemSettingModel>({
    props: {
      labelWidth: '80px'
    },
    required: ['title'],
    els: [
      {
        label: '标题',
        eType: 'el-input',
        prop: 'title',
        helpText: '配置网站的标题'
      },
      {
        label: 'logo',
        eType: 'img-upload',
        prop: 'logo',
        helpText: '配置后台系统的logo'
      },
      {
        label: 'ico图标',
        eType: 'img-upload',
        prop: 'iCon',
        helpText: '配置后台系统的ico图标'
      }
    ]
  })

  let isAdd = ref(true)
  const submitLoading = ref(false)
  
  const systemStore = useSystemStore()

  const getConfig = async () => {
    const result = await processdRequest.get<WrapData<SystemSettingModel>>('/sysConfiguration')
    if (result.data) {
      systemStore.updateSystemSetting(result.data)
      pageModelFormRef.value.setFormData(result.data)
      isAdd.value = false
    }
  }

  const saveConfig = async () => {
    const formData = await pageModelFormRef.value.getFormData()
    if (!formData) {
      return false
    }

    submitLoading.value = true

    try {
      if (isAdd.value) {
        await processdRequest.post('/sysConfiguration', formData)
      } else {
        await processdRequest.put('/sysConfiguration', formData)
      }
      ElMessage.success('保存成功！')
      getConfig()
    } catch (error) {
      console.log('saveConfig error', error)
    } finally {
      submitLoading.value = false
    }
  }

  getConfig()

  const handleSubmit = () => {
    saveConfig()
  }

</script>

<template>
  <div class="system-setting-page">
    <div class="page-form">
      <page-model-form
        ref="pageModelFormRef"
        :form="from"
      />
      <el-button class="save-button" type="success" :loading="submitLoading" @click="handleSubmit">保存配置</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.page-form {
  padding: 30px;
  width: 600px;
}

.save-button {
  margin-left: 80px;
}

</style>
