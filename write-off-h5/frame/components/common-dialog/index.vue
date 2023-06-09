<template>
  <div v-if="isShowDialog" class="common-dialog">
    <div :class="['mask', { show: isShowContent }]" @click="taskMask"></div>
    <div :class="['common-dialog__body', { show: isShowContent, vcenter: center }]" :style="{ width: width, top: top }">
      <div class="common-dialog__header">
        <icon v-if="showClose" class="common-dialog__close-button" size="16" type="clear" @click="close"></icon> 
        <div v-if="title" class="title">{{ title }}</div>
      </div>
      <div class="common-dialog__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '80%'
    },
    top: {
      type: String,
      default: '15%'
    },
    center: {
      type: Boolean,
      default: false
    },
    taskMaskClose: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShowDialog: false,
      isShowContent: false
    }
  },
  watch: {
    value: {
      handler(visible) {
        visible ? this._show() : this._hide()
      },
      immediate: true
    }
  },
  methods: {
    taskMask() {
      this.taskMaskClose && this.close()
    },
    close() {
      this.$emit('input', false)
    },
    _show() {
      this.isShowDialog = true
      this.$nextTick(() => {
        this.isShowContent = true
      })
    },
    _hide() {
      this.isShowContent = false
      setTimeout(() => {
        this.isShowDialog = false
      }, 300)
    }
  }
})
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8;
  background-color: rgba(0, 0, 0, .15);
  opacity: 0;
  transition: all .3s linear;

  &.show {
    opacity: 1;
  }
}

.common-dialog__body {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 8;
  background-color: #fff;
  transform: translateX(-50%) scale(.8);
  top: 15%;
  left: 50%;
  border-radius: 10upx;
  opacity: 0;
  transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &.vcenter {
    top: 50% !important;
    transform: translateX(-50%) translateY(-50%) scale(.95);
  }

  &.show {
    transform: translateX(-50%) scale(1);
    opacity: 1;
    &.vcenter {
      transform: translateX(-50%) translateY(-50%) scale(1);
    }
  }
}

.common-dialog__header {
  position: relative;
  padding: 20upx;
  font-size: 32upx;
  font-weight: 500;
  border-bottom: 2upx solid #eee;
  text-align: center;
}

.common-dialog__close-button {
  position: absolute;
  top: 26upx;
  right: 20upx;
}

.common-dialog__content {
  padding: 20upx;
}
</style>