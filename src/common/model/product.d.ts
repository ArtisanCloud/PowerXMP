import {ProductType} from "@/common/model/constant";

export interface ProductSpecific {
	inventory: number
	weight: number
	volume: number
	encode: string
	barCode: string
	extra: string
}

export interface Product extends Model, ProductSpecific {
	name: string,
	type: number,
	plan: number,
	accountingCategory: string,
	canSellOnline: boolean,
	canUseForDeduct: boolean,
	approvalStatus: number,
	isActivated: boolean,
	description: string,
	coverURL: string,
	purchasedQuantity: number,
	validityPeriodDays: number,
	salesChannelsItemIds: number[]
	promoteChannelsItemIds: number[]
	saleStartDate: Date,
	saleEndDate: Date,

}


export interface ListProductPageRequest {
	ids?: number[];
	likeName?: string;
	storeIds?: number[];
	pageIndex?: number;
	pageSize?: number;
}

export interface ListProductPageReply {
	list: Product[];
	pageIndex: number;
	pageSize: number;
	total: number;
}


export interface Goods extends Product {
	type: ProductType.goods
}

export interface Service extends Product {
	type: ProductType.service
}


// --- Request Models ---
export interface GetProductListRequest extends PaginationRequest {

}

export interface GetGoodsListRequest extends PaginationRequest {
	type: ProductType.goods
}

export interface GetServiceListRequest extends PaginationRequest {
	type: ProductType.service
}


export interface GetProductDetailRequest extends GetDetailByIDRequest {

}

// --- Response Models ---
export interface GetProductListResponse extends APIResponse, PaginationResponse {
	data: Product[];
}

export interface GetGoodsListResponse extends APIResponse, PaginationResponse {
	data: Goods[];
}

export interface GetServiceListResponse extends APIResponse, PaginationResponse {
	data: Service[];
}

