import {Model, PaginationRequest, PaginationResponse} from "@/common/model/index";
import type {Payment} from "@/common/model/payment";
import type {MediaSet} from "@/common/model/mediaResource";


export interface OrderItem extends Model,MediaSet {
	orderId: number
	priceBookEntryId: number
	customerId: number
	type: number
	status: number
	quantity: number
	unitPrice: number
	listPrice: number
	discount: number
	productName:string
	skuNo: string
}

export interface Order extends Model {

	customerId?: number
	paymentType?: number
	type?: number
	status: number
	orderNumber?: string
	discount?: number
	listPrice?: number
	unitPrice?: number
	comment?: string
	orderItems?: OrderItem[]
	payments?: Payment[]

	// extend
	stateTipColor?: string
	stateTip?: string
}


export interface ListOrdersPageRequest extends PaginationRequest {
	statusIds?: number[]
	typeIds?: number[]
}

export interface ListOrdersPageReply extends PaginationResponse<Order> {
}


export interface CreateOrderByProductsRequest {
	productIds: number[]
	skuIds: number[]
	quantities: number[]
	shippingAddressId: number
	comment: string
}

export interface CreateOrderByProductsReply {
	orderId: number
	cartId: number
	paymentAmount: number
}

export interface CreateOrderByCartItemsRequest {
	cartItemIds: number[]
	shippingAddressId: number
	comment: string
}

export interface CreateOrderByCartItemsReply {
	orderId: number
	paymentAmount: number
}

export interface UpdateOrderQuantityRequest {
	orderId: number
	quantity: number
}

export type UpdateOrderQuantityReply = Order


export interface CancelOrderRequest {
	orderId: number
}

export interface CancelOrderReply {
	orderId: number
}