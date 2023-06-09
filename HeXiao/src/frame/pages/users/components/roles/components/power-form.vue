<template>
  <el-dialog v-model="isShow" title="角色权限">
    <el-form
      :model="powerForm"
      label-width="100px"
    >
      <el-form-item label="可查看页面">
        <el-tree
          ref="powerTree"
          :data="menus"
          :props="{
            label: 'name',
            children: 'childs'
          }"
          check-strictly
          empty-text="加载中.."
          show-checkbox
          node-key="id"
          :expand-on-click-node="false"
          :default-expand-all="true"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">更新权限</el-button>
        <el-button type="primary" @click="chooseAll">全选</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { getMenuAsync } from '@/apis/system/menu'
import { getRoleMenuAsync, removeRoleMenuAsync, updRoleMenuAsync } from '@/apis/system/role'
import { tree, flatList } from '@/frame/utils'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const store = useUserStore()
    const isShow = ref(false)
    const powerForm =  ref<any>({})
    const powerTree = ref<any>(null)
    const menus = ref<MenuModel[]>([])
    const menuIds = ref<string[]>([])
    let currentRole: RoleModel
    let totalMenuIds: string[] = []

    const setValue = (role: RoleModel) => {
      currentRole = role
      isShow.value = true
      getMenus()
    }

    const getMenus = async () => {
      const [totalMenu, roleMenus] = await Promise.all([
        getMenuAsync(),
        getRoleMenuAsync({
          roleId: currentRole.id
        })
      ])

      if (totalMenu) {
        totalMenu.forEach(item => {
          item.claimType = 'Menu'
          item.childs.forEach(child => {
            child.claimType = 'Menu'
            child.functions.forEach(func => {
              func.claimType = 'Endpoint'
            })
            child.childs = child.childs.concat(child.functions)
          })
          item.functions.forEach(func => {
            func.claimType = 'Endpoint'
          })
          item.childs = item.childs.concat(item.functions)
        })
        console.log(totalMenu)
        const flatTotalMenu = flatList(totalMenu, 'childs')
        totalMenuIds = flatTotalMenu.map(a => a.id)
        // menus.value = tree(totalMenu, 'id', 'pId')
        menus.value = totalMenu
      } else {
        menus.value = []
      }

      // 设置选中项
      const menuValues = roleMenus ? roleMenus.map(a => a.claimValue) : []
      menuIds.value = roleMenus ? roleMenus.map(a => a.id) : []
      powerTree.value.setCheckedKeys(menuValues)
    }

    const chooseAll = () => {
      powerTree.value.setCheckedKeys(totalMenuIds)
    }

    const submit = async () => {
      const selectedMenus: MenuModel[] = powerTree.value.getCheckedNodes()
      console.log(selectedMenus)
      // 先移除权限
      await removeRoleMenuAsync({
        claimIds: menuIds.value
      })
      // 更新权限
      await updRoleMenuAsync({
        claims: selectedMenus.map(menu => {
          return {
            roleId: currentRole.id,
            claimType: menu.claimType,
            claimValue: menu.id
          }
        })
      })
      ElMessage.success('更新权限成功!')
      isShow.value = false
    }

    return {
      isShow,
      powerForm,
      powerTree,
      menus,

      setValue,
      chooseAll,
      submit
    }
  }
})
</script>
