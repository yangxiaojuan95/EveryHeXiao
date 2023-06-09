<template>
  <el-dialog title="修改部门" v-model="isShow" width="40%">
    <el-form ref="formRef" :rules="rules" size="mini" :model="roleForm" label-width="80px">
      <el-form-item label="选择部门" prop="roleId">
        <el-select v-model="roleForm.roleId">
          <el-option 
            v-for="(role) in roles"
            :key="role.id"
            :label="role.roleName"
            :value="role.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="sort">
        <el-button type="info" @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">修改部门</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['success'],
  setup(props, { emit }) {
    const isShow = ref(false)
    const roles = ref<RolesModel[]>([])
    const roleForm = ref<any>({})
    const formRef = ref<any>(null)
    const rules = {
      roleId: { required: true, message: '请选择部门' }
    }

    const submit = () => {
      formRef.value.validate(async(valid: boolean) => {
        if (!valid) return

        await ElMessageBox.confirm(`是否确定更新部门？`, '提示', {
          type: 'success'
        })
        await updUserApi({ ...roleForm.value })
        ElMessage.success(`更新成功`)
        isShow.value = false
        emit('success')
      })
    }

    const getRoles = async () => {
      const result = await getRoleListApi()
      roles.value = result ?? []
    }

    const setValue = (user: IdentityUserModel) => {
      roleForm.value = user
      isShow.value = true
      getRoles()
    }

    return {
      isShow,
      roleForm,
      rules,
      formRef,
      roles,

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
