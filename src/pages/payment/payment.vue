<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{ this.orderInfo.unitPrice }}</text>
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#BDFA43FF" :checked='this.paymentTypeId == this.paymentTypeWechatId'/>
				</label>
			</view>
			<!--			<view class="type-item b-b" @click="changePayType(2)">-->
			<!--				<text class="icon yticon icon-alipay"></text>-->
			<!--				<view class="con">-->
			<!--					<text class="tit">支付宝支付</text>-->
			<!--				</view>-->
			<!--				<label class="radio">-->
			<!--					<radio value="" color="#fa436a" :checked='paymentType == 2'/>-->
			<!--				</label>-->
			<!--			</view>-->
			<!--			<view class="type-item" @click="changePayType(3)">-->
			<!--				<text class="icon yticon icon-erjiye-yucunkuan"></text>-->
			<!--				<view class="con">-->
			<!--					<text class="tit">预存款支付</text>-->
			<!--					<text>可用余额 ¥198.5</text>-->
			<!--				</view>-->
			<!--				<label class="radio">-->
			<!--					<radio value="" color="#fa436a" :checked='paymentType == 3'/>-->
			<!--				</label>-->
			<!--			</view>-->
		</view>

		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {createPaymentFromOrder, PaymentTypeWeChat} from "@/common/api/payment";
import type {Order} from "@/common/model/order";
import {Alert} from "@/utils";
import useOptionsStore from "@/store/modules/data-dictionary";
import {OrderStatusToBePaid} from "@/common/api/order";

export default defineComponent({
	data() {
		const optionsStore = useOptionsStore();
		const paymentTypeWechatId = optionsStore.GetOptionByKey(optionsStore.paymentTypes, PaymentTypeWeChat)?.id
		return {
			paymentTypeWechatId: paymentTypeWechatId,
			paymentTypeId: paymentTypeWechatId,
			orderInfo: {} as Order
		};
	},
	computed: {},
	onLoad(options: any) {
		this.orderInfo = JSON.parse(options.order);
	},

	methods: {
		//选择支付方式
		changePayType(typeId: number) {
			this.paymentTypeId = typeId;
		},



		//确认支付
		confirm: async function () {
			switch (this.paymentTypeId) {
				case this.paymentTypeWechatId: {
					const res = await createPaymentFromOrder({
						orderId: this.orderInfo.id!,
						paymentType: this.paymentTypeWechatId!,
					})
					if (res.paymentId && res.paymentId > 0) {

						const data = res.data


						// 调用微信支付
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr,
							package: res.data.package,
							signType: res.data.signType,
							paySign: res.data.paySign,
							success: function (res) {
								console.log(res)
								// 支付成功回调
								uni.redirectTo({
									url: '/pages/payment/paySuccess'
								})
							},
							fail: function (err) {
								console.error(err)
								// 支付失败回调
								Alert('支付失败，请重新尝试')
							}
						});


					} else {
						Alert('生成支付单失败')
					}
					break
				}
				default:
					Alert('请选择正确的付费方式')
			}

		},
	}
})
</script>

<style lang='scss'>
.app {
	width: 100%;
}

.price-box {
	background-color: #fff;
	height: 265upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 28upx;
	color: #909399;

	.price {
		font-size: 50upx;
		color: #303133;
		margin-top: 12upx;

		&:before {
			content: '￥';
			font-size: 40upx;
		}
	}
}

.pay-type-list {
	margin-top: 20upx;
	background-color: #fff;
	padding-left: 60upx;

	.type-item {
		height: 120upx;
		padding: 20upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 60upx;
		font-size: 30upx;
		position: relative;
	}

	.icon {
		width: 100upx;
		font-size: 52upx;
	}

	.icon-erjiye-yucunkuan {
		color: #fe8e2e;
	}

	.icon-weixinzhifu {
		color: #36cb59;
	}

	.icon-alipay {
		color: #01aaef;
	}

	.tit {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-bottom: 4upx;
	}

	.con {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: $font-sm;
		color: $font-color-light;
	}
}

.mix-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 630upx;
	height: 80upx;
	margin: 80upx auto 30upx;
	font-size: $font-lg;
	color: #fff;
	background-color: $base-color;
	border-radius: 10upx;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}

</style>
