


// --- Models ---
export interface Model {
	id?: number,
	createdAt?: Date,
	updatedAt?: Date,
	deletedAt?: Date,
}


// --- Request Models ---
export interface PaginationRequest {
	pageIndex?: number,
	pageSize?: number
}

export interface GetDetailByIDRequest {
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

export interface PaginationResponse<T> {
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
	expiresIn: string;
	refreshToken: string;
	tokenType: string;
}


export interface imageAbleInfo {
	icon: string;
	backgroundColor: string;
	imageURL: string;
}


export  interface position{
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
}

