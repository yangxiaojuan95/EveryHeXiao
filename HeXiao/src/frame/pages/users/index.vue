<template>
  <div class="role-container">
    <div class="left-bar">
      <div class="add-father">
        <jz-icon icon="component" />
        <span class="btn-add-fa" @click="addRole">新增角色</span>
      </div>
      <roles-list
        :roles="roles"
        v-model:current="current"
        @del="delRole"
        @edit="editRole"
      />
    </div>
    <div class="right-bar">
      <div class="add-child">
        <span class="title">账号列表</span>
        <div class="btn-add-child" @click="addAccount">新增账号</div>
      </div>

      <accounts
        ref="accountsRef"
        :roleId="currentRole.id"
      />
    </div>

    <role-form ref="roleFormRef" @refresh="getRoles" />

  </div>
</template>

<script setup lang='ts'>
import { computed, defineComponent, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import RolesList from './components/roles/index.vue'
import accounts from './components/accounts/index.vue'
import RoleForm from './components/role-form/index.vue'
import { delRoleAsync, getRoleAsync } from '@/apis/system/role'

const roles = ref<RoleModel[]>([])
const current = ref(0)
const currentRole = computed(() => {
  return roles.value[current.value] ?? {} as RoleModel
})

const getRoles = async () => {
  const result = await getRoleAsync()
  if (result) {
    roles.value = result
  } else {
    roles.value = []
  }
}

getRoles()

const roleFormRef = ref<any>(null)

const addRole = () => {
  roleFormRef.value.resetValue()
}
const editRole = (role: RoleModel, index: number) => {
  roleFormRef.value.setValue(role)
}

const delRole = async(role: RoleModel, index: number) => {
  await ElMessageBox.confirm('确定删除该角色，该操作不可恢复？', '提示', {
    type: 'warning'
  })
  await delRoleAsync({
    id: role.id
  })
  ElMessage.success('删除角色成功!')
  getRoles()

  if (index === current.value) {
    current.value = index === 0
      ? 0
      : index - 1
  }
}

// 账户
const accountsRef = ref<any>(null)

const addAccount = () => {
  accountsRef.value.addAccount()
}

</script>

<style lang='scss' scoped>
.role-container {
  height: calc(100vh - 84px);
  position: relative;
  .left-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    box-sizing: border-box;
    border-right: 1px solid #EBEEF5;
    padding: 20px;
  }
  .right-bar {
    margin-left: 300px;
  }
}
.add-father {
  color: var(--theme);
  line-height: 20px;
  height: 20px;
  .btn-add-fa {
    margin-left: 10px;
    cursor: pointer;
  }
}
.add-child {
  display: flex;
  align-items: center;
  height: 66px;
  padding: 0 30px;
  border-bottom: 1px solid #EBEEF5;
  box-sizing: border-box;
  .title {
    flex-grow: 1;
    color: #666666;
    font-size: 18px;
    font-weight: 600;
  }
  .btn-add-child {
    background-color: var(--theme);
    border-radius: 4px;
    width: 94px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
