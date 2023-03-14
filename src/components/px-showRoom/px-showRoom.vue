<template>
	<view class="content">

		<view class="tabBarView">
			<u-subsection fontSize="24rpx" :mode="subsection" bgColor="#eee" inactiveColor="#ccc" activeColor="#808080"
				@change="sectionChange" :list="tabList" :current="currentTab">
			</u-subsection>
		</view>
		<view class="filterView">
			<u-line style="margin-right:8rpx;" length="50%" direction="col" color="#666"></u-line>
			<uni-icons type="settings" size="26" color="#666"></uni-icons>
		</view>

	</view>
</template>

<script>
	import uSubsection from "uview-plus/components/u-subsection/u-subsection.vue";
	import uLine from "uview-plus/components/u-line/u-line.vue";
	export default {
		components: {
			uSubsection,
			uLine
		},
		name: "px-showRoom",
		data() {
			return {
				tabList: ['作品', '案例', '品牌介绍'],
				currentTab: 1
			};
		},
		methods: {
			sectionChange(index) {
				this.currentTab = index;
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		align-items: center;
		// justify-content: center;
		width: 100%;
		padding-left: 32rpx;
		padding-bottom: 8rpx;
		align-items: stretch;

		@if $debug {
			border: 1rpx green solid;
		}

		.tabBarView {
			width: 80%;

			@if $debug {
				border: 1rpx red solid;
			}

		}

		.filterView {
			padding-left: 8rpx;
			margin-left: 16rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			// width: 45rpx;


			@if $debug {
				border: 1rpx red solid;
			}
		}
	}
</style>
