import {ProductType} from "@/common/model/constant";

declare namespace API {

	export interface Product extends Model {


	}

	export interface Goods extends Product {
		type: ProductType.goods
	}

	export interface Service extends Product {
		type: ProductType.service
	}



// --- Request Models ---
	export interface RequestGetProductList extends RequestPagination {
		
	}

	export interface RequestGetGoodsList extends RequestPagination {
		type: ProductType.goods
	}
	export interface RequestGetServiceList extends RequestPagination {
		type: ProductType.service
	}
	

	export interface RequestGetProductDetail extends RequestGetDetailByID {

	}

// --- Response Models ---
	export interface ResponseGetProductList extends APIResponse, ResponsePagination {
		data: Product[];
	}

	export interface ResponseGetGoodsList extends APIResponse, ResponsePagination {
		data: Goods[];
	}

	export interface ResponseGetServiceList extends APIResponse, ResponsePagination {
		data: Service[];
	}
}