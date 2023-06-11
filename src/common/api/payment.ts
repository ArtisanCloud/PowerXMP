import { APIMethodPost, restURL} from "@/common/api/index";
import {$http} from "@/common/api/http";
import type {CreatePaymentFromOrderByWechatReply, CreatePaymentFromOrderByWechatRequest} from "@/common/model/payment";

export const UriMPTrade = 'mp/trade/'


export const PaymentTypeBank = '_bank'; // 银行
export const PaymentTypeWeChat = '_wechat'; // 微信
export const PaymentTypeAlipay = '_alipay'; // 支付宝
export const PaymentTypePayPal = '_paypal'; // PayPal
export const PaymentTypeCreditCard = '_credit_card'; // 信用卡

export const PaymentStatusPending   = "_pending"   // 待支付
export const PaymentStatusPaid      = "_paid"      // 已支付
export const PaymentStatusRefunded  = "_refunded"  // 已退款
export const PaymentStatusCancelled = "_cancelled" // 已取消


export const createPaymentFromOrder = (data: CreatePaymentFromOrderByWechatRequest): Promise<CreatePaymentFromOrderByWechatReply> => {
	const url = restURL(UriMPTrade + "payments");

	return $http<CreatePaymentFromOrderByWechatReply>({
		url: url,
		method: APIMethodPost,
		data: data,
	}).then((res) => {
		return res;
	});
};
