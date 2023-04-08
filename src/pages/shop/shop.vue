<template>
	<view class="content">
		<text>{{title}}</text>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "店铺"
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">

.content{
  height: calc(100vh - 150rpx);
  border: 1rpx solid red;
}

</style>
