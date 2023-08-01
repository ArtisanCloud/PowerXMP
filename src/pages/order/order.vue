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

						<scroll-view v-if="item.orderItems.length > 1" class="goods-box" scroll-x="true">
							<view
								v-for="(goodsItem, goodsIndex) in item.orderItems" :key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="getOssUrl(goodsItem?.coverImage)" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view
							v-if="item.orderItems.length === 1"
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.orderItems" :key="goodsIndex"
						>
							<image class="goods-img" :src="getOssUrl(goodsItem?.coverImage)" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{ goodsItem.productName }}</text>
								<text class="attr-box">{{ goodsItem.skuNo }} x {{ goodsItem.quantity }}</text>
								<text class="price">{{ goodsItem.unitPrice }}</text>
							</view>
						</view>

						<view class="price-box">
							共
							<text class="num">{{ item.orderItems.length }}</text>
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

<script lang="ts">
import uniLoadMore from '@/components/px-load-more/px-load-more.vue';
import empty from "@/components/px-shop/empty.vue";
import {defineComponent, reactive} from "vue";
import type {OrderStatus, OrderType} from "@/common/api/order";
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
	OrderStatusToBePaid, OrderStatusToBeShipped
} from "@/common/api/order";
import type {ListOrdersPageRequest, Order} from "@/common/model/order";
import {DefaultPageSize, ossURL, staticURL} from "@/common/api";
import {Alert, ShowToast} from "@/utils";
import useOptionsStore from "@/store/modules/data-dictionary";
import type {DictionaryItem} from "@/common/model/dictionary";
import type {MediaResource} from "@/common/model/mediaResource";

