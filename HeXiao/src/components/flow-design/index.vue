<script lang="ts">
export default {
  name: 'FlowDesign'
}
</script>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';

  interface Props {
    title: string;
    data: any[];
    initialData?: AnyObject;
    height?: string;
    width?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    height: '100%',
    width: '300px',
    initialData: () => ({})
  })

  const emit = defineEmits<{
    (e: 'change', data: any[]): void;
    (e: 'node-click', item: any, index: number): void;
  }>()

  const flowDatas = ref<any[]>([])

  watch(
    () => props.data,
    () => {
      flowDatas.value = props.data
    },
    {
      deep: true,
      immediate: true
    }
  )

  const emitChange = () => {
    emit('change', flowDatas.value)
  }

  const delItem = (index: number) => {
    flowDatas.value.splice(index, 1)
    emitChange()
  }

  const insertItem = (index: number) => {
    flowDatas.value.splice(index + 1, 0, { ...props.initialData || {} })
  }

  const onNodeClick = (index: number) => {
    const node = flowDatas.value[index]
    emit('node-click', node, index)
  }

</script>

<template>
  <el-scrollbar class="flow-design" :style="{
    height: height
  }">
    <div class="flow-items">
      <div class="flow-start">
        <span>流程开始</span>
      </div>
      <div class="plus-item">
        <div class="long-arrow"></div>
        <i class="fa-solid fa-circle-plus" title="添加" @click="insertItem(-1)"></i>
      </div>
    </div>
    <div class="flow-items" v-for="(item, index) in flowDatas" :key="index" :style="{
      width: width
    }">
      <div class="flow-item" :title="`${title}#${index + 1}`" @click="onNodeClick(index)">
        <div class="flow-item-header">
          <span class="title">
            {{ title }}#<slot :row="item" :$index="index" name="title">
              <span>{{ index + 1 }}</span>
            </slot>
          </span>
          <i class="fa-regular fa-circle-xmark btn-del" title="删除" @click="delItem(index)"></i>
        </div>
        <div class="flow-item-body">
          <slot :row="item" :$index="index" />
        </div>
      </div>
      <div class="plus-item">
        <div class="long-arrow"></div>
        <i class="fa-solid fa-circle-plus" title="添加" @click="insertItem(index)"></i>
      </div>
    </div>
    <div class="flow-end">流程结束</div>
  </el-scrollbar>
</template>

<style lang="scss" scoped>

.flow-items {
  text-align: center;
  vertical-align: top;
  margin: 0 auto;
}

.flow-item {
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all .3s;
  &:hover {
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  }
}

.flow-item-header {
  position: relative;
  padding: 15px;
  background-color: rgb(143, 189, 113);
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.title {
  flex-grow: 1;
  width: 0;
}

.btn-del {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}

.plus-item {
  position: relative;
  font-size: 0;

  .long-arrow {
    position: relative;
    width: 3px;
    height: 40px;
    background-color: #cdcdcd;
    margin: 0 auto 10px;
    &::after {
      content: '';
      position: absolute;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 10px solid #cdcdcd;
      border-bottom: 10px solid transparent;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(100%);
    }
  }

  .fa-circle-plus {
    font-size: 14px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    color: #cdcdcd;
    background-color: #fff;
    cursor: pointer;
  }

}

.flow-item-body {
  padding: 15px;
}

.flow-end {
  text-align: center;
  color: #333;
}

</style>