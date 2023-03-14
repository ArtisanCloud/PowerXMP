<template>
	<view class="content box">
		<px-cover></px-cover>
		<px-showRoom></px-showRoom>

		<uni-search-bar class="search-input" placeholder="请搜索关键词" clearButton="auto" cancelButton="none"
			@confirm="search" />

		<view class="text-area">
			<text class="title">{{title}}</text>
			<button @click="clickGetUserInfo">GetUserInfo</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {

			return {
				title: '小裂匠'
			}
		},
		onLoad() {

		},
		methods: {
			clickGetUserInfo() {

				// console.log(this.$api)
				var result = this.$api.user.getUserInfo({}).then((res) => {
					console.log(res)
				})

				console.log(result)
			}
		}
	}
</script>

<style lang="scss">
	.search-input {
		:deep(.uni-searchbar__box-search-input)  {
			flex: 1;
			font-size: 8px;
			color: #333;
		}

		:deep(.uni-searchbar__text-placeholder) {
			font-size: 8px;
			color: #B3B3B3;
			margin-left: 5px;
		}
	}
	
</style>
