import {APIMethodDelete, APIMethodGet, APIMethodPost, APIMethodPut, restURL} from "@/common/api/index";
import {$http} from "@/common/api/http";

export const UriMPTrade = 'mp/trade/'


import type {
	CancelOrderReply,
	CancelOrderRequest, CreateOrderByCartItemsReply,
	CreateOrderByCartItemsRequest,
	CreateOrderByProductsReply,
	CreateOrderByProductsRequest,
	ListOrdersPageReply,
	ListOrdersPageRequest,
	UpdateOrderQuantityReply,
	UpdateOrderQuantityRequest
} from "@/common/model/order";

export const CreateMethodByProducts = 'by_products'
export const CreateMethodByCartItems = 'by_cart_items'


export type OrderType = number
export const OrderTypeNormal = '_normal'  // 普通订单
export const OrderTypePreorder = '_preorder'  // 预定订单
export const OrderTypeCart = '_cart'  // 购物车订单
export const OrderTypeCustom = '_custom'  // 定制订单
export const OrderTypeSubscription = '_subscription'  // 订阅订单
export const OrderTypeWholesale = '_wholesale'  // 批发订单
export const OrderTypeGift = '_gift'  // 赠品订单
export const OrderTypeGiftWithPurchase = '_gift_with_purchase'  // 有赠品的订单
export const OrderTypeReturn = '_return'  // 退货订单
export const OrderTypeExchange = '_exchange'  // 换货订单
export const OrderTypeReshipment = '_reshipment' // 补发订单

export type OrderStatus = number

export const OrderStatusPending = '_pending'; // 待处理
export const OrderStatusToBePaid = '_to_be_paid'; // 待付款
export const OrderStatusConfirmed = '_confirmed'; // 已确认
export const OrderStatusToBeShipped = '_to_be_shipped'; // 待发货
export const OrderStatusShipping = '_shipping'; // 送货中
export const OrderStatusDelivered = '_delivered'; // 已签收
export const OrderStatusCompleted = '_completed'; // 已完成
export const OrderStatusCancelled = '_cancelled'; // 已取消
export const OrderStatusFailed = '_failed'; // 失败
export const OrderStatusRefunding = '_refunding'; // 退款中
export const OrderStatusRefunded = '_refunded'; // 已退款
export const OrderStatusReturned = '_returned'; // 已退货

export const getOrdersPageList = (data: ListOrdersPageRequest): Promise<ListOrdersPageReply> => {
	const url = restURL(UriMPTrade + "orders/page-list");

	return $http<ListOrdersPageReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};


export const CreateOrderByProducts = (data: CreateOrderByProductsRequest): Promise<CreateOrderByProductsReply> => {
	const url = restURL(UriMPTrade + "orders/products");

	return $http<CreateOrderByProductsReply>({
		url: url,
		method: APIMethodPost,
		data: data,
	}).then((res) => {
		return res;
	});
};

export const CreateOrderByCartItems = (data: CreateOrderByCartItemsRequest): Promise<CreateOrderByCartItemsReply> => {
	const url = restURL(UriMPTrade + "orders/cart-items");

	return $http<CreateOrderByCartItemsReply>({
		url: url,
		method: APIMethodPost,
		data: data,
	}).then((res) => {
		return res;
	});
};

export const updateOrderQuantity = (data: UpdateOrderQuantityRequest): Promise<UpdateOrderQuantityReply> => {
	const url = restURL(UriMPTrade + "orders/items/" + data.orderId);

	return $http<UpdateOrderQuantityReply>({
		url: url,
		method: APIMethodPut,
		data: data,
	}).then((res) => {
		return res;
	});
};


export const cancelOrder = (data: CancelOrderRequest): Promise<CancelOrderReply> => {
	const url = restURL(UriMPTrade + "orders/cancel/" + data.orderId);

	return $http<CancelOrderReply>({
		url: url,
		method: APIMethodPut,
		data: data,
	}).then((res) => {
		return res;
	});
};