declare namespace API {

// --- Models ---
	export interface Model {
		ID: number,
		createdAt: Date,
		updatedAt: Date,
		deletedAt: Date,
	}


// --- Request Models ---
	export interface RequestPagination {
		page: number,
		pageSize: number
	}

	export interface RequestGetDetailByID {
		id: number
	}


// --- Response Models ---
	export interface APIResponse {
		meta: Meta;
		data: any;
	}

	export interface Meta {
		locale?: string;
		resultCode: number;
		resultMessage?: string;
		returnCode: number;
		returnMessage?: string;
		timezone?: string;
	}

	export interface ResponsePagination {
		limit?: number;
		page?: number;
		sort?: string;
		totalRows?: number;
		totalPages?: number;
	}

	export interface ResponseMeta {
		statusCode: number,
		message: string
		data: any
	}

	export interface ResponseToken extends APIResponse {
		data: Token | null;
	}

	export interface Token {
		accessToken: string;
		expiresIn: number;
		refreshToken: string;
		tokenType: string;
	}

}