export default defineComponent({
	components: {
		uniLoadMore,
		empty
	},

	data() {
		const optionsStore = useOptionsStore();
		const orderStatusToBePaidId = optionsStore.GetOptionByKey(optionsStore.orderStatus, OrderStatusToBePaid)?.id
		const orderStatusShippingId = optionsStore.GetOptionByKey(optionsStore.orderStatus, OrderStatusShipping)?.id
		const orderStatusDeliveredId = optionsStore.GetOptionByKey(optionsStore.orderStatus, OrderStatusDelivered)?.id
		const orderStatusRefundingId = optionsStore.GetOptionByKey(optionsStore.orderStatus, OrderStatusRefunding)?.id
		const orderStatusRefundedId = optionsStore.GetOptionByKey(optionsStore.orderStatus, OrderStatusRefunded)?.id
		const orderStatusReturnedId = optionsStore.GetOptionByKey(optionsStore.orderStatus, OrderStatusReturned)?.id

		return {
			tabCurrentIndex: 0,
			navList: [
				{
					state: [-1],
					text: '全部',
					loadingType: 'more',
					orderList: [] as Order[],
					loaded: false,
					pagination: {
						'total': 0,
						'currentPage': 0,
						'pageSize': DefaultPageSize,
					}
				},
				{
					state: [orderStatusToBePaidId],
					text: '待付款',
					loadingType: 'more',
					orderList: [] as Order[],
					loaded: false,
					pagination: {
						'total': 0,
						'currentPage': 0,
						'pageSize': DefaultPageSize,
					}
				},
				{
					state: [orderStatusShippingId],
					text: '待收货',
					loadingType: 'more',
					orderList: [] as Order[],
					loaded: false,
					pagination: {
						'total': 0,
						'currentPage': 0,
						'pageSize': DefaultPageSize,
					}
				},
				{
					state: [orderStatusDeliveredId],
					text: '待评价',
					loadingType: 'more',
					orderList: [] as Order[],
					loaded: false,
					pagination: {
						'total': 0,
						'currentPage': 0,
						'pageSize': DefaultPageSize,
					}
				},
				{
					state: [orderStatusRefundingId, orderStatusRefundedId, orderStatusReturnedId],
					text: '售后',
					loadingType: 'more',
					orderList: [] as Order[],
					loaded: false,
					pagination: {
						'total': 0,
						'currentPage': 0,
						'pageSize': DefaultPageSize,
					}
				}
			],
		};
	},

	onLoad(options: any) {
		/**
		 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
		 * 替换onLoad下代码即可
		 */
		this.tabCurrentIndex = +options.state;
		// #ifndef MP
		this.loadData('')
		// #endif
		// #ifdef MP
		if (options.state == 0) {
			this.loadData('')
		}
		// #endif

	},

	methods: {

		getOssUrl(resource: MediaResource) {
			if (resource) {
				if (resource.isLocalStored) {
					return staticURL(resource.url)
				}
				return ossURL(resource.url)
			}
		},

		reloadData() {
			this.navList.forEach(navItem => {
				navItem.orderList = []
				navItem.loadingType = 'more'
				navItem.loaded = false
			})
			this.loadData('')
		},

		//获取订单列表
		loadData(source: string) {
			//这里是将订单挂载到tab列表下
			let index = this.tabCurrentIndex;
			let navItem = this.navList[index];
			let state = navItem.state;

			if (source === 'tabChange' && navItem.loaded) {
				//tab切换只有第一次需要加载数据
				return;
			}

			if (navItem.loadingType === 'nomore') {
				return;
			}

			if (navItem.loadingType === 'loading') {
				//防止重复加载
				return;
			}

			navItem.loadingType = 'loading';


			// console.log(result)

			setTimeout(async () => {

				console.log("before add ", navItem.pagination.currentPage)
				let req: ListOrdersPageRequest = {
					pageIndex: navItem.pagination.currentPage,
					pageSize: navItem.pagination.pageSize,
				}
				if (!state.includes(-1)) {
					req.orderStatus = state
				}
				const result = await getOrdersPageList(req)

				// 根据订单状态筛选订单
				let orderList = result.list.filter(item => {

					//添加不同状态下订单的表现形式
					item = Object.assign(item, this.orderStateExp(item.status));
					//演示数据所以自己进行状态筛选
					if (state.includes(-1)) {
						//0为全部订单
						return item;
					}
					return state.includes(item.status);
				});
				// console.log("after filter", orderList)
				orderList.forEach(item => {
					navItem.orderList.push(item);
				})
				//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
				navItem.loaded = true

				navItem.pagination.currentPage = result.pageIndex + 1
				console.log("loaded add ", navItem.pagination.currentPage)

				//判断是否还有数据， 有改为 more， 没有改为noMore
				navItem.loadingType = navItem.orderList.length < result.total ? 'more' : 'nomore';

			}, 600);
		},

		isOrderFailed(item: Order) {
			const statusDD = this.GetOrderStatusDD(item.status)
			return statusDD?.key === OrderStatusFailed
		},

		isOrderToBeCancelled(item: Order) {
			const statusDD = this.GetOrderStatusDD(item.status)
			const availableStatus = [
				OrderStatusPending,
				OrderStatusToBePaid,
				OrderStatusConfirmed,
				OrderStatusToBeShipped,
				OrderStatusShipping,
			]
			return availableStatus.includes(statusDD?.key!)
		},

		isOrderTobePaid(item: Order) {
			const statusDD = this.GetOrderStatusDD(item.status)
			return statusDD?.key === OrderStatusToBePaid
		},

		//swiper 切换
		changeTab(e: any) {
			this.tabCurrentIndex = e.target.current;
			this.loadData('tabChange');
		},
		//顶部tab点击
		tabClick(index: number) {
			this.tabCurrentIndex = index;
		},
		//删除订单
		deleteOrder(index: number) {
			uni.showLoading({
				title: '请稍后'
			})
			setTimeout(() => {
				this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
				uni.hideLoading();
			}, 600)
		},
		//取消订单
		doCancelOrder(item: Order) {
			uni.showLoading({
				title: '请稍后'
			});

			setTimeout(async () => {
				try {
					const result = await cancelOrder({orderId: item.id!});
					if (result.orderId) {
						Alert("取消订单成功");
						this.reloadData();
					}
				} catch (error) {
					// Handle the error here
					console.error("Error while canceling order:", error);
					Alert("取消订单失败，请重试");
				} finally {
					uni.hideLoading();
				}
			}, 600);
		},

		toPayOrder(item: Order) {
			uni.redirectTo({
				url: `/pages/payment/payment?order=${JSON.stringify(item)}`
			})
		},

		GetOrderStatusDD(orderStatus: number): DictionaryItem | undefined {
			const optionsStore = useOptionsStore();
			return optionsStore.GetOptionById(optionsStore.orderStatus, orderStatus)
		},

		// 订单状态文字和颜色
		// 全部订单：展示所有订单，无论其状态是什么。
		// 待付款订单：筛选状态为待处理（OrderStatusPending）的订单。
		// 待收货订单：筛选状态为已确认（OrderStatusConfirmed）或进行中（OrderStatusInProgress）的订单。
		// 退款订单：筛选状态为已退款（OrderStatusRefunded）的订单。
		orderStateExp(status: OrderStatus) {
			let stateTip = '',
				stateTipColor = '#2886c9';

			const orderStatusDD = this.GetOrderStatusDD(status)
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

				//更多自定义
			}
			return {stateTip, stateTipColor};
		}
	},
})

</script>

<style lang="scss">
@import './order';
</style>
