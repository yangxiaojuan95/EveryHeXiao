<script lang="ts">
export default {
  name: 'MenuManagement'
}
</script>

<script setup lang="ts">
  import { delMenuAsync, getMenuAsync, getUserMenuAsync } from '@/apis/system/menu';
  import { tree } from '@/frame/utils';
  import createBEMNameSpace from '@/frame/utils/bem';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { computed, ref } from 'vue';
  import { useUserStore } from "@/store/user";
  import AsideMenu from './components/aside-menu/index.vue';
  import ChildMenu from './components/child-menu/index.vue';
  import MenuForm from './components/menu-form/index.vue';
  import FuncForm from './components/func-form/index.vue';
import { getUserInfoAsync } from '@/apis/system/login';

  const userStore = useUserStore()

  const { BEMSpace, createBEMName } = createBEMNameSpace('system-menu')

  const totalMenus = ref<MenuModel[]>([])

  const getMenus = async () => {
    const result = await getMenuAsync()
    totalMenus.value = result
    console.log(result)
  }

  const updateMenus = async () => {
    const userInfo = await getUserInfoAsync()
    userStore.updateUserData(userInfo.Result)
    const [allMenus, menus] = await Promise.all([getMenuAsync(), getUserMenuAsync(userInfo.Result.roleId)]) 
    userStore.updateTotalMenus(allMenus, menus)
    totalMenus.value = allMenus
  }

  getMenus()

  const treedMenus = computed(() => {
    return tree(totalMenus.value, 'id', 'pId')
  })

  const current = ref(0)

  const childrenMenu = computed(() => {
    if (treedMenus.value.length) {
      return treedMenus.value[current.value].childs ?? []
    } else {
      return []
    }
  })

  const menuFormRef = ref<any>()
  const funcFormRef = ref<any>()

  const onAddRootMenu = () => {
    menuFormRef.value.resetValue()
  }

  const onAddChildMenu = (menu: MenuModel, index: number) => {
    menuFormRef.value.resetValue(menu.id)
  }

  const onEdit = (menu: MenuModel, index: number) => {
    menuFormRef.value.setValue(menu)
  }

  const onDel = async (menu: MenuModel, index: number) => {
    await ElMessageBox.confirm('是否确定删除该菜单?', '提示', {
      type: 'warning'
    })
    await delMenuAsync({ id: menu.id })
    ElMessage.success('删除菜单成功')
    updateMenus()
  }

  const onShowFunc = (menu: MenuModel, index: number) => {
    funcFormRef.value.show(menu)
  }

</script>

<template>
  <div :class="BEMSpace">
    <aside-menu 
      v-model:current="current" 
      :menus="treedMenus" 
      :class="createBEMName('aside-menu')"
      @add-root-menu="onAddRootMenu"
      @edit="onEdit"
      @del="onDel"
      @add-child-menu="onAddChildMenu"
    />
    <child-menu
      :menus="childrenMenu"
      @edit="onEdit"
      @del="onDel"
      @showFunc="onShowFunc"
      :class="createBEMName('child-menu')" 
    />
    <menu-form ref="menuFormRef" :menus="treedMenus" @refresh="updateMenus" />
    <func-form ref="funcFormRef" @refresh="updateMenus" />
  </div>  
</template>

<style lang="scss" scoped>

.system-menu {
  position: relative;
  height: 100%
}

.system-menu__aside-menu {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  box-sizing: border-box;
  border-right: 1px solid #EBEEF5;
  padding: 20px
}

.system-menu__child-menu {
  margin-left: 300px;
}

</style>