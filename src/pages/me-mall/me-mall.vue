<template>
	<view class="container">

		<view class="user-section">
			<image class="bg" :src="getOssUrl(carouselList[1]?.coverImage)"></image>
			<!--			<image class="bg" src="http://localhost:9001/bucket.product/citrus-fruits-350X700.png"></image>-->
			<view class="user-info-box">
				<view @click="contactQRCode" class="portrait-box">
					<image class="portrait" src="/static/images/logo.png"></image>
				</view>
				<view @click="contactQRCode" class="info-box">
					<text class="username">{{ userInfo?.nickname || '小裂匠' }}</text>
				</view>
				<uni-popup ref="refPopup" :mask-click="false">
					<view>
						<image style="width:320px; height:320px" src="/static/images/contact-us-qr.jpg"></image>
						<button @click="contactClose">关闭</button>
					</view>
				</uni-popup>
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/images/vip-card-bg.png" mode=""></image>
				<!--				<view class="b-btn">-->
				<!--					立即开通-->
				<!--				</view>-->
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					ArtisanForce 会员
				</view>
				<text class="e-m">Artisan Cloud</text>
				<text class="e-b">开通会员</text>
			</view>
		</view>

		<view
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/images/arc.png"></image>

			<view class="tj-sction">
				<view class="tj-item">
					<text class="num">0.0</text>
					<text>余额</text>
				</view>
				<view class="tj-item">
					<text class="num">0</text>
					<text>优惠券</text>
				</view>
				<view class="tj-item">
					<text class="num">0</text>
					<text>积分</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover"
							:hover-stay-time="50">
					<text class="yticon icon-shouye"></text>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover"
							:hover-stay-time="50">
					<text class="yticon icon-daifukuan"></text>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover"
							:hover-stay-time="50">
					<text class="yticon icon-yishouhuo"></text>
					<text>待收货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover"
							:hover-stay-time="50">
					<text class="yticon icon-shouhoutuikuan"></text>
					<text>退款/售后</text>
				</view>
			</view>
			<view class="uni-contact-us">
				<button open-type="contact" class="uni-contact-us-btn">
					在线客服
					<div class="uni-contact-us-icon"></div>
				</button>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<view class="sec-header">
					<text class="yticon icon-lishijilu"></text>
					<text>浏览历史</text>
				</view>
				<scroll-view scroll-x="true" class="h-list">
					<image @click="navTo('/pages/product/product')"
								 src=""
								 mode="aspectFill"></image>
				</scroll-view>
				<px-list-cell icon="icon-iconfontweixin" iconColor="#e07472" title="我的钱包"
											tips="您的会员还有3天过期"></px-list-cell>
				<px-list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理"
											@eventClick="navTo('/pages/address/address')"></px-list-cell>
				<px-list-cell icon="icon-share" iconColor="#9789f7" title="分享" tips="邀请好友赢10万大礼"></px-list-cell>
				<px-list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="晒单" tips="晒单抢红包"></px-list-cell>
				<px-list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏"></px-list-cell>
				<px-list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border=""
											@eventClick="navTo('/pages/setting/setting')"></px-list-cell>
			</view>
		</view>


	</view>
</template>

<script lang='ts' setup>
import {inject, ref} from 'vue';
import {CheckLoginAuth, GetUserInfo, IsLogin} from "@/utils/auth";
import {getMediasPageList, MediaTypeBrandStory} from "@/common/api/media";
import {MaxPageSize, ossURL, staticURL} from "@/common/api";
import useOptionsStore from "@/store/modules/data-dictionary";
import type {Media} from "@/common/model/media";
import type {MediaResource} from "@/common/model/mediaResource";
import {onShow} from "@dcloudio/uni-app";
import PxListCell from '@/components//px-list-cell/px-list-cell.vue'

let coverTransform = ref('translateY(0px)');
let coverTransition = ref('0s');
let moving = ref(false);
let carouselList = ref([] as Media[]);
const startY = ref(0); // 添加 startY 的声明
const moveY = ref(0); // 添加 moveY 的声明
const pageAtTop = ref(true); // 添加 pageAtTop 的声明

const refPopup = ref()

const userInfo = GetUserInfo();

function getOssUrl(resource: MediaResource) {
	if (resource) {
		if (resource.isLocalStored) {
			return staticURL(resource.url)
		}
		return ossURL(resource.url)
	}
}

async function loadData() {
	const optionsStore = useOptionsStore();
	if (!optionsStore.isSetup()) {
		await optionsStore.fetchAllOptions();
	}
	const mediaTypeBrandStory = optionsStore.GetOptionByKey(
		optionsStore.mediaTypes,
		MediaTypeBrandStory
	);
	if (!mediaTypeBrandStory) {
		console.error("system data mediaType err loaded");
		return;
	}

	const list = await getMediasPageList({
		pageIndex: 0,
		pageSize: MaxPageSize,
		mediaTypes: [mediaTypeBrandStory?.id || 0],
	});
	carouselList.value = list.list;
	// console.log(carouselList.value)
}

const contactQRCode = () => {
	refPopup.value.open('center')
}

const contactClose = () => {
	refPopup.value.close()
	// console.log('close');
}

function navTo(url: string) {
	console.log(url);
	if (!IsLogin()) {
		url = '/pages/login/login';
	}
	uni.navigateTo({
		url,
	});
}

function coverTouchstart(e: any) {
	if (pageAtTop.value === false) {
		return;
	}
	coverTransition.value = 'transform .1s linear';
	startY.value = e.touches[0].clientY;
}

function coverTouchmove(e: any) {
	moveY.value = e.touches[0].clientY;
	let moveDistance = moveY.value - startY.value;
	if (moveDistance < 0) {
		moving.value = false;
		return;
	}
	moving.value = true;
	if (moveDistance >= 80 && moveDistance < 100) {
		moveDistance = 80;
	}

	if (moveDistance > 0 && moveDistance <= 80) {
		coverTransform.value = `translateY(${moveDistance}px)`;
	}
}

function coverTouchend() {
	if (moving.value === false) {
		return;
	}
	moving.value = false;
	coverTransition.value = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
	coverTransform.value = 'translateY(0px)';
}

// 初始化加载数据
loadData();

const $api = inject('$api');

onShow(() => {
	// 登录授权
	const isLogin = CheckLoginAuth($api)
	if (!isLogin) {
		return
	}
});

</script>

<style lang='scss'>
@import "./me-mall";
</style>
