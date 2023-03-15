import type {
	APIResponse,
	Model,
	RequestGetDetailByID,
	RequestPagination,
	ResponsePagination
} from "@/common/model/index";

// Models
enum MediaType {
	news,
	work,
	case,

}

export interface Media extends Model {
	title: string
	subTitle: string
	coverURL: string
	content: string
	type: MediaType

}


export interface News extends Media {
	type: MediaType.news
}

export interface Work extends Media {
	type: MediaType.work
}

export interface Case extends Media {
	type: MediaType.case
}


// --- Request Models ---
export interface RequestGetMediaList extends RequestPagination {
	type: MediaType
}

export interface RequestGetWorkList extends RequestPagination {
	type: MediaType.work
}

export interface RequestGetMediaDetail extends RequestGetDetailByID {

}

// --- Response Models ---
export interface ResponseGetWorkList extends APIResponse, ResponsePagination {
	data: Work[];
}