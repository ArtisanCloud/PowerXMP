import {APIMethodGet, restURL} from "@/common/api/index";
import {$http} from "@/common/api/http";

import type {
	ListDictionaryItemsReply,
	ListDictionaryItemsRequest,
	ListDictionaryTypesReply,
	ListDictionaryTypesRequest
} from "@/common/model/dictionary";

const UriDateDictionaryApi = 'mp/dictionary/'

export const CustomerTypesDDType = '_customer_type'
export const ProductTypesDDType = '_product_type'
export const ProductPlanDDType = '_product_plan'
export const ApprovalStatusDDType = '_approval_status'
export const SalesChannelsDDType = '_sales_channel'
export const PromoteChannelsDDType = '_promote_channel'
export const SourceTypesDDType = '_source_channel'
export const ArtisanLevelDDType = '_artisan_level';
export const TypeMediaTypeDDType = '_media_type';
export const OrderTypeDDType = '_order_type';
export const OrderStatusDDType = '_order_status';
export const PaymentTypeDDType = '_payment_type';
export const PaymentStatusDDType = '_payment_status';

export const StatusDraft = '_draft'
export const StatusActive = '_active'
export const StatusCanceled = '_canceled'
export const StatusPending = '_pending'
export const StatusInactive = '_inactive'

export const ChannelDirect = '_direct'      // 品牌自营
export const ChannelWechat = '_wechat'      // 微信
export const ChannelTaoBao = '_tao_bao'     // 淘宝
export const ChannelJD = '_jd'              // 京东
export const ChannelDianPing = '_dian_ping' // 点评
export const ChannelMeiTuan = '_mei_tuan'   // 美团
export const ChannelDingDing = '_ding_ding' // 钉钉
export const ChannelDouYin = '_dou_yin'     // 抖音
export const ChannelAlipay = '_alipay'      // 支付宝


export const listDictionaryTypes = (data: ListDictionaryTypesRequest): Promise<ListDictionaryTypesReply> => {
	const url = restURL(UriDateDictionaryApi + "types");

	return $http<ListDictionaryTypesReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};


export const listDictionaryItems = (data: ListDictionaryItemsRequest): Promise<ListDictionaryItemsReply> => {
	const url = restURL(UriDateDictionaryApi + "items");

	return $http<ListDictionaryItemsReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};


