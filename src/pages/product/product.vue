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
				<text v-if="product.activePriceBookEntry?.unitPrice<product.activePriceBookEntry?.listPrice" class="m-price">¥{{ product.activePriceBookEntry?.listPrice }}</text>
				<text v-if="product.activePriceBookEntry?.unitPrice<product.activePriceBookEntry?.listPrice" class="coupon-tip">{{ product.activePriceBookEntry?.discount }}折</text>
			</view>
			<view class="bot-row">
				<text>销量: {{ productStatistics.soldAmount }}</text>
				<text>库存: {{ productStatistics.inventoryQuantity }}</text>
				<text>浏览量: {{ productStatistics.viewCount }}</text>
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
					<view v-if="currentSKU" class="selected-row">
						<text class="selected-text" v-for="(sItem, sIndex) in optionSelected" :key="sIndex">
							{{ sItem.name }}
						</text>
					</view>
					<view v-else>选择规格</view>
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
						:src="getOssUrl(product.coverImages[0])"></image>
					<view class="right">
						<text class="price">¥{{ currentSKU?.unitPrice }}</text>
						<text class="stock">库存：{{ currentSKU?.inventory }}件</text>
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


<script lang="ts" setup>
import {ref, computed} from "vue";
import {getProduct} from "@/common/api/product";
import type {Product, ProductStatistics, SKU, SpecificOption} from "@/common/model/product";
import {AreArraysEqual} from "@/utils/is";
import type {AddToCartRequest} from "@/common/model/cart";
import {AddToCart} from "@/common/api/cart";
import {Alert, ShowToast} from "@/utils";
import {CreateMethodByProducts} from "@/common/api/order";
import {ossURL, staticURL} from "@/common/api";
import type {MediaResource} from "@/common/model/mediaResource";
import {onLoad} from "@dcloudio/uni-app";
import {getProductStatistics} from "@/common/api/productStatistics";

// 创建一个ref引用
const refShare = ref<any>();

// 数据
const specClass = ref("none");
const optionSelected = ref<SpecificOption[]>([]);
const currentSKU = ref<SKU | null>(null);
const product = ref({} as Product);
const productStatistics = ref({} as ProductStatistics);
const favorite = ref(true);
const shareList = ref<any[]>([]);

onLoad(async (options: any) => {
// 获取商品信息
	const result = await getProduct({id: options.id});
	product.value = result;

	// 默认选中第一条规格
	// product.value.productSpecifics.forEach((item) => {
	// 	const option = item.specificOptions[0];
	// 	option.selected = true;
	// 	optionSelected.value.push(option);
	// });

	// const sku = getSKUBy(product.value.skus, optionSelected.value);
	// if (sku) {
	// 	currentSKU.value = sku;
	// }

	productStatistics.value = await getProductStatistics({
		productId: product.value.id!
	})


	shareList.value = [
		{
			type: 1,
			icon: "/static/images/temp/share_wechat.png",
			text: "微信好友",
		},
		{
			type: 2,
			icon: "/static/images/temp/share_moment.png",
			text: "朋友圈",
		},
		{
			type: 3,
			icon: "/static/images/temp/share_qq.png",
			text: "QQ好友",
		},
		{
			type: 4,
			icon: "/static/images/temp/share_qqzone.png",
			text: "QQ空间",
		},
	];
})

// 计算属性
const generateDesc = computed(() => {
	return product.value.detailImages?.map((image) => {
		return {
			name: "img",
			attrs: {
				src: getOssUrl(image),
				style: "width:100%;display:block;",
			},
		};
	});
});

// 方法
const getOssUrl = (resource: MediaResource) => {
	if (resource) {
		if (resource.isLocalStored) {
			return staticURL(resource.url);
		}
		return ossURL(resource.url);
	}
};

const toggleSpec = () => {
	if (specClass.value === "show") {
		specClass.value = "hide";
		setTimeout(() => {
			specClass.value = "none";
		}, 250);
	} else if (specClass.value === "none") {
		specClass.value = "show";
	}
};

const getSKUBy = (skus: SKU[], options: SpecificOption[]) => {
	const optionIds: number[] = options.map((option) => option.id!);
	return skus.find((sku) => AreArraysEqual(sku.optionsIds, optionIds)) || null;
};

const selectSpec = (optionIndex: number, specificIndex: number) => {
	const options = product.value.productSpecifics[specificIndex].specificOptions;
	options.forEach((option) => {
		option.selected = false;
	});

	options[optionIndex].selected = true;

	optionSelected.value = [];
	product.value.productSpecifics.forEach((specific) => {
		specific.specificOptions.forEach((item) => {
			if (item.selected) {
				optionSelected.value.push(item);
			}
		});
	});

	const sku = getSKUBy(product.value.skus, optionSelected.value);
	if (sku !== null) {
		currentSKU.value = sku;
	}
};

const share = () => {
	refShare.value.toggleMask();
};

const toFavorite = () => {
	favorite.value = !favorite.value;
};

const buy = () => {

	if (!currentSKU.value) {
		Alert("请先选择产品规格")
		return
	}

	let total = currentSKU.value?.unitPrice!;
	total = Number(total.toFixed(2));

	const list = [
		{
			productName: product.value.name,
			imageUrl: product.value.coverImages[0].url,
			quantity: 1,
			skuId: currentSKU.value?.id,
			unitPrice: currentSKU.value?.unitPrice,
			listPrice: currentSKU.value?.listPrice,
			discount: currentSKU.value?.discount,
		},
	];

	uni.navigateTo({
		url: `/pages/order/create-order?data=${JSON.stringify({
			goodsData: list,
			total: total,
			makeOrderBy: CreateMethodByProducts,
		})}`,
	});
};

const stopPrevent = () => {
};

const addToCart = async () => {

	if (!currentSKU.value) {
		Alert("请先选择产品规格")
		return
	}

	const discount = product.value.activePriceBookEntry.unitPrice / (product.value.activePriceBookEntry.listPrice ?? product.value.activePriceBookEntry.unitPrice)
	const requestItem: AddToCartRequest = {
		productId: product.value.id!,
		productName: product.value.name,
		listPrice: product.value.activePriceBookEntry.listPrice,
		unitPrice: product.value.activePriceBookEntry.unitPrice,
		discount: discount,
		quantity: 1,
		imageUrl: product.value.coverImages[0].url,
	};
	if (currentSKU) {
		requestItem.skuId = currentSKU.value?.id;
		requestItem.specifications = currentSKU.value?.skuNo;
		requestItem.listPrice = currentSKU.value?.listPrice;
		requestItem.unitPrice = currentSKU.value?.unitPrice ?? 0;
		requestItem.discount = currentSKU.value?.discount;
	}
	const res = await AddToCart(requestItem);
	if (res.id) {
		ShowToast("添加购物车成功", "success");
	} else {
		ShowToast("添加购物车失败", "error");
	}
};

</script>

<style lang='scss'>
@import './product.scss';
</style>
