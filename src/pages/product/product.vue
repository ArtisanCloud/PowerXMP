<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(cover,index) in product.coverImages" :key="index">
					<view class="image-wrapper">
						<image
							:src="getOssUrl(cover)"
							class="image-loaded loaded"
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{ product.name }}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{ product.activePriceBookEntry?.unitPrice }}</text>
				<text class="m-price">¥{{ product.activePriceBookEntry?.listPrice }}</text>
				<text class="coupon-tip">{{ product.activePriceBookEntry?.discount }}折</text>
			</view>
			<view class="bot-row">
				<text>销量: {{ product.soldAmount }}</text>
				<text>库存: {{ product.inventory }}</text>
				<text>浏览量: {{ product.viewedCount }}</text>
			</view>
		</view>

		<!-- 分享 -->
		<view class="share-section" @click="share">
			<!--			<view class="share-icon">-->
			<!--				<text class="yticon icon-xingxing"></text>-->
			<!--				返-->
			<!--			</view>-->
			<text class="tit">可以分享给你的好友</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>

		</view>

		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">购买类型</text>
				<view class="con">
					<view class="selected-row">
						<text class="selected-text" v-for="(sItem, sIndex) in optionSelected" :key="sIndex">
							{{ sItem.name }}
						</text>
					</view>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<!--			<view class="c-row b-b">-->
			<!--				<text class="tit">优惠券</text>-->
			<!--				<text class="con t-r red">领取优惠券</text>-->
			<!--				<text class="yticon icon-you"></text>-->
			<!--			</view>-->
			<!--			<view class="c-row b-b">-->
			<!--				<text class="tit">促销活动</text>-->
			<!--				<view class="con-list">-->
			<!--					<text>新人首单送20元无门槛代金券</text>-->
			<!--					<text>订单满50减10</text>-->
			<!--					<text>订单满100减30</text>-->
			<!--					<text>单笔购买满两件免邮费</text>-->
			<!--				</view>-->
			<!--			</view>-->
			<!--			<view class="c-row b-b">-->
			<!--				<text class="tit">服务</text>-->
			<!--				<view class="bz-list con">-->
			<!--					<text>7天无理由退换货 ·</text>-->
			<!--					<text>假一赔十 ·</text>-->
			<!--				</view>-->
			<!--			</view>-->
		</view>

		<!-- 评价 -->
		<!--		<view class="eva-section">-->
		<!--			<view class="e-header">-->
		<!--				<text class="tit">评价</text>-->
		<!--				<text>(86)</text>-->
		<!--				<text class="tip">好评率 100%</text>-->
		<!--				<text class="yticon icon-you"></text>-->
		<!--			</view>-->
		<!--			<view class="eva-box">-->
		<!--				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg"-->
		<!--							 mode="aspectFill"></image>-->
		<!--				<view class="right">-->
		<!--					<text class="name">Leo yo</text>-->
		<!--					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>-->
		<!--					<view class="bot">-->
		<!--						<text class="attr">购买类型：XL 红色</text>-->
		<!--						<text class="time">2019-04-01 19:21</text>-->
		<!--					</view>-->
		<!--				</view>-->
		<!--			</view>-->
		<!--		</view>-->

		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="generateDesc"></rich-text>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index-mall/index-mall" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
				<button type="primary" @click="addToCart" class=" action-btn no-border add-cart-btn">加入购物车</button>
			</view>
		</view>


		<!--	规格-模态层弹窗-->
		<view
			class="popup spec"
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image
						:src="getSkuCoverImage"></image>
					<view class="right">
						<text class="price">¥{{ this.currentSKU?.unitPrice }}</text>
						<text class="stock">库存：{{ this.currentSKU?.inventory }}件</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in optionSelected" :key="sIndex">
								{{ sItem.name }}
							</text>
						</view>
					</view>
				</view>
				<view v-for="(specific,specificIndex) in product.productSpecifics" :key="specificIndex" class="attr-list">
					<text>{{ specific?.name }}</text>
					<view class="item-list">
						<text
							v-for="(option, childIndex) in specific.specificOptions"
							:key="childIndex" class="tit"
							:class="{selected: option?.selected}"
							@click="selectSpec(childIndex, specificIndex)"
						>
							{{ option?.name }}
						</text>
					</view>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
			</view>
		</view>

		<!-- 分享 -->
		<share
			ref="refShare"
			:contentHeight="580"
			:shareList="shareList"
		></share>

	</view>
</template>

<script lang="ts">

import {defineComponent, ref} from "vue";
import {getProduct} from "@/common/api/product";
import type {Product, SKU, SpecificOption} from "@/common/model/product";
import {AreArraysEqual} from "@/utils/is";
import type {AddToCartRequest} from "@/common/model/cart";
import {addToCart} from "@/common/api/cart";
import {ShowToast} from "@/utils";
import {CreateMethodByProducts} from "@/common/api/order";
import {ossURL, staticURL} from "@/common/api";
import type {MediaResource} from "@/common/model/mediaResource";


