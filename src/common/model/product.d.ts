import {ProductType} from "@/common/model/constant";
import type {Model} from "@/common/model/index";
import type {MediaResource} from "@/common/model/mediaResource";
import Product from "@/pages/product/product.vue";

export interface ProductSpecific {
	inventory: number
	soldAmount: number
	weight: number
	volume: number
	encode: string
	barCode: string
	extra: string
}

export interface PriceEntry extends Model {
	unitPrice: number
	retailPrice: number
	discount: number
}

export interface SKU extends Model {
	skuNo: string
	inventory: number
	unitPrice: number
	retailPrice: number
	isActive: boolean
}

export interface Product extends Model, ProductSpecific {
	name: string,
	spu: string,
	type: number,
	plan: number,
	description: string,
	coverImages: MediaResource[];
	detailImages: MediaResource[];
	// saleStartDate: Date,
	// saleEndDate: Date,
	skus: SKU[],
	priceEntry: PriceEntry,
	viewedCount: number
}


export interface ListProductPageRequest {
	ids?: number[];
	productCategoryId: number
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

export interface GetProductRequest extends Model {
}

export type GetProductReply = Product

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

