<template>
  <div class="public_box" :class="{active: sliderShow}">
    <div class="content">
      <div class="wrapper">
        <header class="header">
          <div class="container">
            <!-- <router-link to="/" tag="h1" class="name">章勇的博客</router-link> -->
            <nav class="nav">
              <router-link to="/" class="item" replace>
                <i class="iconfont icon-home"></i>
                <span class="nav_name">首页</span>
              </router-link>
              <router-link to="/CategoryArticle" class="item" replace>
                <i class="iconfont icon-category"></i>
                <span class="nav_name">分类</span>
              </router-link>
              <router-link to="/Archives" class="item" replace>
                <i class="iconfont icon-collect"></i>
                <span class="nav_name">归档</span>
              </router-link>
              <router-link to="/TagArticle" class="item" replace>
                <i class="iconfont icon-tag"></i>
                <span class="nav_name">标签</span>
              </router-link>
              <!-- <a class="item">
                <i class="iconfont icon-github"></i>
                <span class="nav_name">开源</span>
              </a>
              <a class="item">
                <i class="iconfont icon-about"></i>
                <span class="nav_name">关于</span>
              </a> -->
            </nav>
          </div>
        </header>
        <router-view class="view_box"></router-view>
      </div>

      <div class="sidebar_toggle" :class="{active: sliderShow}" @click="sliderShow = !sliderShow">
        <span class="line top"></span>
        <span class="line middle"></span>
        <span class="line bottom"></span>
      </div>

      <div class="to_top" :class="{active: showGoTop}" @click="goTopAction">
        <i class="iconfont icon-up"></i>
      </div>

      <footer class="footer">
        <a href="http://www.beian.miit.gov.cn" target="_blank">皖ICP备18005474号</a>
        <!-- © 2020
        <i class="iconfont icon-love"></i> zhangyong -->
      </footer>
    </div>

    <transition name="slider">
      <div class="slider" v-show="sliderShow">
        <div class="img">
          <img src="../../assets/img/avatar.jpg" alt="">
        </div>
        <p class="name">zhangyong</p>
        <div class="site">
          <router-link to="/Archives" class="item">
            <p class="count">{{countInfo.article}}</p>
            <p class="site_name">日志</p>
          </router-link>
          <router-link to="/CategoryArticle" class="item">
            <p class="count">{{countInfo.category}}</p>
            <p class="site_name">分类</p>
          </router-link>
          <router-link to="/TagArticle" class="item">
            <p class="count">{{countInfo.tag}}</p>
            <p class="site_name">标签</p>
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, onUnmounted, reactive,
} from 'vue';
import { getCount } from '@/commons/api';

export default defineComponent({
  name: 'Public',
  setup() {
    const showGoTop = ref(false);
    function scrollHandle() {
      if (window.scrollY > 50) {
        showGoTop.value = true;
      } else {
        showGoTop.value = false;
      }
    }
    window.addEventListener('scroll', scrollHandle);
    onUnmounted(() => {
      window.removeEventListener('scroll', scrollHandle);
    });

    const timer = ref<number | undefined>(undefined);
    function goTopAction() {
      timer.value = undefined;
      timer.value = setTimeout(() => {
        const oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          window.scrollTo(0, oTop - 50);
          goTopAction();
        } else {
          clearTimeout(timer.value);
        }
      }, 10);
    }

    let countInfo = reactive({
      article: 0,
      category: 0,
      tag: 0,
    });
    function getCountHandle() {
      getCount().then((res) => {
        if (res.data.reCode === 200) {
          countInfo = res.data.result;
        }
      });
    }
    getCountHandle();

    const sliderShow = ref(false);

    return {
      showGoTop,
      sliderShow,
      countInfo,
      goTopAction,
    };
  },
});
</script>

