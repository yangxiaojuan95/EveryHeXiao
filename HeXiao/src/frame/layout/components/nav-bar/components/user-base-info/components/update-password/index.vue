<script lang="ts">
export default {
  name: 'UpdatePassword'
}
</script>

<script setup lang="ts">
  import { updateSelfPasswordAsync } from '@/apis/system/user';
import tokenStorage from '@/frame/utils/token';
import { useUserStore } from '@/store/user';
import { FormDialog, defineForm, PageModelForm } from '@juzhenfe/page-model'
import md5 from 'blueimp-md5';
import { ElMessage, ElMessageBox } from 'element-plus';
  import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router';

  const userStore = useUserStore()
  const visible = ref(false)
  const router = useRouter()

  const pageModelFormRef = ref<any>()

  const show = () => {
    visible.value = true
    nextTick(() => {
      pageModelFormRef.value.setFormData({})
    })
  }


  const hide = () => {
    visible.value = false
  }

  const form = defineForm({
    props: {
      labelWidth: '80px'
    },
    required: [
      'Password',
      'NewPassword'
    ],
    async beforeSubmit(formData) {
        // formData.Password = md5(formData.Password)
        // formData.NewPassword = md5(formData.NewPassword)
      return formData
    },
    els: [
      {
        eType: 'el-input',
        label: '旧密码',
        prop: 'Password',
        props: {
          type: 'password'
        }
      },
      {
        eType: 'el-input',
        label: '新密码',
        prop: 'NewPassword',
        props: {
          type: 'password'
        }
      }
    ]
  })

  const submit = async () => {
    await ElMessageBox.confirm('是否确认修改密码？', '提示', {
      type: 'warning'
    })
    const formData = await pageModelFormRef.value.getFormData()
    if (formData) {
      formData.Password = md5(formData.Password)
        formData.NewPassword = md5(formData.NewPassword)
      const result = await updateSelfPasswordAsync(formData)
      if(result === '修改成功'){
        hide()
        await ElMessageBox.confirm('密码修改成功，请重新登录!', '提示', {
          showCancelButton: false,
          type: 'success'
        })
        // 移除相关信息
        userStore.clear()
        tokenStorage.remove()
        // 跳转登录页面
        router.push('/login')
        return false
      }
      ElMessage.warning(`${result},请重新填写！。`)
      pageModelFormRef.value.setFormData({Password: '',NewPassword: ''})
    }
  }
  
  defineExpose({
    show
  })

</script>

<template>
  <form-dialog
    v-model="visible"
    title="修改密码"
    :dialog-props="{ appendToBody: true, width: '500px' }"
  >
    <page-model-form
      ref="pageModelFormRef"
      :form="form"
    />

    <template #bottom>
      <el-button @click="hide">取消</el-button>
      <el-button type="primary" @click="submit">修改密码</el-button>
    </template>
  </form-dialog>
</template>
