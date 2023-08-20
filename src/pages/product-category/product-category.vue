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

import {getCategoryTree} from "@/common/api/productCategory";
import type {ProductCategory} from "@/common/model/productCategory";
import {mpStaticURL, ossURL, staticURL} from "@/common/api";
import type {MediaResource} from "@/common/model/mediaResource";
import type {Product} from "@/common/model/product";
import {getProductList} from "@/common/api/product";
import {ref} from "vue";
import {onShow} from "@dcloudio/uni-app";

const loading = ref(false);
const sizeCalcState = ref(false);
const tabScrollTop = ref(0);
const currentId = ref(1);
const categoryTree = ref([] as ProductCategory[]);
const fList = ref([] as ProductCategory[]);
const sList = ref([] as ProductCategory[]);
const tList = ref([] as ProductCategory[]);
const goodsList = ref([] as Product[]);


const fetchCategoryTree = async () => {
	loading.value = true;
	try {
		const res = await getCategoryTree({categoryPId: 0});
		categoryTree.value = res.tree;
		categoryTree.value.forEach(item => {

			if (item.pId == 0) {
				fList.value.push(item);  //pid为父级id, 没有pid或者pid=0是一级分类

				// 设置当前选中的分类以及子分类
				if (currentId.value == item.id) {
					sList.value = item.children
					tList.value = sList.value[0].children
				}
			}
		})
		if (currentId.value <= 0) {
			currentId.value = fList.value[0].id!
			sList.value = fList.value[0].children
			tList.value = sList.value[0].children
		}


		// console.log(this.categoryTree)

	} finally {
		loading.value = false;
	}
}

const fetchProductList = async (categoryId: number) => {
	goodsList.value = []
	// console.log(this.currentId, category.id)
	const result = await getProductList({
		pageIndex: 0,
		pageSize: 10,
		productCategoryId: categoryId,
	});
	goodsList.value = result.list
}

// 获取数据
const loadData = async () => {
	await fetchCategoryTree()
	await fetchProductList(sList.value[0].id!)
}


// 下拉刷新
const onPullDownRefresh = () => {
	loadData();
}


const getMpStaticUrl = (uri: string) => {
	const temp = uri + ".jpg"
	return mpStaticURL(temp)
}

const getOssUrl = (resource: MediaResource) => {
	if (resource) {
		if (resource.isLocalStored) {
			return staticURL(resource.url)
		}
		return ossURL(resource.url)
	}
}


//一级分类点击
const tabTap = (item: ProductCategory) => {
	// if (!this.sizeCalcState) {
	// 	this.calcSize();
	// }

	currentId.value = item.id ? item.id : 0;
	sList.value = item.children
	tList.value = sList.value[0].children
	tabScrollTop.value = 0

	// let index = this.sList.findIndex(sItem => sItem.pId === item.id);
	// this.tabScrollTop = this.sList[index].top!;
	fetchProductList(sList.value[0].id!)
}

const tabSTap = (item: ProductCategory) => {
	// this.tList = item.children
	fetchProductList(item.id!)
}

const navToDetailPage = (item: Product) => {
	//测试数据没有写id，用title代替
	let id = item.id;
	uni.navigateTo({
		url: `/pages/product/product?id=${id}`
	})
}

//右侧栏滚动
const asideScroll = (e: any) => {
	if (!sizeCalcState.value) {
		calcSize();
	}
	let scrollTop = e.detail.scrollTop;
	let tabs = sList.value.filter(item => item.top! <= scrollTop).reverse();
	if (tabs.length > 0) {
		currentId.value = tabs[0].pId;
	}
}

//计算右侧栏每个tab的高度等信息
const calcSize = () => {
	let h = 0;
	sList.value.forEach(item => {
		let view = uni.createSelectorQuery().select("#main-" + item.id);
		view.fields({
			size: true
		}, (data: any) => {
			item.top = h;
			h += data.height;
			item.bottom = h;
		}).exec();
	})
	sizeCalcState.value = true;
}
const navToList = (sId: number, tId: number) => {
	uni.navigateTo({
		url: `/pages/product/list?fId=${currentId.value}&sId=${sId}&tId=${tId}`
	})
}

onShow(() => {

	let cId:number = -1
	try {
		// 先获取当前外部页面选中的分类
		cId = uni.getStorageSync("sourceCategoryId")
		uni.setStorageSync("sourceCategoryId", -1)
	} catch (e) {
		console.error(e)
	}
	currentId.value = cId

	// 数据加载
	loadData();
})

</script>
<style lang="scss">
@import './product-category.scss';
@import "../product/product-list.scss";
</style>