<template>
	<view class="safe-bottom"></view>
</template>

<script lang="ts">
  import Vue from 'vue'
	export default Vue.extend({
		name: 'SafeBottom'
	})
</script>

<style lang="scss" scoped>
.safe-bottom {
	padding-bottom: 0;  
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
</style>
