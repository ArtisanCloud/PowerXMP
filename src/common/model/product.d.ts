import {ProductType} from "@/common/model/constant";
import type {Model} from "@/common/model/index";
import type {MediaResource} from "@/common/model/mediaResource";


export interface ProductAttribute {
	// inventory: number
	// soldAmount: number
	// weight: number
	volume: number
	encode: string
	barCode: string
	extra: string
}
export interface ProductSpecific extends Model {
	id: number
	name:string
	specificOptions: SpecificOption[]

}

export interface ProductStatistics extends Model {
	productId: number;
	soldAmount: number;
	inventoryQuantity: number;
	viewCount: number;
}

export interface SpecificOption extends Model {
	name:string
	selected:boolean
}


export interface PriceBookEntry extends Model, ProductAttribute {
	priceBookId: number;
	productId: number;
	skuId?: number;
	unitPrice: number;
	listPrice?: number;
	isActive: boolean;
	// extend
	discount: number;
	productName?: string;
	spu?: string;
	skuNo?: string;
	skuEntries?: PriceBookEntry[];
}

export interface SKU extends Model {
	skuNo: string
	inventory: number
	unitPrice: number
	listPrice: number
	discount: number
	optionsIds: number[]
	isActive: boolean
}

export interface Product extends Model, ProductAttribute {
	name: string,
	spu: string,
	type: number,
	plan: number,
	description: string,
	coverImages: MediaResource[];
	detailImages: MediaResource[];
	// saleStartDate: Date,
	// saleEndDate: Date,
	productSpecifics: ProductSpecific[],
	skus: SKU[],
	activePriceBookEntry: PriceBookEntry,
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
export interface GetProductListResponse extends PaginationResponse {
	data: Product[];
}

export interface GetGoodsListResponse extends PaginationResponse {
	data: Goods[];
}

export interface GetServiceListResponse extends PaginationResponse {
	data: Service[];
}


export  interface GetProductStatisticsRequest {
	productId:number
}

export type GetProductStatisticsReply =ProductStatistics