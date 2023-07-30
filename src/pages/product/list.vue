<template>
	<view class="content">
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合排序
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				销量优先
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				<text>价格</text>
				<view class="p-box">
					<text :class="{active: priceOrder === 1 && filterIndex === 2}" class="yticon icon-shang"></text>
					<text :class="{active: priceOrder === 2 && filterIndex === 2}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<text class="cate-item yticon icon-fenlei1" @click="toggleCateMask('show')"></text>
		</view>
		<view class="goods-list">
			<view
				v-for="(item, index) in goodsList" :key="index"
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
		<px-load-more :status="loadingType"></px-load-more>

		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''"
					@click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view enable-flex="true" scroll-y="true" class="cate-list">
					<view v-for="item in cateList" :key="item.id">
						<view class="cate-item b-b two">{{ item.name }}</view>
						<view
							v-for="tItem in item.children" :key="tItem.id"
							class="cate-item b-b"
							:class="{active: tItem.id==cateId}"
							@click="changeCate(tItem)">
							{{ tItem.name }}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

	</view>
</template>

<script lang="ts">

import pxLoadMore from '@/components/px-load-more/px-load-more.vue';
import {defineComponent, reactive} from "vue";
import {getCategoryTree} from "@/common/api/productCategory";
import type {ProductCategory} from "@/common/model/productCategory";
import type {Product} from "@/common/model/product";
import {getProductList} from "@/common/api/product";
import {DefaultPageSize, ossURL, staticURL} from "@/common/api";
import type {MediaResource} from "@/common/model/mediaResource";

export default defineComponent({

	setup() {
		const pagination = reactive({
			'total': 0,
			'currentPage': 0,
			'pageSize': DefaultPageSize,
		})

		return {
			pagination
		}
	},

	components: {
		pxLoadMore
	},
	data() {
		return {
			loading: false,

			cateMaskState: 0, //分类面板展开状态
			headerPosition: "fixed",
			headerTop: "0px",
			loadingType: 'more', //加载更多状态
			filterIndex: 0,
			cateId: 0, //已选三级分类id
			priceOrder: 0, //1 价格从低到高 2价格从高到低
			cateList: [] as ProductCategory[],
			goodsList: [] as Product[]
		};
	},

	onLoad(options: any) {
		// console.log(options)
		this.cateId = options.tId;
		this.loadCateList(options.fId, options.sId);
		this.loadData('add', false);
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = "fixed";
		} else {
			this.headerPosition = "absolute";
		}
	},
	//下拉刷新
	onPullDownRefresh() {
		this.loadData('refresh', false);
	},
	//加载更多
	onReachBottom() {
		this.loadData('add', false);
	},
	methods: {

		// Function to get OSS URL
		getOssUrl(resource: MediaResource) {
			if (resource){
				if (resource.isLocalStored){
					return staticURL(resource.url)
				}
				return ossURL(resource.url)
			}
		},

		//加载分类
		async loadCateList(fId: number, sId: number) {

			this.loading = true;
			try {
				const res = await getCategoryTree({categoryPId: fId});
				this.cateList = res.tree;
				// console.log(this.cateList)

			} finally {
				this.loading = false;
			}

		},


		//加载商品 ，带下拉刷新和上滑加载
		async loadData(type = 'add', loading: boolean) {
			// console.log(type, loading)
			if (type === 'add') {
				//没有更多直接返回
				if (this.loadingType === 'nomore') {
					return;
				}
				// 当前处于添加数据状态中
				this.loadingType = 'loading';

			} else if (type === 'refresh') {
				// 如果需要重新刷列表
				this.pagination.currentPage = 0
				this.goodsList = []
				this.loadingType = 'more'
				// console.log('refresh', this.goodsList)

			} else {
				// 加载更多数据
				this.loadingType = 'more'
			}

			const res = await getProductList({
				productCategoryId: this.cateId,
				pageIndex: this.pagination.currentPage,
				pageSize: this.pagination.pageSize
			})

			// 需要设置一下当前页面的索引值
			if (res.list.length > 0) {
				this.goodsList = this.goodsList.concat(res.list);
				// console.log(list, this.goodsList)
			}
			this.pagination.currentPage = res.pageIndex + 1


			//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
			this.loadingType = this.goodsList.length < res.total ? 'more' : 'nomore';
			if (type === 'refresh') {
				if (loading) {
					uni.hideLoading()
				} else {
					uni.stopPullDownRefresh();
				}
			}
		},
		//筛选点击
		tabClick(index: any) {
			if (this.filterIndex === index && index !== 2) {
				return;
			}
			this.filterIndex = index;
			if (index === 2) {
				this.priceOrder = this.priceOrder === 1 ? 2 : 1;
			} else {
				this.priceOrder = 0;
			}
			uni.pageScrollTo({
				duration: 300,
				scrollTop: 0
			})
			this.loadData('refresh', true);
			uni.showLoading({
				title: '正在加载'
			})
		},
		//显示分类面板
		toggleCateMask(type: any) {
			let timer = type === 'show' ? 10 : 300;
			let state = type === 'show' ? 1 : 0;
			this.cateMaskState = 2;
			setTimeout(() => {
				this.cateMaskState = state;
			}, timer)
		},
		//分类点击
		changeCate(item: ProductCategory) {
			this.cateId = item.id!;
			this.toggleCateMask('show');
			uni.pageScrollTo({
				duration: 300,
				scrollTop: 0
			})
			this.loadData('refresh', true);
			uni.showLoading({
				title: '正在加载'
			})
		},
		//详情
		navToDetailPage(item: Product) {
			//测试数据没有写id，用title代替
			let id = item.id;
			uni.navigateTo({
				url: `/pages/product/product?id=${id}`
			})
		},
		stopPrevent() {
		}
	},
});

</script>

<style lang="scss">
@import './list.scss';
</style>
