<template>
	<view class="content">
		<view class="navbar">
			<view
				v-for="(item, index) in navList" :key="index"
				class="nav-item"
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{ item.text }}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view
					class="list-scroll-content"
					scroll-y="true"
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>

					<!-- 订单列表 -->
					<view
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item"
					>
						<view class="i-top b-b">
							<text class="time">{{ item.createdAt }}</text>
							<text class="state" :style="{color: item.stateTipColor}">{{ item.stateTip }}</text>
							<text
								v-if="isOrderFailed(item)"
								class="del-btn yticon icon-iconfontshanchu1"
								@click="deleteOrder(index)"
							></text>
						</view>

						<scroll-view v-if="item.orderItems?.length > 1" class="goods-box" scroll-x="true">
							<view
								v-for="(goodsItem, goodsIndex) in item.orderItems" :key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="getOssUrl(goodsItem.coverImage!)" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view
							v-if="item.orderItems?.length === 1"
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.orderItems" :key="goodsIndex"
						>
							<image class="goods-img" :src="getOssUrl(goodsItem.coverImage!)" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{ goodsItem.productName }}</text>
								<text class="attr-box">{{ goodsItem.skuNo }} x {{ goodsItem.quantity }}</text>
								<text class="price">{{ goodsItem.unitPrice }}</text>
							</view>
						</view>

						<view class="price-box">
							共
							<text class="num">{{ item.orderItems?.length }}</text>
							件商品 实付款
							<text class="price">{{ item.unitPrice }}</text>
						</view>
						<view class="action-box b-t">
							<button v-if="isOrderToBeCancelled(item)" class="action-btn" @click="doCancelOrder(item)">取消订单
							</button>
							<button v-if="isOrderTobePaid(item)" class="action-btn recom" @click="toPayOrder(item)">立即支付</button>
						</view>
					</view>

					<px-load-more :status="tabItem.loadingType"></px-load-more>

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts" setup>
import {
	ref,
	onMounted,
} from 'vue';

import empty from '@/components/px-shop/empty.vue';
import type {OrderStatus} from '@/common/api/order';
import {
	cancelOrder,
	getOrdersPageList,
	OrderStatusCancelled,
	OrderStatusCompleted,
	OrderStatusConfirmed,
	OrderStatusDelivered,
	OrderStatusFailed,
	OrderStatusPending,
	OrderStatusRefunded,
	OrderStatusRefunding,
	OrderStatusReturned,
	OrderStatusShipping,
	OrderStatusToBePaid,
	OrderStatusToBeShipped,
} from '@/common/api/order';

import type {ListOrdersPageRequest, Order} from '@/common/model/order';
import {DefaultPageSize, ossURL, staticURL} from '@/common/api';
import {Alert} from '@/utils';
import useOptionsStore from '@/store/modules/data-dictionary';
import type {DictionaryItem} from '@/common/model/dictionary';
import type {MediaResource} from '@/common/model/mediaResource';
import {onHide, onLoad, onShow} from "@dcloudio/uni-app";
import {clearUnreadOrdersFromLocalStorage} from "@/utils/unreadOrders";
import {PrePage} from "@/utils/page";


const optionsStore = useOptionsStore();
const orderStatusToBePaidId =
	optionsStore.GetOptionByKey(
		optionsStore.orderStatus,
		OrderStatusToBePaid
	)?.id;
const orderStatusShippingId =
	optionsStore.GetOptionByKey(
		optionsStore.orderStatus,
		OrderStatusShipping
	)?.id;
const orderStatusDeliveredId =
	optionsStore.GetOptionByKey(
		optionsStore.orderStatus,
		OrderStatusDelivered
	)?.id;
const orderStatusRefundingId =
	optionsStore.GetOptionByKey(
		optionsStore.orderStatus,
		OrderStatusRefunding
	)?.id;
const orderStatusRefundedId =
	optionsStore.GetOptionByKey(
		optionsStore.orderStatus,
		OrderStatusRefunded
	)?.id;
