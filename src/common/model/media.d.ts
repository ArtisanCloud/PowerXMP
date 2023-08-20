import type {GetDetailByIDRequest, Model, PaginationRequest, PaginationResponse} from "@/common/model/index";
import {MediaType} from "@/common/model/constant";
import type {MediaResource} from "@/common/model/mediaResource";

export interface Media extends Model,MediaSet {
	title: string
	subTitle: string
	coverImageId: number
	resourceUrl: string
	description: string
	mediaType: number
	viewedCount: number

	// extend
	background: string
}


export interface ListMediasPageRequest extends PaginationRequest {
	mediaTypes: number[]
}

export interface ListMediasPageReply extends PaginationResponse<Media> {
}

export interface News extends Media {
	type: MediaType.news
}

export interface VRWork extends Media {
	type: MediaType.panoWork
}

export interface ThreeDWork extends Media {
	type: MediaType.threeDWork
}

export interface Showcase extends Media {
	type: MediaType.showcase
}


// --- Request Models ---
export interface GetMediaListRequest extends PaginationRequest {
	type: MediaType
}

export interface GetNewsListRequest extends PaginationRequest {
	type: MediaType.news
}

export interface GetPanoWorkListRequest extends PaginationRequest {
	type: MediaType.panoWork
}

export interface GetThreeDWorkListRequest extends PaginationRequest {
	type: MediaType.threeDWork
}

export interface GetShowcaseListRequest extends PaginationRequest {
	type: MediaType.showcase
}


export interface RequestGetMediaDetail extends GetDetailByIDRequest {

}

// --- Response Models ---
export interface GetNewsListResponse extends PaginationResponse<News> {
	data: News[];
}

export interface GetWorkListResponse extends PaginationResponse<VRWork> {
	data: VRWork[];
}

export interface GetPanoWorkListResponse extends PaginationResponse<ThreeDWork> {
	data: ThreeDWork[];
}

export interface GetShowcaseListResponse extends PaginationResponse<Showcase> {
	data: Showcase[];
}




