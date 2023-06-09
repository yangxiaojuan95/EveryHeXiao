<template>
  <div :class="BEMSpace" :style="{
    backgroundImage: `url(${bgPath})`
  }">
  
    <div :class="createBEMName('container')">
      <div class="slogan">
        <div v-html="project.loginPageSlogan1" :class="['line-one', { animate: project.loginPageSloganAnimation }]"></div>
        <div v-html="project.loginPageSlogan2" :class="['line-two', { animate: project.loginPageSloganAnimation }]"></div>
      </div>

      <div :class="createBEMName('content')">
        <el-card :class="createBEMName('card')" shadow="never">
          <div>
            <div :class="createBEMName('logo')">
              <img class="img" :src="logoPath" :style="{
                width: project.loginPageLogoWidth,
                height: project.loginPageLogoHeight
              }" />
              <div class="compony">{{ project.loginPageProjectName }}</div>
            </div>
            <div :class="createBEMName('title')">账号登录</div>
            <password-mode />
          </div>
        </el-card>
      </div>
    </div>

    <div class="copy-right">Copyright©{{ project.loginPageRigthsStartYear }}-{{ currentYear }} All Rights Reserved. 版权所有 {{ project.loginPageRigthsReserveCompany }}</div>

    <div id="particles-js"></div>
  </div>
</template>

<script setup lang="ts">

import createBEMNameSpace from '@/frame/utils/bem';
import { useResourceStore } from '@/store/resource';
import { computed, onMounted } from 'vue';
import PasswordMode from './components/password-mode/index.vue'
import WordTyping from './components/word-typing/index.vue'

const { BEMSpace, createBEMName } = createBEMNameSpace('login')

const currentYear = computed(() => {
  return new Date().getFullYear()
})

const resourceStoreState = useResourceStore()

const project = computed(() => {
  return resourceStoreState.project
})

const stamp = new Date().getTime()

const logoPath = computed(() => {
  return `${project.value.loginPageLogo}?v=${stamp}`
})

const bgPath = computed(() => {
  return project.value.loginPageBg
})

onMounted(() => {
  window.particlesJS.load('particles-js', '/scripts/particles/particlesjs-config.json', function () {
    console.log('callback - particles.js config loaded');
  });
})

</script>

<style lang="scss">

.login {
  position: relative;
  height: 100%;
  background-color: var(--loginBgColor);
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  background-position: center;
}

.login__container {
  transition: all .3s;
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  width: 1200px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}

.login__content {
  transition: all .3s;
}

.slogan {
  font-weight: 600;
  color: #fff;

  .line-one {
    font-size: 48px;

    &.animate {
      white-space: nowrap;
      overflow: hidden;
      width: var(--loginPageSlogan1Width);
      border-right: 1px solid transparent;
      animation: typing-word 1.5s steps(var(--loginPageSlogan1Step)), caret 1s 2;
    }
  }

  .line-two {
    font-size: 36px;
    margin-top: 20px;

    &.animate {
      white-space: nowrap;
      overflow: hidden;
      width: var(--loginPageSlogan2Width);
      border-right: 1px solid transparent;
      animation: typing-word 1.5s steps(var(--loginPageSlogan2Step)) 1.5s, caret 1s linear 1.5s 2, hidden 1.5s 1;
    }
  }

  .line-text1 {
    font-size: 48px;
    letter-spacing: 4px;
  }

  .line-text2 {
    font-size: 36px;
    letter-spacing: 4px;
    margin-top: 20px;
  }
}

.login__title {
  font-size: 18px;
  font-weight: 600;
}

.login__card {
  height: 100%;
  border-radius: 15px !important;
  overflow: hidden;

  .el-card__body {
    height: 100%;
    padding: 50px 30px 60px;
    box-sizing: border-box;
  }

  .login__logo {
    text-align: center;
    margin-bottom: 30px;
    font-size: 0;

    .img {
      width: 120px;
      height: 86px;
    }

    .compony {
      font-size: 14px;
      color: #333333;
      font-weight: 600;
      margin-top: 20px;
    }
  }
}

.copy-right {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  bottom: 30px;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 2;
  text-align: center;
}

// 手机
@media screen and (max-width: 768px) {

  .login__container {
    justify-content: center;
  }

  .login__content {
    transform: scale(.8);
    transform-origin: top;
  }

  .slogan {
    display: none;
  }
}

// 平板
@media screen and (max-width: 1100px) {
  .login__container {
    justify-content: center;
  }

  .login__content {
    transform: scale(.8);
    transform-origin: top;
  }

  .slogan {
    display: none;
  }
}

// 小屏
@media screen and (max-width: 1500px) {
  .login__container {
    width: 1000px;
  }
}

#particles-js .particles-js-canvas-el {
  transform: scale(1);
  opacity: 1;
  animation: appear 1.4s 1;
  animation-fill-mode: forwards
}

@keyframes appear {
  0% { opacity: 0; transform: scale(.1) }
  100% { opacity: 1; transform: scale(1) }
}


// 打字效果
@keyframes typing-word {
  from {
    width: 0;
  }
}

@keyframes caret {
  50% {
    border-color: currentColor;
  }
}

@keyframes hidden {
  from {
    width: 0;
  }
  to {
    width: 0;
  }
}

</style>