<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled/>
		</view>
		<!-- #endif -->


		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>

			<swiper class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item"
										 @click="navToDetailPage({id:1,title: '轮播广告'})">
					<image :src="getOssUrl(item.coverImage)" mode="widthFix"/>
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{ swiperCurrent + 1 }}</text>
				<text class="sign">/</text>
				<text class="num">{{ swiperLength }}</text>
			</view>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" v-for="(item,index) in this.categoryList" :key="item.id">
				<image :src="getOssUrl(item.coverImage)" @click="navToProductCategory(item.id)"></image>
				<text>{{ item.name }}</text>
			</view>
		</view>

		<view class="ad-1">
			<view @click="navToProductCategory(18)">
				<image :src="getStaticUrl('shop/ad1.jpg')" mode="widthFix" style="width: 96%;"></image>
			</view>
		</view>

		<!-- 秒杀楼层 -->
		<!--		<view class="seckill-section m-t">-->
		<!--			<view class="s-header">-->
		<!--				<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>-->
		<!--				<text class="tip">8点场</text>-->
		<!--				<text class="hour timer">07</text>-->
		<!--				<text class="minute timer">13</text>-->
		<!--				<text class="second timer">55</text>-->
		<!--				<text class="yticon icon-you"></text>-->
		<!--			</view>-->
		<!--			<scroll-view class="floor-list" scroll-x>-->
		<!--				<view class="scoll-wrapper">-->
		<!--					<view-->
		<!--						v-for="(item, index) in goodsList" :key="index"-->
		<!--						class="floor-item"-->
		<!--						@click="navToDetailPage(item)"-->
		<!--					>-->
		<!--						<image :src="item.image" mode="aspectFill"></image>-->
		<!--						<text class="title clamp">{{ item.title }}</text>-->
		<!--						<text class="price">￥{{ item.price }}</text>-->
		<!--					</view>-->
		<!--				</view>-->
		<!--			</scroll-view>-->
		<!--		</view>-->

		<!--		&lt;!&ndash; 团购楼层 &ndash;&gt;-->
		<!--		<view class="f-header m-t">-->
		<!--			<image src="/static/temp/h1.png"></image>-->
		<!--			<view class="tit-box">-->
		<!--				<text class="tit">精品团购</text>-->
		<!--				<text class="tit2">Boutique Group Buying</text>-->
		<!--			</view>-->
		<!--			<text class="yticon icon-you"></text>-->
		<!--		</view>-->
		<!--		<view class="group-section">-->
		<!--			<swiper class="g-swiper" :duration="500">-->
		<!--				<swiper-item-->
		<!--					class="g-swiper-item"-->
		<!--					v-for="(item, index) in goodsList" :key="index"-->
		<!--					v-if="index%2 === 0"-->
		<!--					@click="navToDetailPage(item)"-->
		<!--				>-->
		<!--					<view class="g-item left">-->
		<!--						<image :src="item.image" mode="aspectFill"></image>-->
		<!--						<view class="t-box">-->
		<!--							<text class="title clamp">{{ item.title }}</text>-->
		<!--							<view class="price-box">-->
		<!--								<text class="price">￥{{ item.price }}</text>-->
		<!--								<text class="m-price">￥188</text>-->
		<!--							</view>-->

		<!--							<view class="pro-box">-->
		<!--								<view class="progress-box">-->
		<!--									<progress percent="72" activeColor="#fa436a" active stroke-width="6"/>-->
		<!--								</view>-->
		<!--								<text>6人成团</text>-->
		<!--							</view>-->
		<!--						</view>-->

		<!--					</view>-->
		<!--					<view class="g-item right">-->
		<!--						<image :src="goodsList[index+1].image" mode="aspectFill"></image>-->
		<!--						<view class="t-box">-->
		<!--							<text class="title clamp">{{ goodsList[index + 1].title }}</text>-->
		<!--							<view class="price-box">-->
		<!--								<text class="price">￥{{ goodsList[index + 1].price }}</text>-->
		<!--								<text class="m-price">￥188</text>-->
		<!--							</view>-->
		<!--							<view class="pro-box">-->
		<!--								<view class="progress-box">-->
		<!--									<progress percent="72" activeColor="#fa436a" active stroke-width="6"/>-->
		<!--								</view>-->
		<!--								<text>10人成团</text>-->
		<!--							</view>-->
		<!--						</view>-->
		<!--					</view>-->
		<!--				</swiper-item>-->

		<!--			</swiper>-->
		<!--		</view>-->


		<!-- 分类推荐楼层 -->
		<!--		<view class="f-header m-t">-->
		<!--			<image :src="getStaticUrl('shop/cat_r.png')"></image>-->
		<!--			<view class="tit-box">-->
		<!--				<text class="tit">分类精选</text>-->
		<!--				<text class="tit2">Competitive Products For You</text>-->
		<!--			</view>-->
		<!--			<text class="yticon icon-you"></text>-->
		<!--		</view>-->
		<!--		<view class="hot-floor" v-for="(item, index) in this.recommendCategoryList" :key="index">-->
		<!--			<view class="floor-img-box">-->
		<!--				<image class="floor-img"-->
		<!--							 :src="getOssUrl(item.coverImage)"-->
		<!--							 mode="aspectFill"></image>-->
		<!--			</view>-->
		<!--			<scroll-view class="floor-list" scroll-x>-->
		<!--				<view class="scoll-wrapper">-->
		<!--					<view-->
		<!--						v-for="(product, index) in item.productList" :key="index"-->
		<!--						class="floor-item"-->
		<!--						@click="navToDetailPage(product)"-->
		<!--					>-->
		<!--						<image :src="getOssUrl(product.coverImages[0])" mode="aspectFill"></image>-->
		<!--						<text class="title clamp">{{ product.name }}</text>-->
		<!--						<text class="price">￥{{ product.activePriceBookEntry.unitPrice }}</text>-->
		<!--					</view>-->
		<!--					<view class="more">-->
		<!--						<text>查看全部</text>-->
		<!--						<text>More+</text>-->
		<!--					</view>-->
		<!--				</view>-->
		<!--			</scroll-view>-->
		<!--		</view>-->

		<!-- 猜你喜欢 -->
		<!--				<view class="f-header m-t">-->
		<!--					<image src="/static/temp/h1.png"></image>-->
		<!--					<view class="tit-box">-->
		<!--						<text class="tit">猜你喜欢</text>-->
		<!--						<text class="tit2">Guess You Like It</text>-->
		<!--					</view>-->
		<!--					<text class="yticon icon-you"></text>-->
		<!--				</view>-->

		<!--				<view class="guess-section">-->
		<!--					<view-->
		<!--						v-for="(item, index) in goodsList" :key="index"-->
		<!--						class="guess-item"-->
		<!--						@click="navToDetailPage(item)"-->
		<!--					>-->
		<!--						<view class="image-wrapper">-->
		<!--							<image :src="item.image" mode="aspectFill"></image>-->
		<!--						</view>-->
		<!--						<text class="title clamp">{{ item.title }}</text>-->
		<!--						<text class="price">￥{{ item.price }}</text>-->
		<!--					</view>-->
		<!--				</view>-->

		<!-- 热销产品 -->
		<view class="f-header m-t">
			<view class="tit-box">
				<text class="tit">｜ 热销商品</text>
			</view>
		</view>
		<view class="goods-list">
			<view
				v-for="(item, index) in recommendProductList" :key="index"
				class="goods-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="getOssUrl(item.coverImages[0])" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{ item.name }}</text>
				<view class="price-box">
					<text class="price">{{ item.activePriceBookEntry.unitPrice }}</text>
					<text>已售 {{ item.soldAmount }}</text>
				</view>
			</view>
		</view>
	</view>

