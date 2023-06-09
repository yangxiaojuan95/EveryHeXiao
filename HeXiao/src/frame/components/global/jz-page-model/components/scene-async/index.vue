<script lang="ts">import { computed, ref } from 'vue';

  export default {
    name: 'SceneAsync'
  }
</script>

<script setup lang="ts">

const props = defineProps<PageModel.Scene>()

const activeName = ref('')

const tabs = computed(() => {
  return props.scenes.filter(scene => scene.visible)
})

</script>

<template>
  <div class="scenes">
    <el-tabs :active-name="activeName">
      <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.title" :name="index.toString()" />
    </el-tabs>
  </div>
</template>
