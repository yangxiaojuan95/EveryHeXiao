<template>
	<view class="timeline">
		<view class="timeline-content">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			current: {}
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.timeline {
		@include flex;
	}
	
	.timeline-content {
		flex-grow: 1;
		width: 0;
	}
	
</style>
