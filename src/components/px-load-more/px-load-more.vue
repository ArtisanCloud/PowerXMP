<template>
	<view class="px-load-more">
		<view class="px-load-more__img" v-show="status === 'loading' && showIcon">
			<view class="px-view load1">
				<view class="nth" :style="{background:color}"></view>
				<view class="nth" :style="{background:color}"></view>
				<view class="nth" :style="{background:color}"></view>
				<view class="nth" :style="{background:color}"></view>
			</view>
			<view class="px-view load2">
				<view class="nth" :style="{background:color}"></view>
				<view class="nth" :style="{background:color}"></view>
				<view class="nth" :style="{background:color}"></view>
				<view class="nth" :style="{background:color}"></view>
			</view>
			<view class="px-view load3">
				<view class="nth" :style="{background:color}"></view>
				<view class="nth" :style="{background:color}"></view>
				<view class="nth" :style="{background:color}"></view>
				<view class="nth" :style="{background:color}"></view>
			</view>
		</view>
		<text class="px-load-more__text" :style="{color:color}">{{status === 'more' ? contentText.contentDown : (status === 'loading' ? contentText.contentRefresh : contentText.contentNoMore)}}</text>
	</view>
</template>

<script>
	export default {
		name: "px-load-more",
		props: {
			status: {
				//上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
				type: String,
				default: 'more'
			},
			showIcon: {
				type: Boolean,
				default: true
			},
			color: {
				type: String,
				default: "#777777"
			},
			contentText: {
				type: Object,
				default () {
					return {
						contentDown: "上拉显示更多",
						contentRefresh: "正在加载...",
						contentNoMore: "没有更多数据了"
					};
				}
			}
		},
		data() {
			return {}
		}
	}
</script>

<style>
	@import "./index.css";
</style>