<script lang="ts">
export default {
  name: 'JzImage'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
  src?: string;
  props?: AnyObject;
  seprate?: string;
  showCount?: number;
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  seprate: ',',
  showCount: 1,
  width: 60,
  height: 60
})

/**
 * 全部需要显示的图片地址列表
 */
const srcList = computed(() => {
  return props.src ? props.src.split(props.seprate) : []
})

/**
 * 需要直接显示的图片列表
 */
const showSrcList = computed(() => {
  return srcList.value.slice(0, props.showCount)
})

/**
 * 隐藏未显示的图片数量
 */
const hiddenCount = computed(() => {
  return srcList.value.length - props.showCount
})

</script>

<template>
  <div class="jz-images" @click.stop>
    <div
      class="image-item"
      v-for="(img, index) in showSrcList"
      :key="index"
    >
      <el-image
        :src="img"
        :initial-index="index"
        :style="{
          width: width + 'px',
          height: height + 'px',
        }"
        fit="cover"
        :preview-src-list="srcList"
        preview-teleported
      />
    </div>

  </div>
</template>

<style lang="scss" scoped>
.jz-images {
  font-size: 0;
}
.image-item {
  position: relative;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  line-height: 1;
}

</style>