
declare namespace API {

	export interface ProductCategory extends Model {


	}




// --- Request Models ---
	export interface RequestGetProductCategoryList extends RequestPagination {
		
	}

	export interface RequestGetProductCategoryDetail extends RequestGetDetailByID {

	}

// --- Response Models ---
	export interface ResponseGetProductCategoryList extends APIResponse, ResponsePagination {
		data: ProductCategory[];
	}

}