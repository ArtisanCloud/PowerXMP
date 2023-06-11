import {Model, PaginationRequest, PaginationResponse} from "@/common/model/index";
import type {OrderType} from "@/common/api/order";

export interface PaymentItem extends Model {
	paymentId: number
	quantity: number
	unitPrice: number
	paymentCustomerName: string
	bankInformation: string
	bankResponseCode: string
	carrierType: string
	creditCardNumber: string
	deductMembershipId: string
	deductionPoint: number
	invoiceCreateTime: string
	invoiceNumber: string
	invoiceTotalAmount: number
	taxIdNumber: string

}


export interface Payment extends Model {
	orderId: number
	paymentDate: string
	paymentType: number
	paidAmount: number
	paymentNumber: string
	referenceNumber: string
	status: number
	paymentItems: PaymentItem[]
}


export interface ListPaymentsPageRequest extends PaginationRequest {
}

export interface ListPaymentsPageReply extends PaginationResponse<Payment> {
}


export interface CreatePaymentFromOrderByWechatRequest {
	orderId: number
	paymentType: OrderType
	comment?: string
}

export interface CreatePaymentFromOrderByWechatReply{
	paymentId: number
	data: WechatJSAPITransaction
}

export interface WechatJSAPITransaction{
	appId: string
	nonceStr: string
	package: string
	paySign: string
	signType: string
	timeStamp: string
}

export interface UpdatePaymentQuantityRequest {
	itemId: number
	quantity: number
}

export type UpdatePaymentQuantityReply = Payment

export interface RemovePaymentRequest {
	itemId: number
}

export interface RemovePaymentReply {
}

