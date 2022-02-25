<template>
  <div class="login_box">
    <div class="form">
      <div class="form_title">
        欢迎登陆
      </div>
      <div class="form_body">
        <input
          v-model="username"
          type="text"
          class="input"
          placeholder="请输入姓名"
        >
        <input
          v-model="password"
          type="password"
          class="input"
          placeholder="请输入密码"
        >
        <p
          class="btn"
          @click="loginHandle"
        >
          登陆
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { login } from '@/commons/api'
import http from '@/commons/http'

const username = ref('')
const password = ref('')
const store = useStore()
const router = useRouter()

function loginHandle () {
  if (username.value === '') {
    ElMessage({
      message: '请输入用户名!',
      type: 'warning'
    })
    return
  }
  if (password.value === '') {
    ElMessage({
      message: '请输入密码!',
      type: 'warning'
    })
    return
  }
  // loading
  const loading = ElLoading.service({
    lock: true,
    text: '正在登陆'
  })
  login({
    username: username.value,
    password: password.value
  }).then((res) => {
    loading.close()
    if (res.data.reCode === 200) {
      const { token } = res.data.result
      store.commit('setToken', token)
      http.defaults.headers.common.token = token
      router.push('/Admin')
    }
  }).catch(() => {
    loading.close()
  })
}
</script>

<style lang="less">
.login_box {
  width: 100%;
  height: 100vh;
  background: url("../../assets/img/avatar.jpg") center no-repeat;
  background-size: cover;
  .form {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    background-color: #ffffff;
    .form_title {
      width: 100%;
      height: 51px;
      line-height: 20px;
      padding: 14px 16px;
      box-sizing: border-box;
      display: inline-block;
      font-size: 14px;
      color: #1c2438;
      font-weight: 700;
      border-bottom: 1px solid #e9eaec;
    }
    .form_body {
      margin-top: 6px;
      padding: 16px;
      .input {
        width: 100%;
        height: 32px;
        margin-bottom: 24px;
        line-height: 32px;
        padding: 4px 7px;
        box-sizing: border-box;
        font-size: 12px;
        border: 1px solid #dddee1;
        border-radius: 4px;
        color: #495060;
        background-color: #fff;
      }
      .btn {
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-bottom: 24px;
        background-color: #2d8cf0;
        color: #ffffff;
        font-size: 12px;
        text-align: center;
        border-radius: 4px;
      }
    }
  }
}
</style>
