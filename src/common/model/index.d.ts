declare namespace API {

// --- Models ---
	export interface Model {
		id?: number,
		createdAt?: Date,
		updatedAt?: Date,
		deletedAt?: Date,
	}


// --- Request Models ---
	export interface RequestPagination {
		page: number,
		pageSize: number
	}

	export interface RequestGetDetailByID {
		id?: number
	}


// --- Response Models ---

	export interface Meta {
		locale?: string;
		resultCode: number;
		resultMessage?: string;
		returnCode: number;
		returnMessage?: string;
		timezone?: string;
	}

	export interface ResponsePagination<T> {
		list: T[];
		pageIndex: number;
		pageSize: number;
		total: number;
	}

	export interface ResponseErr {
		reason: string,
		msg: string
	}

	export interface Token {
		accessToken: string;
		expiresIn: number;
		refreshToken: string;
		tokenType: string;
	}

}