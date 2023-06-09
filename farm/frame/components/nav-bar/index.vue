<template>
  <view>
    <!-- navbar 内容 -->
    <view
      :class="[
        'navbar',
        !isCustom ? 'flex-c-center' : '',
        fixed ? 'fixed' : '',
        useScroll ? 'scrollable' : '',
      ]"
      :style="{
        paddingTop: addUnit(rectInfo.paddingT),
        paddingRight: addUnit(rectInfo.paddingR),
        paddingLeft: addUnit(rectInfo.paddingL),
        paddingBottom: addUnit(rectInfo.paddingB),
        height: addUnit(rectInfo.paddingT + navHeight),
        background: navBg.background,
        borderBottom: `1px solid ${navBg.borderBottom}`,
      }"
    >
      <slot name="custom" :height="addUnit(menuRectInfo.height)">
        <!-- 左侧按钮 -->
        <view
          class="navbar_left fs0"
          :style="{
            width: addUnit(customNavLeftWidth || menuRectInfo.width),
            marginRight: addUnit(rectInfo.gap),
          }"
        >
          <slot name="left">
            <view v-if="isShowBack && isShowHome" class="two-btn flex-c-center">
              <text
                class="iconfont-nav icon-nav_back fg1 flex-center"
                @click="toback"
              ></text>
              <text
                class="iconfont-nav icon-nav_home fg1 flex-center"
                @click="tohome"
              >
              </text>
            </view>
            <template v-else>
              <text
                v-if="isShowBack"
                class="iconfont-nav icon-nav_back flex-center btn-solo"
                :style="{
                  height: addUnit(menuRectInfo.height),
                  width: addUnit(menuRectInfo.height),
                  borderColor: `rgba(214, 214, 214, 1)`,
                }"
                @click="toback"
              />
              <text
                v-if="isShowHome"
                class="iconfont-nav icon-nav_home flex-center btn-solo"
                :style="{
                  height: addUnit(menuRectInfo.height),
                  width: addUnit(menuRectInfo.height),
                  borderColor: `rgba(214, 214, 214, 1)`,
                }"
                @click="tohome"
              />

              <!-- 追加 -->
              <template v-if="isAppend">
                <view class="nav-appends">
                  <slot
                    name="append"
                    :border-color="`rgba(214, 214, 214, 1)`"
                    :navbg="navBg"
                    :width="addUnit(menuRectInfo.height)"
                    :appendData="appendData"
                  />
                </view>
              </template>
            </template>
          </slot>
        </view>

        <!-- 标题 -->
        <view
          class="navbar_title fg1 text-hidden"
          :style="{ opacity: navBg.opacity, color: fontColor }"
        >
          <slot name="center">
            <text>{{ title }}</text>
          </slot>
        </view>
      </slot>
    </view>

    <!-- navbar 占位内容 -->
    <view
      v-if="fixed && !useScroll"
      class="navbar_placeholder"
      :style="{
        paddingTop: addUnit(rectInfo.paddingT),
        height: addUnit(navHeight),
      }"
    />
  </view>
</template>

<script>
const OUT_BOTTOM = 20; // 超出胶囊底部高度 upx
const RIGHT_GAP = 20; // 距离胶囊右侧 upx
const SCROLL_HEIGHT_TOP = 100; // 滚动上间距安全距离 px
const SCROLL_HEIGHT_BOTTOM = 200; // 滚动全显示距离 px
const TAB_PATH = ["pages/index/index"];

import Vue from "vue";