const orderStatusReturnedId =
	optionsStore.GetOptionByKey(
		optionsStore.orderStatus,
		OrderStatusReturned
	)?.id;

const tabCurrentIndex = ref(0);

const navList = ref([
	{
		state: [-1],
		text: '全部',
		loadingType: 'more',
		orderList: [] as Order[],
		loaded: false,
		pagination: {
			total: 0,
			currentPage: 0,
			pageSize: DefaultPageSize,
		},
	},
	{
		state: [orderStatusToBePaidId],
		text: '待付款',
		loadingType: 'more',
		orderList: [] as Order[],
		loaded: false,
		pagination: {
			total: 0,
			currentPage: 0,
			pageSize: DefaultPageSize,
		},
	},
	{
		state: [orderStatusShippingId],
		text: '待收货',
		loadingType: 'more',
		orderList: [] as Order[],
		loaded: false,
		pagination: {
			total: 0,
			currentPage: 0,
			pageSize: DefaultPageSize,
		},
	},
	{
		state: [orderStatusDeliveredId],
		text: '待评价',
		loadingType: 'more',
		orderList: [] as Order[],
		loaded: false,
		pagination: {
			total: 0,
			currentPage: 0,
			pageSize: DefaultPageSize,
		},
	},
	{
		state: [orderStatusRefundingId, orderStatusRefundedId, orderStatusReturnedId],
		text: '售后',
		loadingType: 'more',
		orderList: [] as Order[],
		loaded: false,
		pagination: {
			total: 0,
			currentPage: 0,
			pageSize: DefaultPageSize,
		},
	},
]);

const loadData = (source: string) => {
	const index = tabCurrentIndex.value;
	const navItem = navList.value[index];
	const state = navItem.state;

	if (source === 'tabChange' && navItem.loaded) {
		return;
	}

	if (navItem.loadingType === 'nomore') {
		return;
	}

	if (navItem.loadingType === 'loading') {
		return;
	}

	navItem.loadingType = 'loading';

	setTimeout(async () => {
		const req: ListOrdersPageRequest = {
			pageIndex: navItem.pagination.currentPage,
			pageSize: navItem.pagination.pageSize,
		};

		// if (!state.includes(-1)) {
		// 	// 过滤掉 undefined 并转换为 number 数组
		// 	req.orderStatus = state.filter(item => typeof item === 'number') as number[];
		// }


		const result = await getOrdersPageList(req);

		const orderList = result.list.filter(item => {
			item = Object.assign(item, orderStateExp(item.status));
			if (state.includes(-1)) {
				return item;
			}
			return state.includes(item.status);
		});

		orderList.forEach(item => {
			navItem.orderList.push(item);
		});

		navItem.loaded = true;
		navItem.pagination.currentPage = result.pageIndex + 1;
		navItem.loadingType =
			navItem.orderList.length < result.total ? 'more' : 'nomore';
	}, 600);
};

const getOssUrl = (resource: MediaResource) => {
	if (resource) {
		if (resource.isLocalStored) {
			return staticURL(resource.url);
		}
		return ossURL(resource.url);
	}
};

const reloadData = () => {
	navList.value.forEach(navItem => {
		navItem.orderList = [];
		navItem.loadingType = 'more';
		navItem.loaded = false;
	});
	loadData('');
};

const isOrderFailed = (item: Order) => {
	const statusDD = GetOrderStatusDD(item.status);
	return statusDD?.key === OrderStatusFailed;
};

const isOrderToBeCancelled = (item: Order) => {
	const statusDD = GetOrderStatusDD(item.status);
	const availableStatus = [
		OrderStatusPending,
		OrderStatusToBePaid,
		OrderStatusConfirmed,
		OrderStatusToBeShipped,
		OrderStatusShipping,
	];
	return availableStatus.includes(statusDD?.key!);
};

const isOrderTobePaid = (item: Order) => {
	const statusDD = GetOrderStatusDD(item.status);
	return statusDD?.key === OrderStatusToBePaid;
};

