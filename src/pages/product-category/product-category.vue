<template>
	<view class="content">
		<!-- 左侧产品类别 -->
		<scroll-view
			ref="categoryScrollViewRef"
			scroll-y="true"
			class="left-aside"
		>
			<view
				v-for="category in categoryTree"
				:key="category.id"
				class="f-item b-b"
				:class="{ active: isCategoryActive(category) }"
				@click="tabTap(category)"
			>
				{{ category.name }}
			</view>
		</scroll-view>

		<!-- 右侧产品列表 -->
		<scroll-view
			ref="productListScrollViewRef"
			scroll-y="true"
			class="right-aside"
			@scroll="handleProductListScroll"
			:scroll-top="tabScrollTop"
		>
			<view v-for="category in sList" :key="category.id" class="category-list">
				<text class="s-item" @click="tabSTap(category)">{{ category.name }}</text>
			</view>
			<view class="goods-list">
				<view
					v-for="product in productList"
					class="goods-item"
					@click="navToDetailPage(product)"
				>
					<view class="image-wrapper-1">
						<image :src="getOssUrl(product.coverImages[0])" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{ product.name }}</text>
					<view class="price-box">
						<text class="price">{{ product.activePriceBookEntry.unitPrice }}</text>
<!--						<text>已售 {{ product.soldAmount }}</text>-->
					</view>
				</view>
			</view>

		</scroll-view>
	</view>
</template>

<script lang="ts" setup>


import {onMounted, ref, watch} from "vue";
import type {ProductCategory} from "@/common/model/productCategory";
import type {Product} from "@/common/model/product";
import {onShow} from "@dcloudio/uni-app";
import {getProductList} from "@/common/api/product";
import {getCategoryTree} from "@/common/api/productCategory";
import {MaxPageSize, ossURL, staticURL} from "@/common/api";
import {MediaResource} from "@/common/model/mediaResource";

const currentProductId = ref(0);
const countOfProducts = ref(0);
const currentCategoryId = ref(0);
const allSecondCategories = ref([] as ProductCategory[])
const productListScrollViewRef = ref();
const ScrollViewScrollHeight = ref(800);
const isTabCategory = ref(false)
const loading = ref(false);
const categoryTree = ref([] as ProductCategory[]);
const fList = ref([] as ProductCategory[]);
const sList = ref([] as ProductCategory[]);
// const tList = ref([] as ProductCategory[]);
const productList = ref([] as Product[]);
const tabScrollTop = ref(0);
const mapLocationCategoryToProducts = ref([] as any[])

const getParentCategoryIdById = (categoryId: number) => {
	for (const category of allSecondCategories.value) {
		if (category.id === categoryId) {
			// 假设产品数据中有一个字段叫做 parentCategory，存储了父级类别信息
			return category.pId;
		}
	}
	return null;
}

const isCategoryActive = (category: ProductCategory) => {
	// console.log(category.id, currentCategoryId.value)
	return category.id === currentCategoryId.value
}

const getCategoryIndexById = (categoryId: number, categoryArray: ProductCategory[]) => {
	for (let i = 0; i < categoryArray.length; i++) {
		if (categoryArray[i].id === categoryId) {
			return i; // 返回匹配的索引位置
		}
	}
	return -1; // 如果未找到匹配项，返回 -1 或其他适当的值
};

// 切换产品类别
const tabTap = (category: ProductCategory) => {
	isTabCategory.value = true
	currentCategoryId.value = category.id!;
	// console.log(currentCategoryId.value)
	if (currentCategoryId.value > 0) {
		// 当前category的产品累计数量
		const countProduct = mapLocationCategoryToProducts.value[currentCategoryId.value]
		// console.log(currentCategoryId.value, countProduct)

		// 获取首个产品的百分比
		const percentageOfProduct = countProduct / productList.value.length
		// console.log(productList.value.length, percentageOfProduct)

		// 设置位置
		// console.log(productListScrollViewRef)
		// tabScrollTop.value = percentageOfProduct * productListScrollViewRef.value.scrollHeight
		tabScrollTop.value = percentageOfProduct * ScrollViewScrollHeight.value
		// console.log(tabScrollTop.value)
	}


};

const tabSTap = (item: ProductCategory) => {
	// this.tList = item.children
	// fetchProductList(item.id!)
}

const navToDetailPage = (item: Product) => {
	//测试数据没有写id，用title代替
	let id = item.id;
	uni.navigateTo({
		url: `/pages/product/product?id=${id}`
	})
}


// 获取特定类别的产品列表
const getProductByCategoryId = (categoryId: number) => {


};

