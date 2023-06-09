<template>
  <el-dialog v-model="isShow">
    <el-form ref="formRef" :rules="rules" :model="userForm" label-width="80px">
      <el-form-item label="账号" prop="account">
        <el-input v-model="userForm.account" :disabled="!!userForm.id" />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="userForm.roleId">
          <el-option 
            v-for="(role) in roles"
            :key="role.id"
            :label="role.name"
            :value="role.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="!userForm.id" label="账号密码" prop="password">
        <el-input v-model="userForm.password" type="password" />
      </el-form-item>
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="userForm.userName" />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="userForm.phoneNumber" />
      </el-form-item>
      <el-form-item label="头像" prop="headImgUrl">
        <img-upload v-model="userForm.headImgUrl" />
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="isShow = false">取 消</el-button>
        <el-button :loading="submitLoading" type="primary" @click="submit">{{ userForm.id ? '更新账号' : '新增账号' }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { getRoleAsync } from '@/apis/system/role'
import { addUserAsync, existUserAsync, updUserAsync } from '@/apis/system/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, nextTick, PropType, reactive, ref, toRefs } from 'vue'
import md5 from 'blueimp-md5'

export default defineComponent({
  props: {
    roleId: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: ['success'],
  setup(props, { emit }) {
    const isShow = ref(false)

    const {
      roleId
    } = toRefs(props)

    const userForm = ref<any>({})
    const formRef = ref<any>(null)
    const roles = ref<RoleModel[]>([])
    const submitLoading = ref(false)

    const rules = reactive({
      'userName': [
        { required: true, message: '请输入账号名称' }
      ],
      'account': [
        { required: true, message: '请输入账号' }
      ],
      'roleId': [
        { required: true, message: '请选择部门' }
      ],
      'password': {
        required: !userForm.id, message: '请输入密码'
      }
    })

    const getRoles = async () => {
      const result = await getRoleAsync()
      roles.value = result ?? []
    }
    
    const submit = () => {
      formRef.value.validate(async(valid: boolean) => {
        if (!valid) return

        const userFormInner: any = { ...userForm.value }

        let keyword = ''
        let api = null

        try {
          if (userFormInner.id) {
            keyword = '更新'
            api = updUserAsync
          } else {
            // 校验账号是否已存在
            // const isValidAccount = await existUserAsync({
            //   account: userFormInner.account
            // })
  
            // if (isValidAccount.data?.flag) {
            //   // 已存在该账号
            //   ElMessage.warning('该账号已存在。')
            //   submitLoading.value = false
            //   return false
            // }
  
            keyword = '新增'
            api = addUserAsync
            userFormInner.password = md5(userFormInner.password)
          }
          
          await ElMessageBox.confirm(`是否确定${keyword}账号？`, '提示', {
            type: 'success'
          })
          submitLoading.value = true
          userFormInner.roleId = roleId.value
          await api(userFormInner)
          ElMessage.success(`${keyword}账号成功`)
          isShow.value = false
          emit('success')
        } catch (error) {
          // error
        } finally {
          submitLoading.value = false
        }
      })
    }

    const resetValue = () => {
      userForm.value = {}
      isShow.value = true
      getRoles()
      nextTick(() => {
        formRef.value.clearValidate()
      })
    }

    const setValue = (user: UserModel) => {
      userForm.value = { ...user }
      isShow.value = true
      getRoles()
      nextTick(() => {
        formRef.value.clearValidate()
      })
    }

    return {
      isShow,
      userForm,
      rules,
      formRef,
      roles,
      submitLoading,

      submit,
      resetValue,
      setValue
    }
  }
})
</script>
