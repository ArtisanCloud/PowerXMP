<template>
	<view class="container">

		<view class="user-section">
			<image class="bg" src="/static/images/user-bg.png"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" src="/static/images/logo-accessory-me.png"></image>
				</view>
				<view class="info-box">
					<text class="username">{{ userInfo?.nickname || '游客' }}</text>
				</view>
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/images/vip-card-bg.png" mode=""></image>
				<view class="b-btn">
					立即开通
				</view>
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					小裂匠会员
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
<script lang="ts">

import {defineComponent} from "vue";
import {GetUserInfo, IsLogin} from "@/utils/auth";

let startY = 0, moveY = 0, pageAtTop = true;
export default defineComponent({

	data() {
		return {
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
		}
	},
	onLoad() {


	},
	// #ifndef MP
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.navTo('/pages/setting/setting');
		} else if (index === 1) {
			// #ifdef APP-PLUS
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({
				index
			});
			// #endif
			uni.navigateTo({
				url: '/pages/notice/notice'
			})
		}
	},
	// #endif
	computed: {
		userInfo() {
			return GetUserInfo();
		}
	},
	methods: {

		/**
		 * 统一跳转接口,拦截未登录路由
		 * navigator标签现在默认没有转场动画，所以用view
		 */
		navTo(url:string) {
			console.log(url)
			if (!IsLogin()) {
				url = '/pages/login/login';
			}
			uni.navigateTo({
				url
			})
		},

		/**
		 *  会员卡下拉和回弹
		 *  1.关闭bounce避免ios端下拉冲突
		 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
		 *    transition设置0.1秒延迟，让css来过渡这段空窗期
		 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
		 */
		coverTouchstart(e) {
			if (pageAtTop === false) {
				return;
			}
			this.coverTransition = 'transform .1s linear';
			startY = e.touches[0].clientY;
		},
		coverTouchmove(e) {
			moveY = e.touches[0].clientY;
			let moveDistance = moveY - startY;
			if (moveDistance < 0) {
				this.moving = false;
				return;
			}
			this.moving = true;
			if (moveDistance >= 80 && moveDistance < 100) {
				moveDistance = 80;
			}

			if (moveDistance > 0 && moveDistance <= 80) {
				this.coverTransform = `translateY(${moveDistance}px)`;
			}
		},
		coverTouchend() {
			if (this.moving === false) {
				return;
			}
			this.moving = false;
			this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
			this.coverTransform = 'translateY(0px)';
		}
	}
})

</script>
<style lang='scss'>
@import "./me-mall";
</style>