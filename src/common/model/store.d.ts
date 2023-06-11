import type {Model, PaginationRequest, PaginationResponse} from "@/common/model/index";
import type {Artisan} from "@/common/model/artisan";

export interface Store extends Model {
		name:  string,
		employeeId:  number,
		contactNumber:  string,
		coverURL:  string,
		address:  string,
		longitude:  number,
		latitude:  number,
		artisans:  Artisan[] ,
	}


export interface ListStoreRequest extends PaginationRequest{
	ids?: number[];
	likeName?: string;
	storeIds?: number[];
}

export interface ListStoreReply extends PaginationResponse<Store> {
}