<style lang="less">
@media screen and (min-width: 0px) {
  .header .container,
  .view_box {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
@media screen and (min-width: 1000px) {
  .header .container,
  .view_box {
    width: 700px;
  }
}
@media screen and (min-width: 1300px) {
  .header .container,
  .view_box {
    width: 900px;
  }
}
@media screen and (max-width: 800px) {
  .public_box.active {
    padding-right: 0 !important;
  }
}
.slider-enter-active {
  transition: all 0.2s;
}
.slider-leave-active {
  transition: all 0.4s ease-in-out;
}
.slider-enter,
.slider-leave-to {
  transform: translateX(320px);
}
.public_box {
  min-height: 100vh;
  display: flex;
  overflow: hidden;
  transition: all 0.3s;
  &.active {
    padding-right: 320px;
  }
  .content {
    width: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
  }
  .slider {
    width: 320px;
    flex: 0 0 auto;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1040;
    background: #1d2935;
    .img {
      display: block;
      margin: 20px auto;
      padding: 2px;
      width: 96px;
      height: 96px;
      border: 2px solid #333;
      overflow: hidden;
      img {
        height: 100%;
      }
    }
    .name {
      margin-top: -10px;
      text-align: center;
      color: #f5f5f5;
      font-size: 16px;
    }
    .site {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      .item {
        padding: 0 15px;
        text-align: center;
        line-height: 1.4;
        color: #999999;
        cursor: pointer;
        .count {
          font-size: 18px;
          font-weight: 600;
        }
        .site_name {
          font-size: 13px;
        }
        & + .item {
          border-left: 1px solid #333333;
        }
        &:hover {
          color: #eeeeee;
        }
      }
    }
  }
  .wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .view_box {
    flex: 1;
  }
  .sidebar_toggle {
    position: fixed;
    right: 30px;
    bottom: 45px;
    width: 24px;
    height: 24px;
    padding: 0 5px;
    box-sizing: border-box;
    background: #1d2935;
    z-index: 1050;
    font-size: 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .line {
      position: relative;
      display: inline-block;
      height: 2px;
      width: 100%;
      margin-top: 6px;
      vertical-align: top;
      background: #ffffff;
      width: 100%;
      top: 0px;
      transform: rotateZ(0deg);
      opacity: 1;
      left: 0px;
      transition: all 0.5s;
      & + .line {
        margin-top: 3px;
      }
      overflow: hidden;
    }
    &:hover {
      .top {
        width: 50%;
        top: 2px;
        transform: rotateZ(-45deg);
        opacity: 1;
        left: 0px;
      }
      .bottom {
        width: 50%;
        top: -2px;
        transform: rotateZ(45deg);
        opacity: 1;
        left: 0px;
      }
    }
    &.active {
      .top {
        width: 100%;
        top: 5px;
        transform: rotateZ(-45deg);
        opacity: 1;
        left: 0px;
      }
      .middle {
        width: 100%;
        opacity: 0;
        left: 0px;
        top: 0px;
        transform: rotateZ(0deg);
      }
      .bottom {
        width: 100%;
        top: -5px;
        transform: rotateZ(45deg);
        opacity: 1;
        left: 0px;
      }
    }
  }
  .to_top {
    position: fixed;
    bottom: -100px;
    right: 30px;
    z-index: 1050;
    width: 24px;
    height: 24px;
    background: #1d2935;
    color: #fff;
    cursor: pointer;
    text-align: center;
    line-height: 24px;
    transition-property: bottom;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    .iconfont {
      font-size: 12px;
    }
    &.active {
      bottom: 19px;
    }
  }
  .header {
    width: 100%;
    height: 85px;
    background-color: #2c3e50;
    box-sizing: border-box;
    .container {
      // width: 900px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        width: 115px;
        flex: 0 0 auto;
        font-size: 22px;
        font-weight: bolder;
        color: #ffffff;
        cursor: pointer;
      }
      .nav {
        margin-top: 16px;
        .item {
          padding: 6px 10px;
          color: #ffffff;
          border-radius: 2px;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          .iconfont {
            margin-right: 6px;
            font-size: 14px;
          }
          .nav_name {
            font-size: 12px;
          }
          &:hover {
            background: #e1e1e1;
            color: #555;
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 50px;
    font-size: 14px;
    color: #ffffff;
    background-color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #ffffff;
    }
    .iconfont,
    .divider {
      padding: 0 12px;
    }
    .iconfont {
      font-size: 14px;
    }
    .divider {
      font-size: 16px;
    }
  }
}
</style>
