<script setup lang="ts">

  import { defineConfig } from '@juzhenfe/page-model';
  import { nextTick, onMounted, ref } from 'vue';
  import RoleForm from './components/role-form/index.vue'
  import PwdForm from './components/pwd-form/index.vue'

  const roleFormRef = ref<any>(null)
  const pwdFormRef = ref<any>(null)
  const config = defineConfig<UserModel>({
    url: '/api/Employs',
    size: 'small',
    delKey: 'id',
    table: {
      operate: {
        els: [
          {
            text: '编辑',
            isEdit: true,
            props: {
              type: 'text'
            }
          },
          {
            text: '删除',
            isDel: true,
            props: {
              type: 'text'
            }
          },
          {
            text: '角色',
            event: 'role',
            props: {
              type: 'text'
            }
          },
          // {
          //   text: '修改密码',
          //   event: 'pwd',
          //   props: {
          //     type: 'text'
          //   }
          // }
        ]
      },
      els: [
        {
          prop: 'userName',
          label: '用户名称'
        },
        {
          prop: 'account',
          label: '账号'
        },
        {
          prop: 'phoneNumber',
          label: '电话'
        },
        {
          prop: 'creationTime',
          label: '创建时间'
        }
      ]
    },
    form: {
      mode: 'dialog',
      dialogProps: {
        title: '用户'
      },
      props: {
        labelWidth: '100px'
      },
      required: ['account', 'password'],
      els: [
        {
          eType: 'img-upload',
          prop: 'headImgUrl',
          label: '头像'
        },
        {
          eType: 'el-input',
          prop: 'userName',
          label: '用户名称'
        },
        {
          eType: 'el-input',
          prop: 'phoneNumber',
          label: '电话'
        },
        {
          eType: 'el-input',
          prop: 'account',
          label: '账号'
        },
        {
          eType: 'el-input',
          prop: 'password',
          label: '密码'
        }
      ]
    }
  })

  const updRole = (user: UserModel) => {
    roleFormRef.value.setValue(user.id)
  }

  const updPwd = (user: UserModel) => {
    pwdFormRef.value.setValue(user.id)
  }

</script>

<template>
  <div style="height: 100%">
    <page-model v-if="config" ref="pageModelRef" :config="config" @role="updRole" @pwd="updPwd"></page-model>

    <!-- 角色表单 -->
    <role-form ref="roleFormRef" />

    <!-- 密码表单 -->
    <pwd-form ref="pwdFormRef" />
  </div>
</template>
