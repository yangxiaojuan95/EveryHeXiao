<template>

  <el-form :model="accountForm" ref="formRef" :rules="rules" style="margin-top: 10px;" >
    <el-form-item prop="phone">
      <el-input size="large" v-model="accountForm.phone" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <div class="get-code">
        <el-input size="large" v-model="accountForm.code" placeholder="验证码"></el-input>
        <el-button class="get-code-btn" size="large" type="info">获取验证码</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button class="login-submit" size="large" type="primary" @click="submit">登录</el-button>
    </el-form-item>
  </el-form>

</template>

<script lang="ts">import { reactive, ref } from 'vue';

export default {
  name: 'PasswordMode'
}
</script>

<script setup lang="ts">
  const formRef = ref<any>(null)

  let accountForm = reactive({
    phone:'',
    code:''
  })

  let rules = reactive({
    phone: { required: true, message: '请填写手机号' },
    code: { required: true, message: '请填写验证码' },
  })

  const submit = () => {
    
    formRef.value.validate(async (valid: boolean) => {
      console.log('vali::', valid)
      if (!valid) return
      })
  }
</script>

<style lang="scss" scoped>
  .login-submit{
    width: 100%;
    border-radius: 20px;
    height: 40px;
  }
  .get-code{
    display: flex;
    .get-code-btn{
      margin-left: 10px;
    }
  }
</style>

