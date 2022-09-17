<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input placeholder="username" type="text" v-model="loginForm.username"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input placeholder="password" :type="passwordType" v-model="loginForm.password"/>
        <span
          class="show-pwd"
          @click="passwordType==='password'? passwordType='text':passwordType='password'"
        >
          <svg-icon :icon="passwordType==='password'? 'eye-open': 'eye'"></svg-icon>
        </span>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%;margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { validatePassword } from '@/views/login/rules'
import { useStore } from 'vuex'
import { ref, reactive } from 'vue'

const store = useStore()

const passwordType = ref('password')

// 表单数据
const loginForm = reactive({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
const loginRules = {
  username: [
    {
      required: true,
      message: '账号不能为空',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 20,
      message: '账号长度为3到10个字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword
    }
  ]
}

const loginFormRef = ref(null) // 表单对象
const loading = ref(false) // 登录状态

// 点击登录
const handleLogin = () => {
  loading.value = true
  loginFormRef.value.validate(async (isValid) => {
    if (isValid) {
      await store.dispatch('user/login', loginForm)
      loading.value = false
    }
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  :deep(.el-form-item) {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      border: none;
      outline: none;

      .el-input__wrapper {
        width: 100%;
        height: 100%;
        border: none;
        box-shadow: none;
        padding: 12px 5px 12px 15px;
        background: transparent;
        caret-color: $cursor;

        .el-input__inner {
          color: white;
        }
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 9px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

</style>
