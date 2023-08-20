<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('个人资料')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('收货地址')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">收货地址</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo('实名认证')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">实名认证</text>
			<text class="cell-more yticon icon-you"></text>
		</view>

		<view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#0A7C11FF" @change="switchChange"/>
		</view>
		<view class="list-cell m-t b-b" @click="navTo('清除缓存')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('关于Dcloud')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">关于ArtisanCloud</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell">
			<text class="cell-tit">检查更新</text>
			<text class="cell-tip">当前版本 1.0.0</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script lang="ts" setup>


const logout = () => {
	// Logout()
}

const navTo = (url: string) => {
	// this.$api.msg(`跳转到${url}`);
}
//退出登录
const toLogout = () => {
	uni.showModal({
		content: '确定要退出登录么',
		success: (e) => {
			if (e.confirm) {
				logout();
				setTimeout(() => {
					uni.navigateBack();
				}, 200)
			}
		}
	});
}
//switch
const switchChange = (e: any) => {
	let statusTip = e.detail.value ? '打开' : '关闭';
	// this.$api.msg(`${statusTip}消息推送`);
}


</script>

<style lang='scss'>
@import "./setting";
</style>
