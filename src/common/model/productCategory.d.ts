import type {
	GetDetailByIDRequest,
	imageAbleInfo,
	Model,
	PaginationRequest,
	PaginationResponse, position
} from "@/common/model/index";
import type {Product} from "@/common/model/product";
import type {MediaSet} from "@/common/model/mediaResource";


export interface ProductCategory extends Model, imageAbleInfo, MediaSet, position {
	pId: number
	name: string
	sort: number
	viceName: string
	description: string
	children: ProductCategory[]
	// extend
	productList: Product[]
}


export interface GetCategoryTreeRequest {
	categoryPId: number

}

export interface GetCategoryTreeReply {
	tree: ProductCategory[]
}

export interface GetCategoryListRequest {
	categoryPId: number
	limit: number
}

export interface GetCategoryListReply {
	list: ProductCategory[];
}


// --- Request Models ---
export interface GetProductCategoryListRequest extends PaginationRequest {

}

export interface GetProductCategoryDetailRequest extends GetDetailByIDRequest {

}

// --- Response Models ---
export interface GetProductCategoryListResponse extends PaginationResponse<ProductCategory> {
	data: ProductCategory[];
}
