<template>
  <view class="list-container center" :style="{ color: color }">
    <!-- 错误提示-->
    <view
      class="error-wrap"
      :style="{ paddingTop: eT, paddingBottom: eB }"
      v-show="status.isError || status.isTimeout"
    >
      <image
        class="error-image"
        mode="widthFix"
        v-show="errorImg"
        :src="errorImg"
      />
      <view class="error-tip" @click="handleRetry">点击重试</view>
    </view>

    <!-- 加载菊花图 -->
    <view class="loading-wrap" v-show="status.isLoading">
      <image src="/static/imgs/loading.gif" />
    </view>

    <!-- 全部或者没有数据 -->
    <view
      class="tip-wrap"
      v-show="!status.isLoading && !status.isError && !status.isTimeout"
    >
      <view class="all-wrap" v-show="!status.isNone && status.isAll">
        <text class="text">没有更多了</text>
      </view>
      <view class="none-wrap center" v-show="status.isNone">
        <image
          v-show="noDataImg"
          class="nodata-image"
          mode="widthFix"
          :src="noDataImg"
          :style="{
            paddingTop: nT,
            paddingBottom: nB,
            width: upxTopx(imageWidth),
            height: noDataImageHeight,
          }"
        />
        <view
          class="nodata-text"
          v-show="text"
          :style="{ fontSize: upxTopx(fontSize) }"
          >{{ text }}</view
        >
        <view v-show="!noDataImg && !text">暂无数据</view>
        <slot name="empty"></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "ListStatus",
  data() {
    return {};
  },
  props: {
    status: {
      type: Object,
      default: () => ({}),
    },
    errorImg: {
      type: String,
      default: "",
    },
    errorTop: {
      type: Number,
      default: 30,
    },
    errorBottom: {
      type: Number,
      default: 30,
    },
    noDataImg: {
      type: String,
      default: "",
    },
    noDataTop: {
      type: Number,
      default: 30,
    },
    noDataBottom: {
      type: Number,
      default: 30,
    },
    text: {
      type: String,
      default: "",
    },
    imageWidth: {
      type: Number,
      default: 600,
    },
    imageHeight: {
      type: Number,
      default: null,
    },
    fontSize: {
      type: Number,
      default: 28,
    },
    color: {
      type: String,
      default: "#979DA6",
    },
  },
  computed: {
    noDataImageHeight() {
      return this.imageHeight
        ? this.upxTopx(this.imageHeight + this.noDataTop + this.noDataBottom)
        : "auto";
    },
    eT() {
      return `${uni.upx2px(this.errorTop)}px`;
    },
    eB() {
      return `${uni.upx2px(this.errorBottom)}px`;
    },
    nT() {
      return `${uni.upx2px(this.noDataTop)}px`;
    },
    nB() {
      return `${uni.upx2px(this.noDataBottom)}px`;
    },
  },
  methods: {
    upxTopx(val) {
      return uni.upx2px(val) + "px";
    },
    handleRetry() {
      this.$emit("retry");
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  font-size: 28upx;
  color: #999;
}

.loading-wrap {
  text-align: center;
  line-height: 80upx;
  image {
    width: 48upx;
    height: 48upx;
  }
}
.error-image,
.nodata-image {
  width: 600upx;
}
.none-wrap {
  padding: 30upx 0;
}
.all-wrap {
  line-height: 80upx;
  .text {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      width: 80upx;
      height: 1px;
      background-color: #ccc;
      top: 50%;
      right: 110%;
    }
    &:after {
      content: "";
      position: absolute;
      width: 80upx;
      height: 1px;
      background-color: #ccc;
      top: 50%;
      left: 110%;
    }
  }
}
</style>
