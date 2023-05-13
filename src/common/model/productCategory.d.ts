import type {
	GetDetailByIDRequest,
	imageAbleInfo,
	Model,
	PaginationRequest,
	PaginationResponse, position
} from "@/common/model/index";


export interface ProductCategory extends Model, imageAbleInfo, position {
	pId: number
	name: string
	sort: number
	viceName: string
	description: string
	children: ProductCategory[]
}


export interface GetCategoryTreeRequest {
	id: number;


}

export interface GetCategoryTreeReply {
	tree: ProductCategory[];
}


// --- Request Models ---
export interface GetProductCategoryListRequest extends PaginationRequest {

}

export interface GetProductCategoryDetailRequest extends GetDetailByIDRequest {

}

// --- Response Models ---
export interface GetProductCategoryListResponse extends  PaginationResponse<ProductCategory> {
	data: ProductCategory[];
}