</template>

<script lang="ts">

import {defineComponent} from "vue";
import {getMediasPageList, MediaTypeBrandStory, MediaTypePromotionalCampaigns} from "@/common/api/media";
import {MaxPageSize, ossURL, staticURL} from "@/common/api";
import type {Media} from "@/common/model/media";
import type {ProductCategory} from "@/common/model/productCategory";
import {getCategoryList} from "@/common/api/productCategory";
import {getProductList} from "@/common/api/product";
import useOptionsStore from "@/store/modules/data-dictionary";
import type {MediaResource} from "@/common/model/mediaResource";
import type {Product} from "@/common/model/product";
import productCategory from "@/pages/product-category/product-category.vue";

export default defineComponent({

	data() {
		return {
			titleNViewBackground: '',
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [] as Media[],
			eventList: [] as Media[],
			goodsList: [],
			categoryList: [] as ProductCategory[],
			recommendCategoryList: [] as ProductCategory[],
			recommendProductList: [],

		};
	},

	onLoad() {
		this.loadData();
	},
	methods: {

		async loadData() {

			// 这里需要强制加载一下options数据
			const optionsStore = useOptionsStore();
			if (!optionsStore.isSetup()) {
				await optionsStore.fetchAllOptions()
			}
			const mediaTypeBrandStory = optionsStore.GetOptionByKey(optionsStore.mediaTypes, MediaTypeBrandStory)
			if (!mediaTypeBrandStory) {
				console.error("system data mediaType err loaded")
				return
			}

			const mediaTypePromotionalCampaign = optionsStore.GetOptionByKey(optionsStore.mediaTypes, MediaTypePromotionalCampaigns)
			if (!mediaTypePromotionalCampaign) {
				console.error("system data mediaType err loaded")
				return
			}

			// ---------- 横幅 ----------
			let carouselList = await getMediasPageList({
				pageIndex: 0,
				pageSize: MaxPageSize,
				mediaTypes: [mediaTypeBrandStory?.id!]
			});

			this.titleNViewBackground = "rgb(161,197,61)"
			this.swiperLength = carouselList.total;
			this.carouselList = carouselList.list;
			// console.log(carouselList,this.carouselList)
			// let goodsList = await this.$api.json('goodsList');
			// this.goodsList = goodsList || [];

			// ---------- 促销活动 ----------
			let eventList = await getMediasPageList({
				pageIndex: 0,
				pageSize: 1,
				mediaTypes: [mediaTypePromotionalCampaign?.id!]
			});
			this.eventList = eventList.list


			// ---------- 分类产品 ----------
			const resRoot = await getCategoryList({
				categoryPId: 0,
				limit: 6,
			})
			let HotCategory = resRoot.list.shift()
			this.categoryList = resRoot.list
			// console.log(this.categoryList)

			const HotSCategory = await getCategoryList({
				categoryPId: HotCategory.id,
				limit: 1,
			})
			this.recommendCategoryList = HotSCategory.list
			// console.log(this.recommendCategoryList)
			const recommendCategory = this.recommendCategoryList[0]
			// console.log(recommendCategory)
			const result = await getProductList({
				pageIndex: 0,
				pageSize: 10,
				productCategoryId: recommendCategory.id!,
			});
			this.recommendProductList = result.list
			// console.log(this.recommendProductList)
			// this.recommendCategoryList.forEach(async (item: ProductCategory) => {
			// 	const result = await getProductList({
			// 		pageIndex: 0,
			// 		pageSize: 10,
			// 		productCategoryId: item.id!,
			// 	});
			// 	item.productList = result.list
			//
			// })
			// console.log(this.recommendCategoryList)
		},

		getStaticUrl(uri: string) {
			return staticURL("/resource/static/" + uri)
		},

		getOssUrl(resource: MediaResource) {
			if (resource) {
				if (resource.isLocalStored) {
					return staticURL(resource.url)
				}
				return ossURL(resource.url)
			}
		},


		//轮播图切换修改背景色
		swiperChange(e: any) {
			const index = e.detail.current;
			this.swiperCurrent = index;
			this.titleNViewBackground = this.carouselList[index].background;
		},
		//详情页
		navToDetailPage(item: Product) {
			//测试数据没有写id，用title代替
			let id = item.id;
			uni.navigateTo({
				url: `/pages/product/product?id=${id}`
			})
		},
		navToProductCategory(categoryId: number) {

			try {
				uni.setStorageSync("sourceCategoryId", categoryId)
			} catch (e) {
				console.error(e)
			}

			//测试数据没有写id，用title代替
			uni.switchTab({
				url: `/pages/product-category/product-category`
			})
		}

	},
	// #ifndef MP
	// 标题栏input搜索框点击
	onNavigationBarSearchInputClicked: async function (e) {
		this.$api.msg('点击了搜索框');
	},
	//点击导航栏 buttons 时触发
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.$api.msg('点击了扫描');
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
	}
	// #endif

})

</script>

<style lang="scss">
@import "./index-mall";
@import "../product/product-list.scss";

</style>
