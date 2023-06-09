<script lang="ts">
export default {
  name: 'TreeIcon'
}
</script>

<script setup lang="ts">
  
</script>

<template>
  <div class="tree-icon">
    <jz-icon class="closed" icon="fa-regular fa-square-plus" :size="14"></jz-icon>
    <jz-icon class="opened" icon="fa-regular fa-square-minus" :size="14"></jz-icon>
  </div>
</template>

<style lang="scss">
.side-tree {

  .el-tree-node__expand-icon {
    
    .closed {
      display: block;
    }
    .opened {
      display: none;
    }

    &.expanded {
      transform: none;
      .closed {
        display: none;
      }
      .opened {
        display: block;
      }
    }

    &.is-leaf {
      .closed {
        display: none;
      }
      .opened {
        display: none;
      }
    }
  }

  .tree-icon {
    color: #666;
  }
}
</style>