export default defineComponent({
	setup() {
		// 创建一个ref引用
		const refShare = ref<any>();

		return {
			refShare,
		};
	},
	data() {
		return {
			specClass: 'none',
			optionSelected: [] as SpecificOption[],
			currentSKU: null as SKU | null,
			product: {} as Product,
			favorite: true,
			shareList: [] as any[],


		};
	},
	async onLoad(options: any) {

		const result = await getProduct({id: options.id})

		this.product = result

		//规格 默认选中第一条
		this.product.productSpecifics.forEach(item => {
			const option = item.specificOptions[0]
			this.$set(option, 'selected', true);
			this.optionSelected.push(option);
		})

		const sku = this.getSKUBy(this.product.skus, this.optionSelected)
		if (sku) {
			this.currentSKU = sku
		}

		this.shareList = [{
			type: 1,
			icon: '/static/images/temp/share_wechat.png',
			text: '微信好友'
		},
			{
				type: 2,
				icon: '/static/images/temp/share_moment.png',
				text: '朋友圈'
			},
			{
				type: 3,
				icon: '/static/images/temp/share_qq.png',
				text: 'QQ好友'
			},
			{
				type: 4,
				icon: '/static/images/temp/share_qqzone.png',
				text: 'QQ空间'
			}];
	},

	computed: {
		generateDesc() {
			return this.product.detailImages?.map(image => {
				return {
					name: "img",
					attrs: {
						src: this.getOssUrl(image),
						style: "width:100%;display:block;"
					}
				};
			});
		},

		getSkuCoverImage() {
			if (this.product.coverImages && this.product.coverImages.length > 0) {
				return this.product.coverImages[0].url
			}
			return ""
		}
	},

	methods: {

		// Function to get OSS URL
		getOssUrl(resource: MediaResource) {
			if (resource) {
				if (resource.isLocalStored) {
					return staticURL(resource.url)
				}
				return ossURL(resource.url)
			}
		},

		//规格弹窗开关
		toggleSpec() {
			if (this.specClass === 'show') {
				this.specClass = 'hide';
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
			} else if (this.specClass === 'none') {
				this.specClass = 'show';
			}
		},

		getSKUBy(skus: SKU[], options: SpecificOption[]): SKU | null {
			let optionIds: number[] = []
			options.map((option: SpecificOption) => {
				optionIds.push(option.id!)
			});
			return skus.find((sku) => {
					return AreArraysEqual(sku.optionsIds, optionIds)
				}
			) || null;
		},

		//选择规格
		selectSpec(optionIndex: number, specificIndex: number) {
			let options = this.product.productSpecifics[specificIndex].specificOptions
			for (let option of options) {
				this.$set(option, 'selected', false);
			}

			this.$set(options[optionIndex], 'selected', true);

			//存储已选择
			/**
			 * 修复选择规格存储错误
			 * 将这几行代码替换即可
			 * 选择的规格存放在optionSelected中
			 */
			this.optionSelected = [];
			this.product.productSpecifics.forEach(specific => {
				specific.specificOptions.forEach(item => {
					if (item.selected) {
						this.optionSelected.push(item);
					}
				})
			})

			const sku = this.getSKUBy(this.product.skus, this.optionSelected)
			if (sku != null) {
				this.currentSKU = sku
			}

		},
		//分享
		share() {
			this.refShare.toggleMask();
		},
		//收藏
		toFavorite() {
			this.favorite = !this.favorite;
		},
		buy() {

			let total = this.currentSKU?.unitPrice!
			total = Number(total.toFixed(2));

			const list = [{
				productName: this.product.name,
				imageUrl: this.product.coverImages[0].url,
				quantity: 1,
				skuId: this.currentSKU?.id,
				unitPrice: this.currentSKU?.unitPrice,
				listPrice: this.currentSKU?.listPrice,
				discount: this.currentSKU?.discount,
			}]

			uni.navigateTo({
				url: `/pages/order/create-order?data=${JSON.stringify({
					goodsData: list,
					total: total,
					makeOrderBy: CreateMethodByProducts,
				})}`
			})
		},
		stopPrevent() {
		},
		async addToCart() {

			let requestItem: AddToCartRequest = {
				productId: this.product.id!,
				productName: this.product.name,
				listPrice: this.product.activePriceBookEntry.listPrice,
				unitPrice: this.product.activePriceBookEntry.unitPrice,
				discount: this.product.activePriceBookEntry.discount,
				quantity: 1,
				imageUrl: this.product.coverImages[0].url,
			}
			if (this.currentSKU) {
				requestItem.skuId = this.currentSKU.id
				requestItem.specifications = this.currentSKU.skuNo
				requestItem.listPrice = this.currentSKU.listPrice
				requestItem.unitPrice = this.currentSKU.unitPrice
				requestItem.discount = this.currentSKU.discount
			}
			// console.log(this.currentSKU, requestItem)
			const res = await addToCart(requestItem);
			if (res.id) {
				ShowToast("添加购物车成功", "success")
			} else {
				ShowToast("添加购物失败", "error")
			}
		}

	},

});

</script>

<style lang='scss'>
@import './product.scss';
</style>
