import type {Model, PaginationRequest, PaginationResponse} from "@/common/model/index";
import type {Artisan} from "@/common/model/artisan";

export interface Cart extends Model {
	customerId: number
	status: number
	items: CartItem[]
}

export interface CartItem extends Model {
	customerId?: number
	cartId?: number
	productId: number
	skuId?: number
	productName?: string
	listPrice?: number
	unitPrice: number
	discount?: number
	quantity: number
	specifications?: string
	imageUrl?: string
	// extend
	checked: boolean
	loaded: string
	stock: number
}


export interface ListCartItemsPageRequest extends PaginationRequest {
}

export interface ListCartItemsPageReply extends PaginationResponse<CartItem> {
}


export type AddToCartRequest = CartItem
export type AddToCartReply = CartItem

export interface UpdateCartItemQuantityRequest {
	itemId: number
	quantity: number
}

export type UpdateCartItemQuantityReply = CartItem

export interface RemoveCartItemRequest {
	itemId: number
}

export interface RemoveCartItemReply {
}

export interface ClearCartItemsRequest {
}

export interface ClearCartItemsReply {
	message: string
}