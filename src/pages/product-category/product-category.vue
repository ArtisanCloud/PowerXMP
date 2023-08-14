<template>
	<view class="content">
		<scroll-view scroll-y="true" class="left-aside">
			<view v-for="item in categoryTree" :key="item.id"
						class="f-item b-b"
						:class="{active: item.id === currentId}"
						@click="tabTap(item)">
				{{ item.name }}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation="true" scroll-y="true"
								 class="right-aside"
								 @scroll="asideScroll"
								 :scroll-top="tabScrollTop">
			<view v-for="item in sList" :key="item.id" class="s-list" :id="'main-'+item.id">
				<text class="s-item" @click="tabSTap(item)">{{ item.name }}</text>

				<view class="goods-list">
					<view
						v-for="(item, index) in goodsList" :key="index"
						class="goods-item"
						@click="navToDetailPage(item)"
					>
						<view class="image-wrapper-1">
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
		</scroll-view>
	</view>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {getCategoryTree} from "@/common/api/productCategory";
import type {ProductCategory} from "@/common/model/productCategory";
import {mpStaticURL, ossURL, staticURL} from "@/common/api";
import type {MediaResource} from "@/common/model/mediaResource";
import type {Product} from "@/common/model/product";
import {getProductList} from "@/common/api/product";


export default defineComponent({

	data() {
		return {
			loading: false,

			sizeCalcState: false,
			tabScrollTop: 0,
			currentId: 1,

			categoryTree: [] as ProductCategory[],
			fList: [] as ProductCategory[],
			sList: [] as ProductCategory[],
			tList: [] as ProductCategory[],
			goodsList: [] as Product[],

		};
	},

	components: {},
	props: {},

	onLoad() {
		// 数据加载
		this.loadData();

		// // 初始化配置
		// this.initConfig();
	},

	// 下拉刷新
	onPullDownRefresh() {
		this.loadData();
	},

	methods: {

		getMpStaticUrl(uri: string) {
			const temp = uri + ".jpg"
			return mpStaticURL(temp)
		},

		getOssUrl(resource: MediaResource) {
			if (resource) {
				if (resource.isLocalStored) {
					return staticURL(resource.url)
				}
				return ossURL(resource.url)
			}
		},

		async fetchCategoryTree() {
			this.loading = true;
			try {
				const res = await getCategoryTree({categoryPId: 0});
				this.categoryTree = res.tree;
				this.categoryTree.forEach(item => {
					if (item.pId == 0) {
						this.fList.push(item);  //pid为父级id, 没有pid或者pid=0是一级分类
					}
				})
				this.currentId = this.fList[0].id!
				this.sList = this.fList[0].children
				this.tList = this.sList[0].children

				// console.log(this.categoryTree)

			} finally {
				this.loading = false;
			}
		},

		async fetchProductList(category: ProductCategory) {
			this.goodsList = []
			// console.log(this.currentId, category.id)
			const result = await getProductList({
				pageIndex: 0,
				pageSize: 10,
				productCategoryId: category.id!,
			});
			this.goodsList = result.list
		},

		// 获取数据
		async loadData() {
			await this.fetchCategoryTree()
			await this.fetchProductList(this.sList[0])
		},

		//一级分类点击
		tabTap(item: ProductCategory) {
			// if (!this.sizeCalcState) {
			// 	this.calcSize();
			// }

			this.currentId = item.id ? item.id : 0;
			this.sList = item.children
			this.tList = this.sList[0].children
			this.tabScrollTop = 0

			// let index = this.sList.findIndex(sItem => sItem.pId === item.id);
			// this.tabScrollTop = this.sList[index].top!;
			this.fetchProductList(this.sList[0])
		},

		tabSTap(item: ProductCategory) {
			// this.tList = item.children
			this.fetchProductList(item)
		},

		navToDetailPage(item: Product) {
			//测试数据没有写id，用title代替
			let id = item.id;
			uni.navigateTo({
				url: `/pages/product/product?id=${id}`
			})
		},

		//右侧栏滚动
		asideScroll(e: any) {
			if (!this.sizeCalcState) {
				this.calcSize();
			}
			let scrollTop = e.detail.scrollTop;
			let tabs = this.sList.filter(item => item.top! <= scrollTop).reverse();
			if (tabs.length > 0) {
				this.currentId = tabs[0].pId;
			}
		},
		//计算右侧栏每个tab的高度等信息
		calcSize() {
			let h = 0;
			this.sList.forEach(item => {
				let view = uni.createSelectorQuery().select("#main-" + item.id);
				view.fields({
					size: true
				}, (data: any) => {
					item.top = h;
					h += data.height;
					item.bottom = h;
				}).exec();
			})
			this.sizeCalcState = true;
		},
		navToList(sId: number, tId: number) {
			uni.navigateTo({
				url: `/pages/product/list?fId=${this.currentId}&sId=${sId}&tId=${tId}`
			})
		}

	}
});
</script>
<style lang="scss">
@import './product-category.scss';
@import "../product/product-list.scss";
</style>