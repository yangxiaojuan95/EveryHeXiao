<script setup lang="ts">

  import { defineConfig, FormDialog } from '@juzhenfe/page-model';
  import { nextTick, onMounted, ref } from 'vue';
  import { processdRequest } from "@/utils/request";
  import { ElMessage } from 'element-plus';
  import { getMenuAsync, getUserMenuAsync } from '@/apis/system/menu'
  import { useUserStore } from '@/store/user'
  
  const userStore = useUserStore()
  const pageModelRef = ref<any>(null)
  const isShow = ref(false)
  const id = ref()
  const selection = ref([])
  let config = defineConfig<RoleModel>({
    getUrl: '/api/Permissions/Roles',
    size: 'small',
    delKey: 'id',
    table: {
      selectable: true,
      events: {
        selectionChange(e) {
          nextTick(() => {
            selection.value = this.selection
          })
        }
      },
      els: [
        {
          prop: 'name',
          label: '角色名称'
        }
      ]
    },
    hasForm: false
  })

  const setValue = async (userId: string) => {
    id.value = userId
    getUserRoles()
    isShow.value = true
    nextTick(() => {
      pageModelRef.value.refreshTableData()
    })
  }

  const getUserRoles = async () => {
    const res = await processdRequest.get('/api/Permissions/UserRoles', {
      id: id.value
    })
    pageModelRef.value.updateSelection(res)
  }

  const handleSubmit = async () => {
    await processdRequest.post('/api/Permissions/UserRoles', {
      userId: id.value,
      roleIds: selection.value.map((item: any) => item.id)
    })
    ElMessage.success(`更新成功`)
    updateMenus()
  }

  const updateMenus = async () => {
    const [allMenus, menus] = await Promise.all([getMenuAsync(), getUserMenuAsync()]) 
    userStore.updateTotalMenus(allMenus, menus)
  }

  defineExpose({
    setValue
  })

</script>

<template>
  <form-dialog title="用户角色" v-model="isShow">
    <page-model 
      v-if="config" 
      ref="pageModelRef" 
      style="height: 500px"
      :config="config">
    </page-model>
    <template #bottom>
      <el-button @click="handleSubmit">确认</el-button>
    </template>
  </form-dialog>
</template>