const changeTab = (e: any) => {
	tabCurrentIndex.value = e.target.current;
	loadData('tabChange');
};

const tabClick = (index: number) => {
	tabCurrentIndex.value = index;
};

const deleteOrder = (index: number) => {
	uni.showLoading({
		title: '请稍后',
	});
	setTimeout(() => {
		navList.value[tabCurrentIndex.value].orderList.splice(index, 1);
		uni.hideLoading();
	}, 600);
};

const doCancelOrder = async (item: Order) => {
	uni.showLoading({
		title: '请稍后',
	});
	setTimeout(async () => {
		const result = await cancelOrder({orderId: item.id!});
		if (result.orderId) {
			Alert('取消订单成功');
			reloadData();
		}
		uni.hideLoading();
	}, 600);
};

const toPayOrder = (item: Order) => {
	uni.redirectTo({
		url: `/pages/payment/payment?order=${JSON.stringify(item)}`,
	});
};

const GetOrderStatusDD = (orderStatus: number): DictionaryItem | undefined => {
	const optionsStore = useOptionsStore();
	return optionsStore.GetOptionById(optionsStore.orderStatus, orderStatus);
};

const orderStateExp = (status: OrderStatus) => {
	let stateTip = '';
	let stateTipColor = '#2886c9';

	const orderStatusDD = GetOrderStatusDD(status);
	switch (orderStatusDD?.key) {
		case OrderStatusToBePaid:
			stateTip = orderStatusDD?.name;
			break;
		case OrderStatusToBeShipped:
			stateTip = orderStatusDD?.name;
			break;
		case OrderStatusShipping:
			stateTip = orderStatusDD?.name;
			break;
		case OrderStatusDelivered:
			stateTip = orderStatusDD?.name;
			break;
		case OrderStatusCancelled:
			stateTip = orderStatusDD?.name;
			stateTipColor = '#4d6043';
			break;
		case OrderStatusRefunding:
			stateTip = orderStatusDD?.name;
			stateTipColor = '#d20d4e';
			break;
		case OrderStatusRefunded:
			stateTip = orderStatusDD?.name;
			stateTipColor = '#d20d4e';
			break;
		case OrderStatusReturned:
			stateTipColor = '#d20d4e';
			break;
		case OrderStatusCompleted:
			stateTip = '订单已关闭';
			stateTipColor = '#909399';
			break;

		// 更多自定义状态
	}
	return {stateTip, stateTipColor};
};

onMounted(() => {
	const optionsStore = useOptionsStore();
	const orderStatusToBePaidId =
		optionsStore.GetOptionByKey(
			optionsStore.orderStatus,
			OrderStatusToBePaid
		)?.id;
	const orderStatusShippingId =
		optionsStore.GetOptionByKey(
			optionsStore.orderStatus,
			OrderStatusShipping
		)?.id;
	const orderStatusDeliveredId =
		optionsStore.GetOptionByKey(
			optionsStore.orderStatus,
			OrderStatusDelivered
		)?.id;
	const orderStatusRefundingId =
		optionsStore.GetOptionByKey(
			optionsStore.orderStatus,
			OrderStatusRefunding
		)?.id;
	const orderStatusRefundedId =
		optionsStore.GetOptionByKey(
			optionsStore.orderStatus,
			OrderStatusRefunded
		)?.id;
	const orderStatusReturnedId =
		optionsStore.GetOptionByKey(
			optionsStore.orderStatus,
			OrderStatusReturned
		)?.id;


});


onLoad((options: any) => {
	tabCurrentIndex.value = +options.state;
	// console.log("onloaded ")
	loadData('')
})


onShow(() => {
	// console.log("onShow ")
	clearUnreadOrdersFromLocalStorage()

	const prePage = PrePage()
	prePage.state.unreadCountToBePaid = 0
	prePage.state.unreadCountShipping = 0


})


</script>


<style lang="scss">
@import './order';
</style>
