<template>
	<view class="content">
		<text>{{title}}</text>
    <text>使用屏幕的长度大小，然后减去固定的布局长度，计算scroll view的fix height</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "赚零钱"
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