export default Vue.extend({
  name: "NavBar",
  props: {
    fixed: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
    back: {
      type: [Boolean, String],
      default: "auto",
    },
    home: {
      type: [Boolean, String],
      default: "auto",
    },
    background: {
      type: String,
      default: "rgb(255, 255, 255)",
    },
    fontColor: {
      type: String,
      default: "#333",
    },
    useScroll: {
      type: Boolean,
      default: false,
    },
    scrollTop: {
      type: Number,
      default: 0,
    },
    append: {
      type: Boolean,
      default: false,
    },
    appendData: {
      type: Object,
      default: () => ({}),
    },
    navLeftWidth: {
      type: Number,
      default: null,
    },
	alwaysShowTitle: {
		type: Boolean,
		default: false,
	}
  },
  data() {
    return {
      menuRectInfo: {}, // 胶囊信息
      rectInfo: {
        gap: uni.upx2px(RIGHT_GAP),
        paddingR: 0,
        paddingT: 0,
        paddingL: 0,
        paddingB: 0,
      },
    };
  },
  computed: {
    navHeight() {
      return this.menuRectInfo.height + uni.upx2px(OUT_BOTTOM);
    },
    customNavLeftWidth() {
      return this.navLeftWidth ? this.covertUnit(this.navLeftWidth) : null;
    },
    isShowHome() {
      if (this.home === "auto") {
        const pages = getCurrentPages();
        return (
          pages.length === 1 && !TAB_PATH.includes(pages[0].route)
        );
      } else {
        return this.home;
      }
    },
    isShowBack() {
      if (this.back === "auto") {
        return getCurrentPages().length > 1;
      } else {
        return this.back;
      }
    },
    navBg() {
      if (this.useScroll) {
        let opacity = 0;
        const scrollTop = this.scrollTop;
        if (scrollTop < SCROLL_HEIGHT_TOP) {
          opacity = 0;
        } else if (scrollTop > SCROLL_HEIGHT_BOTTOM) {
          opacity = 1;
        } else {
          opacity =
            (scrollTop - SCROLL_HEIGHT_TOP) /
            (SCROLL_HEIGHT_BOTTOM - SCROLL_HEIGHT_TOP);
        }
        return {
          background: this.createRgba(this.background, opacity),
          opacity: this.alwaysShowTitle ? 1 : opacity,
          borderBottom: `rgba(214, 214, 214, ${opacity})`,
        };
      } else {
        return {
          background: this.background,
        };
      }
    },
    isCustom() {
      return !!this.$slots.custom;
    },
    isAppend() {
      return this.append;
    },
  },
  created() {
    const systemInfo = uni.getSystemInfoSync();
    let menuRectInfo;
    // #ifndef MP-WEIXIN
    menuRectInfo = this.menuRectInfo = {
      width: 60,
      height: 32,
      top: (systemInfo.safeArea?.top ?? 10),
      bottom: 58,
      right: 365,
      left: 278,
    };
    this.rectInfo.paddingT = menuRectInfo.top;
    this.rectInfo.paddingR = 80;
    this.rectInfo.paddingL = 10;
    this.rectInfo.paddingB = uni.upx2px(OUT_BOTTOM);
    // #endif

    // #ifdef MP-WEIXIN
    menuRectInfo = this.menuRectInfo = uni.getMenuButtonBoundingClientRect();
    const windowWidth = uni.getSystemInfoSync().windowWidth;
    this.rectInfo.paddingT = menuRectInfo.top;
    this.rectInfo.paddingR = windowWidth - menuRectInfo.left + this.rectInfo.gap;
    this.rectInfo.paddingL = windowWidth - menuRectInfo.right;
    this.rectInfo.paddingB = uni.upx2px(OUT_BOTTOM)
    // #endif

    // 设置高度
    this.$store.commit(
      "system/updateNavHeight",
      this.navHeight + menuRectInfo.top
    );
  },
  methods: {
    createRgba(background, opacity) {
      const content = background.match(/\((.+)\)/);
      if (content) {
        return `rgba(${content[1]}, ${opacity})`;
      }
      return "";
    },
    addUnit(num) {
      return num + "px";
    },
    covertUnit(upx) {
      return uni.upx2px(upx);
    },
    toback() {
      uni.navigateBack({
        delta: 1,
      });
    },
    tohome() {
      uni.reLaunch({
        url: '/pages/dashboard/index'
      })
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./styles/icon.css";

.navbar {
  position: relative;
}
.navbar.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  box-sizing: border-box;
}

.navbar_left {
  height: 100%;
  & > view {
    height: 100%;
  }

  .iconfont-nav {
    background-color: rgba(255, 255, 255, 0.6);
    display: inline-flex;
    vertical-align: top;
    &:hover {
      background-color: rgba(0, 0, 0, 0.35) !important;
    }
  }

  .nav-appends {
    display: inline-block;
    vertical-align: top;
  }

  .two-btn {
    text-align: center;
    border: 2upx solid $border-color;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    .iconfont-nav {
      height: 100%;
      position: relative;
      z-index: 1;
    }
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 8upx;
      bottom: 8px;
      width: 2upx;
      background-color: $border-color;
    }
  }

  .btn-solo {
    border-radius: 50%;
    border: 1upx solid;
    border-color: rgba(214, 214, 214, 1);

    & + .btn-solo {
      margin-left: 20upx;
    }
  }
}
.navbar_title {
  text-align: center;
  overflow: hidden;
  font-weight: 500;
  font-size: 36upx;
}
</style>
