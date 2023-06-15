<template>
  <div class="container dark" :style="{
    backgroundImage: `url(${staticInto.backgroundImgSrc})`,
  }">
    <div class="container-left">
      <div class="container-left-text">
        <div class="cn-text">{{ staticInto.cnText }}</div>
        <div class="en-text">
          {{ staticInto.enText }}
        </div>
      </div>
    </div>
    <div class="container-right">
      <div class="container-right-header">
        <div class="project-name">博客项目 <span class="version">v1.0.0</span></div>
        <div class="author-name">黄俊轶</div>
      </div>
      <div :class="['container-right-body', `is-${currentBoxType}`]">
        <div class="login-box" ref="loginBox">
          <p>用户名</p>
          <input type="text" v-model="usernameToLogin" @keydown.enter="handleLogin" class="input" />
          <p>密码</p>
          <input type="password" v-model="passwordToLogin" @keydown.enter="handleLogin" class="input" />
          <div class="change-box-link" @click="changeInputBox('register')">
            点击注册
          </div>
          <el-button class="login-button" @click="handleLogin" :loading="loginLoading">立即登录</el-button>
        </div>
        <div class="register-box" ref="registerBox">
          <p>用户名</p>
          <input type="text" v-model="usernameToRegister" class="input" />
          <p>密码</p>
          <input type="password" v-model="passwordToRegister" class="input" />
          <div class="change-box-link" @click="changeInputBox('login')">
            点击登录
          </div>
          <el-button class="register-button" @click="handleRegister" :loading="registerLoading">立即注册</el-button>
        </div>
      </div>
      <div class="container-right-footer">
        <div class="online-users">
          当前在线:{{ onlineUsers }}人
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/counter";
import { useRouter } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { getLoginBgc, getLoginWord, register, login } from "@service/login";
import socket from '@/utils/socket'
const store = useUserStore()
const router = useRouter();
const usernameToRegister = ref("");
const passwordToRegister = ref("");
const usernameToLogin = ref("");
const passwordToLogin = ref("");
const currentBoxType = ref('login')
const loginLoading = ref(false)
const registerLoading = ref(false)
const staticInto = reactive({
  backgroundImgSrc: "",
  cnText: "",
  enText: "",
});
const onlineUsers = ref(0)
onMounted(() => {
  initAssets()
  initOnlineUsers()
})
const initAssets = async () => {
  try {
    let promiseArr = [getLoginBgc(), getLoginWord()];
    Promise.all(promiseArr).then((res) => {
      staticInto.backgroundImgSrc = "https://cn.bing.com/" + res[0].data.images[0].url;
      staticInto.cnText = res[1].data.note;
      staticInto.enText = res[1].data.content;
    });
  } catch (error) {
    ElMessage({
      message: "加载壁纸或文字失败",
      type: "error",
    });
  }
}
const initOnlineUsers = async () => {
  socket.on("onlineUsers", userCount => {
    onlineUsers.value = userCount
  })
  socket.emit("getOnlineUsers", 1)
}
const changeInputBox = (type) => {
  currentBoxType.value = type
}
const handleRegister = async () => {
  if (usernameToRegister.value && passwordToRegister.value) {
    registerLoading.value = true
    const { data: { success, errorMsg } } = await register(
      usernameToRegister.value,
      passwordToRegister.value
    );
    if (success) {
      ElMessage({
        message: "用户注册成功",
        type: "success",
      });
    } else {
      ElMessage({
        message: errorMsg,
        type: "error",
      });
    }
    registerLoading.value = false

  } else {
    ElMessage({
      message: "请补充完整信息",
      type: "error",
    });
  }
};
const handleLogin = async () => {
  if (usernameToLogin.value && passwordToLogin.value) {
    loginLoading.value = true
    const loginResult = await login(
      usernameToLogin.value,
      passwordToLogin.value
    );
    const { data: { success = false, errorMsg = '', data = {} } } = loginResult || {};
    if (success) {
      ElMessage({
        message: "用户登录成功",
        type: "success",
      });
      store.setUserId(data.dataValues.id);
      store.setToken(data.token);
      localStorage.setItem("token", data.token);
      router.push("/admin?id=" + data.dataValues.id);
    } else {
      ElMessage({
        message: errorMsg,
        type: "error",
      });
    }
    loginLoading.value = false

  } else {
    ElMessage({
      message: "请补充完整信息",
      type: "error",
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  background-color: #f0f1fa;

  &-left {
    padding: 60vh 0 0 5vw;
    width: 50%;
    box-sizing: border-box;

    &-text {
      overflow: hidden;

      .en-text {
        margin-top: 2vh;
      }

      .cn-text,
      .en-text {
        color: #ffffff;
        width: 50vw;
        word-break: break-all;
        word-wrap: break-word;
        font-size: 18px;
      }
    }
  }

  &-right {
    width: 50%;
    height: 100%;
    position: relative;
    z-index: 2;
    background-color: hsla(0, 0%, 100%, 0.85);
    overflow: hidden;
    perspective: 2000px;
    transform-style: preserve-3d;

    &-header {
      position: relative;
      margin-bottom: 120px !important;
      margin-top: 6vh;
      text-align: center;
      font-size: 28px;
      letter-spacing: 4px;
      font-family: 微软雅黑;
      font-weight: 500;
      color: rgb(129, 138, 212);
      transform-style: preserve-3d;
      transition: all;
      transition-duration: 2s;
      animation-name: a;
      animation-duration: 2s;
      animation-direction: alternate-reverse;
      animation-iteration-count: infinite;
      animation-timing-function: linear;

      .project-name {
        text-align: center;
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .author-name {
        text-align: center;
        width: 100%;
        height: 100%;
        position: absolute;
        transform: rotateX(82deg);
      }

      .version {
        font-size: 0.6em;
        letter-spacing: normal;
        padding-left: 3px;
      }
    }

    &-header:hover {
      animation-play-state: paused;
    }

    &-body {
      width: 70%;
      height: 390px;
      position: relative;
      overflow: hidden;
      margin-left: 15%;

      .login-box {
        left: 0;
      }

      .register-box {
        left: 100%;
        overflow: hidden;

      }



      .login-box,
      .register-box {
        width: 100%;
        height: 390px;
        position: absolute;
        top: 0;
        transition: all;
        transition-duration: 1s;

        .input {
          width: 99%;
          height: 40px;
          background-color: transparent;
          outline: none !important;
          border-color: #cfcfcf;
          border-style: solid;
          border-width: 1px;
          text-indent: 1.5em;
          border-radius: 2%;
          margin-top: 10px;
        }

        .input:hover {
          border-color: #a8a8a8 !important;
        }

        .input:focus {
          border-color: rgb(129, 138, 212);
        }

        .input:default {
          border-color: #cfcfcf;
        }

        p {
          display: block;
          font-size: 14px;
          color: #4d5259;
          font-weight: 700;
        }



        p:nth-of-type(2) {
          margin-top: 18px;
        }

        .change-box-link {
          margin-top: 30px;
          width: max-content;
          margin-left: 85%;
          color: rgb(129, 138, 212);
          cursor: pointer;
        }

        .login-button,
        .register-button {
          width: 100%;
          background-color: rgb(129, 138, 212);
          color: #fffff8;
          margin-top: 18px;
        }



        .login-button:hover,
        .register-button:hover {
          background-color: #9aa1dd;
          color: #fffff8;
        }
      }
    }

    &-footer {
      width: 70%;
      margin-left: 15%;
      display: flex;
      justify-content: center;

      .online-users {}
    }

    .is-login {
      .login-box {
        left: 0
      }

      .register-box {
        left: 100%;
      }
    }

    .is-register {
      .login-box {
        left: -100%
      }

      .register-box {
        left: 0;
      }
    }
  }
}









@keyframes a {
  from {}

  to {
    transform: rotateX(-97deg);
  }
}
</style>
