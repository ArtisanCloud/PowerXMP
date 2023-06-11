import type {Model} from "@/common/model/index";

export interface DictionaryItem extends Model {

	key: string
	type: string
	name: string
	value: string
	sort: number
	description: string

}


export interface DictionaryType extends Model {

	type: string
	name: string
	description: string
	items: DictionaryItem[]

}


export interface ListDictionaryTypesRequest {
	ids?: number[];
	likeName?: string;
	pageIndex?: number;
	pageSize?: number;

}

export interface ListDictionaryTypesReply {
	list: DictionaryType[];
	pageIndex: number;
	pageSize: number;
	total: number;
}


export interface CreateDictionaryTypeRequest {
	type: string
	name: string
	description?: string
}

export interface CreateDictionaryTypeReply {
	type: string
	name: string
	description?: string
}


export interface UpdateDictionaryTypeRequest {
	type: string
	name: string
	description?: string
}

export type UpdateDictionaryTypeReply = DictionaryType


export interface DeleteDictionaryTypeRequest {
	type: string;
}

export interface DeleteDictionaryTypeReply {
	type: string;
}


export interface ListDictionaryItemsRequest {
	type: string;

}

export interface ListDictionaryItemsReply {
	list: DictionaryItem[];
}


export interface CreateDictionaryItemRequest {
	key: string
	type: string
	name: string
	value: string
	sort?: number
	description?: string
}

export interface CreateDictionaryItemReply {
	key: string
	type: string
	name: string
	value: string
	sort?: number
	description?: string
}



export interface UpdateDictionaryItemRequest {
	key: string
	type: string
	name: string
	value: string
	sort?: number
	description?: string
}

export type UpdateDictionaryItemReply = DictionaryItem

export interface DeleteDictionaryItemRequest {
	type: string;
	key: string;
}

export interface DeleteDictionaryItemReply {
	type: string;
	key: string;
}