const getOssUrl = (resource: MediaResource) => {
	if (resource) {
		if (resource.isLocalStored) {
			return staticURL(resource.url)
		}
		return ossURL(resource.url)
	}
}

// 处理右侧产品列表的滚动
const handleProductListScroll = (e: any) => {

	// console.log(e)
	// 当点击了tab category，scrollview也会触发一次，所以这次需要判断一次，然后需要还原一下isTabCategory的值
	if (isTabCategory.value) {
		isTabCategory.value = false
		return
	}


	// console.log(e.detail.scrollTop)
	// console.log(e.detail)

	const currentProductPercentage: number = e.detail.scrollTop / e.detail.scrollHeight
	// console.log(e.detail.scrollTop, e.detail.scrollHeight,currentProductPercentage)
	ScrollViewScrollHeight.value = e.detail.scrollHeight

	const currentRow = Math.floor(currentProductPercentage * (countOfProducts.value / 2)) + 1
	// console.log(currentProductPercentage,countOfProducts.value/2,currentRow)
	let currentViewProductIndexInFlatArray = currentRow * 2 - 2
	if (currentViewProductIndexInFlatArray > productList.value.length) {
		currentViewProductIndexInFlatArray = productList.value.length - 1
	}
	// console.log(currentViewProductIndexInFlatArray)
	const currentViewProduct = productList.value[currentViewProductIndexInFlatArray]
	currentProductId.value = currentViewProduct.id!
	currentCategoryId.value = getParentCategoryIdById(currentViewProduct.categoryId!)!
	// console.log(currentProductId.value, currentCategoryId.value)

};


const fetchCategoryTree = async () => {
	loading.value = true;
	try {
		const res = await getCategoryTree({categoryPId: 0});
		categoryTree.value = res.tree;
		categoryTree.value.forEach(item => {

			if (item.pId == 0) {
				fList.value.push(item);  //pid为父级id, 没有pid或者pid=0是一级分类

				//
				allSecondCategories.value = allSecondCategories.value.concat(item.children)

				// 设置当前选中的分类以及子分类
				if (currentCategoryId.value == item.id) {
					sList.value = item.children
					// tList.value = sList.value[0].children
				}
			}
		})
		if (currentCategoryId.value <= 0) {
			currentCategoryId.value = fList.value[0].id!
			sList.value = fList.value[0].children
			// tList.value = sList.value[0].children
		}


		// console.log(sList.value)
		// console.log(allSecondCategories.value)

	} finally {
		loading.value = false;
	}
}


const fetchProductList = async (categoryId: number) => {
	// console.log(categoryId)
	const result = await getProductList({
		pageIndex: 0,
		pageSize: MaxPageSize,
		productCategoryId: categoryId,
	});

	return result.list.map((product) => {
		// 在这里设置每个产品的 categoryId
		product.categoryId = categoryId;
		return product;
	});

}

const fetchProducts = async (categories: ProductCategory[]) => {

	mapLocationCategoryToProducts.value = []
	let baseCategoryProductCount = 0
	for (let i = 0; i < categories.length; i += 1) {
		const products = await fetchProductList(categories[i].id!);

		// 将一级分类的产品数量进行分类
		if (!mapLocationCategoryToProducts.value[categories[i].pId]) {
			mapLocationCategoryToProducts.value[categories[i].pId] = 0
		}
		// console.log(categories[i].pId, mapLocationCategoryToProducts.value[categories[i].pId], products.length)
		// 按照起始位置计算
		if (i != 0) {
			baseCategoryProductCount += products.length
		}
		mapLocationCategoryToProducts.value[categories[i].pId] = baseCategoryProductCount


		// console.log(products)
		productList.value = productList.value.concat(products)


	}
	countOfProducts.value = productList.value.length
	// console.log(productList.value)
	// mapLocationCategoryToProducts 最终获取到产品按照分类顺序的数量段
	// console.log(mapLocationCategoryToProducts.value)
}


// 获取数据
const loadData = async () => {
	await fetchCategoryTree()
	await fetchProducts(allSecondCategories.value)
}


onShow(() => {

	let cId: number = -1
	try {
		// 先获取当前外部页面选中的分类
		cId = uni.getStorageSync("sourceCategoryId")
		uni.setStorageSync("sourceCategoryId", -1)
	} catch (e) {
		console.error(e)
	}
	currentCategoryId.value = cId

	// 数据加载
	loadData();
})

onMounted(() => {
	console.log(productListScrollViewRef.value)
})


</script>


<style lang="scss">
@import './product-category.scss';
@import "../product/product-list.scss";
</style>