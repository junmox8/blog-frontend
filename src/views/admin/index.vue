<template>
  <div :class="['container', store.theme]">
    <div class="container-header">
      <div class="title">CODEHJY</div>
      <el-menu
        :default-active="route.path"
        router
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="item in _menuList"
          :key="item.path"
          :index="item.path"
          :class="{ active: route.path === item.path }"
        >
          <i :class="['iconfont', 'mr5', item.icon]"></i>
          <span>{{ item.text }}</span>
        </el-menu-item>
      </el-menu>
      <div class="theme-img-container">
        <div class="img" @click="changeTheme"></div>
      </div>
    </div>
    <div class="container-body">
      <router-view v-slot="{ Component }">
        <keep-alive :exclude="['admin', 'articleDetail', 'more']">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme.js'
import { useRoute } from 'vue-router'
import menuList from '@/config/menuList.js'
import { ref } from 'vue'
const store = useThemeStore()
const route = useRoute()
const _menuList = ref(menuList)

const changeTheme = () => {
  store.changeTheme()
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  height: auto;
  min-width: 1388px;
  overflow: hidden;

  &-header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    background-color: #565c63;

    .title {
      height: 59px;
      line-height: 59px;
      letter-spacing: 2px;
      animation: color 3s linear infinite;
      outline: none;
      font-size: 18px;
    }

    .el-menu-demo {
      min-width: 760px;
      justify-content: flex-start;
    }

    .theme-img-container {
      width: 40px !important;
      height: 40px !important;
      outline: none;
      margin-top: 8px;

      .img {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: var(--background-icon);
        animation-name: rotate;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        cursor: pointer;
      }
    }
  }

  &-body {
  }
}

.container::after,
.container::before {
  clear: both;
}

@keyframes rotate {
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
}
</style>
