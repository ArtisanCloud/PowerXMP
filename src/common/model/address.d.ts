import type {PaginationRequest, PaginationResponse} from "@/common/model/index";

export interface ShippingAddress extends Model {

	customerId: number
	name:string
	recipient: string
	addressLine: string
	addressLine2: string
	street: string
	city: string
	province: string
	postalCode: string
	country: string
	phoneNumber: string
	isDefault: boolean

}

export interface BillingAddress extends ShippingAddress {
	orderId: number
}


export interface DeliveryAddress extends ShippingAddress {
	orderId: number
}


export interface ListShippingAddressesPageRequest extends PaginationRequest {
	nameLike?: string[]
	orderBy?: string
}

export interface ListShippingAddressesPageReply extends PaginationResponse<ShippingAddress> {

}

export type  CreateShippingAddressRequest = ShippingAddress

export interface CreateShippingAddressReply {
	shippingAddressId: number
}

export interface  UpdateShippingAddressRequest extends ShippingAddress{
	shippingAddressId: number

}

export type  UpdateShippingAddressReply = ShippingAddress

export interface DeleteShippingAddressRequest {
	shippingAddressId: number
}

export interface DeleteShippingAddressReply {
	shippingAddressId: number
}