declare namespace API {

	export interface Media extends Model {
		title: string
		subTitle: string
		coverURL: string
		awesomeLink: string
		content: string
		type: MediaType
		viewedCount: number
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
		type: MediaType.case
	}


// --- Request Models ---
	export interface RequestGetMediaList extends RequestPagination {
		type: MediaType
	}

	export interface RequestGetNewsList extends RequestPagination {
		type: MediaType.news
	}
	export interface RequestGetWorkList extends RequestPagination {
		type: MediaType.work
	}
	export interface RequestGetShowcaseList extends RequestPagination {
		type: MediaType.showcase
	}


	export interface RequestGetMediaDetail extends RequestGetDetailByID {

	}

// --- Response Models ---
	export interface ResponseGetNewsList extends APIResponse, ResponsePagination {
		data: News[];
	}

	export interface ResponseGetWorkList extends APIResponse, ResponsePagination {
		data: Work[];
	}

	export interface ResponseGetShowcaseList extends APIResponse, ResponsePagination {
		data: Showcase[];
	}
}