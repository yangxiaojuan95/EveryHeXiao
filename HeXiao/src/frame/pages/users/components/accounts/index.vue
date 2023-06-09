<template>
  <div class="employee-table">
    <el-table :data="users">
      <el-table-column label="账号" prop="account" />
      <el-table-column label="用户名称" prop="userName" />
      <el-table-column label="头像">
        <template v-slot="{row}">
          <div class="user-avatar" :style="{backgroundImage: `url(${row.headImgUrl})`}" />
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="phoneNumber" />
      <el-table-column label="操作" width="400">
        <template v-slot="{ row }">
          <el-button type="primary" @click="updPwd(row)">改密码</el-button>
          <el-button type="success" @click="updAccount(row)">编辑</el-button>
          <el-button type="danger" @click="delAccount(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 账号表单 -->
    <account-form :roleId="roleId" ref="accountFormRef" @success="getUsers" />

    <!-- 密码表单 -->
    <pwd-form ref="pwdFormRef" />

  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, PropType, ref, toRefs, watch } from 'vue'

import AccountForm from './components/account-form/index.vue'
import PwdForm from './components/pwd-form/index.vue'
import { delUserAsync, getUserAsync } from '@/apis/system/user'

export default defineComponent({
  components: {
    AccountForm,
    PwdForm,
  },
  props: {
    roleId: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props, { emit }) {
    const users = ref<UserModel[]>([])
    const accountFormRef = ref<any>(null)
    const pwdFormRef = ref<any>(null)

    const {
      roleId
    } = toRefs(props)

    const getUsers = async () => {
      const result = await getUserAsync({
        roleId: roleId.value
      })
      users.value = result ?? []
    }

    watch(() => {
      return roleId.value
    }, () => {
      getUsers()
    })

    const delAccount = async(id: number) => {
      await ElMessageBox.confirm('确定删除该用户，该操作不可恢复？', '提示', {
        type: 'warning'
      })
      await delUserAsync({
        id: id
      })
      ElMessage.success('删除用户成功!')
      getUsers()
    }

    const addAccount = () => {
      accountFormRef.value.resetValue()
    }

    const updAccount = (user: UserModel) => {
      accountFormRef.value.setValue(user)
    }

    const updPwd = (user: UserModel) => {
      pwdFormRef.value.setValue(user.id)
    }

    return {
      users,
      accountFormRef,
      pwdFormRef,

      delAccount,
      addAccount,
      updAccount,
      updPwd,
      getUsers,
    }
  }
})
</script>

<style lang="scss" scoped>
.employee-table {
  padding: 20px 40px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: #eee;
}
</style>
