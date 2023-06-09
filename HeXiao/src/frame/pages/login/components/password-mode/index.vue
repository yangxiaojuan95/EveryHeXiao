<template>
  <el-form class="login-form" :model="accountForm" ref="formRef" :rules="rules">
    <el-form-item required prop="account">
      <el-input v-model="accountForm.account" placeholder="请输入账号" type="text">
        <template #prefix>
          <img class="icon" src="/imgs/icon_user@3x.png" alt="" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item required prop="password">
      <el-input v-model="accountForm.password" placeholder="请输入密码" type="password" @keydown.enter="submit">
        <template #prefix>
          <img class="icon" src="/imgs/icon_password@3x.png" alt="" />
        </template>
      </el-input>
    </el-form-item>

    <!-- <div class="password-opr">
      <el-checkbox v-model="remenber" label="记住密码" />
    </div> -->

    <el-button :loading="submitLoading" class="login-submit" size="large" type="primary" @click="submit">立即登录
    </el-button>
  </el-form>
</template>

<script lang="ts">
export default {
  name: 'MsgcodeMode',
}
</script>

<script setup lang="ts">
import { doLoginAsync } from '@/apis/system/login'
import { jsonClone } from '@/frame/utils'
import tokenStorage from '@/frame/utils/token'
import md5 from 'blueimp-md5'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const formRef = ref<any>(null)
const remenber = ref(false)
let accountForm = reactive({
  account: '',
  password: '',
})

let rules = reactive({
  account: { required: true, message: '请填写账号' },
  password: { required: true, message: '请填写密码' },
})

const router = useRouter()

const submitLoading = ref(false)

const saveAccount = () => {
  let savePW = JSON.stringify(jsonClone(accountForm))
  savePW = btoa(savePW)
  localStorage.setItem('account', savePW)
}

const getAccount = () => {
  let getA = localStorage.getItem('account') as any
  if (getA) {
    getA = JSON.parse(atob(getA))
    accountForm.account = getA.account
    accountForm.password = getA.password
    remenber.value = true
  }
}

const clearAccount = () => {
  localStorage.removeItem('account')
}

onMounted(() => {
  getAccount()
})

const submit = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    submitLoading.value = true
    try {
      const result = await doLoginAsync({
        ...accountForm,
        password: md5(accountForm.password),
      })
      tokenStorage.set(result)

      if (remenber.value) {
        saveAccount()
      } else {
        clearAccount()
      }

      ElMessage.success('登录成功！')
      router.push('/')
    } catch (error) {
      console.log('login error', error)
    } finally {
      submitLoading.value = false
    }
  })
}
</script>

<style lang="scss" scoped>
.login-form {
  margin-top: 40px;
}

/* 推荐 */
.el-input ::-webkit-input-placeholder {
  color: #ccc;
}

/* 添加关键词 !important */
::-webkit-input-placeholder {
  color: #ccc !important;
}


.el-input {
  height: 44px;
  line-height: 44px;
}

.icon {
  width: 22px;
  height: 22px;
}

::v-deep .el-form-item {
  border-radius: 4px;
  margin-bottom: 0;

  .el-input__wrapper {
    width: 320px;
    border: 1px solid #c7ced7;
    box-shadow: none;
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow: none !important;
    transition: border-color .3s;

    &.is-focus {
      border-color: var(--theme);
    }

    &:hover {
      border-color: var(--theme);
    }
  }

  &+.el-form-item {
    margin-top: 25px;
  }
}

::v-deep .el-checkbox {
  height: auto;

  .el-checkbox__label {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 2px;
  }
}

.register-submit {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #2453fb;
  line-height: 20px;
}

.password-opr {
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin-top: 15px;
}

.login-submit {
  margin-top: 30px;
  width: 100%;
  border-radius: 4px;
  background: var(--theme);
  font-weight: 600;
  color: #ffffff;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
}
</style>
