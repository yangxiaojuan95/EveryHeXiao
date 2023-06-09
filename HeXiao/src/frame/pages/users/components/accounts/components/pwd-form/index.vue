<template>
  <el-dialog title="修改密码" v-model="isShow" width="40%">
    <el-form ref="formRef" :rules="rules" :model="pwdForm" label-width="80px">
      <el-form-item label="新密码" prop="password">
        <el-input v-model="pwdForm.password" type="password" />
      </el-form-item>
      <el-form-item prop="sort">
        <el-button type="info" @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">更新密码</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { updateUserPasswordAsync } from '@/apis/system/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, nextTick, ref } from 'vue'
import md5 from 'blueimp-md5'

export default defineComponent({
  emits: ['success'],
  setup(props, { emit }) {
    const isShow = ref(false)
    const pwdForm = ref<any>({})
    const formRef = ref<any>(null)
    const rules = {
      password: [
        { required: true, message: '请输入新密码' },
        { min: 6, message: '密码不能小于6位', trigger: 'change' }
      ]
    }

    const submit = () => {
      formRef.value.validate(async(valid: boolean) => {
        if (!valid) return

        await ElMessageBox.confirm(`是否确定更新密码？`, '提示', {
          type: 'success'
        })
        await updateUserPasswordAsync({ 
          ...pwdForm.value,
          password: md5(pwdForm.value.password)
         })
        ElMessage.success(`更新成功`)
        isShow.value = false
        emit('success')
      })
    }

    const setValue = (userId: number) => {
      pwdForm.value = {
        id: userId,
        password: ''
      }
      isShow.value = true
      nextTick(() => {
        formRef.value.clearValidate()
      })
    }

    return {
      isShow,
      pwdForm,
      rules,
      formRef,
      
      submit,
      setValue
    }
  }
})
</script>

<style lang="scss" scoped>
.show-pwd {
  position: absolute;
  right: 10px;
}
</style>
