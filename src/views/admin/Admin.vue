<template>
  <div class="admin_box">
    <el-menu
      :default-active="route.path"
      router
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/Admin">
        <i class="el-icon-tickets" />
        <template #title>
          文章管理
        </template>
      </el-menu-item>
      <el-menu-item index="/Category">
        <i class="el-icon-menu" />
        <template #title>
          分类管理
        </template>
      </el-menu-item>
      <el-menu-item index="/Tag">
        <i class="el-icon-news" />
        <template #title>
          标签管理
        </template>
      </el-menu-item>
      <el-menu-item index="/AddArticle">
        <i class="el-icon-document" />
        <template #title>
          添加文章
        </template>
      </el-menu-item>
    </el-menu>

    <div class="main_container">
      <div class="navbar">
        <Hamburger
          class="hamburger_container"
          :is-active="!isCollapse"
          @toggle-click="toggleSideBar"
        />
        <p class="name">
          {{ currentRoute }}
        </p>
        <el-dropdown
          class="avatar_container"
          trigger="click"
        >
          <div class="avatar_wrapper">
            <img
              class="user_avatar"
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            >
            <i class="el-icon-caret-bottom" />
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user_dropdown">
              <router-link
                class="inlineBlock"
                to="/"
              >
                <el-dropdown-item>Home</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span
                  style="display:block;"
                  @click="logout"
                >LogOut</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <router-view class="view" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Hamburger from '@/components/elements/hamburger'

const isCollapse = ref<boolean>(false)

const route = useRoute()
const currentRoute = computed(() => route.name)

function handleOpen (key: string, keyPath: string) {
  console.log(key, keyPath)
}
function handleClose (key: string, keyPath: string) {
  console.log(key, keyPath)
}
function toggleSideBar () {
  isCollapse.value = !isCollapse.value
}
function logout () {
  console.log(1)
}
</script>

<style lang="less">
.admin_box {
  display: flex;
  .el-menu-vertical-demo {
    min-height: 100vh;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    text-align: left;
  }
  .main_container {
    width: 0;
    height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
    .navbar {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e6e6e6;
      .hamburger_container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
      }
      .name {
        margin-left: 10px;
        color: #303133;
        float: left;
        font-size: 14px;
        font-weight: 600;
      }
      .avatar_container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar_wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          outline: none;
          .user_avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
    .view {
      flex: 1;
      padding: 20px;
      overflow: scroll;
    }
  }
}
</style>
