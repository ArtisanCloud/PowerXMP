import {$http} from "@/common/api/http";
import {APIMethodDelete, APIMethodGet, APIMethodPost, APIMethodPut, restURL} from "@/common/api/index";
import type {
	AddToCartReply,
	AddToCartRequest, ClearCartItemsReply, ClearCartItemsRequest,
	ListCartItemsPageReply,
	ListCartItemsPageRequest,
	RemoveCartItemReply,
	RemoveCartItemRequest,
	UpdateCartItemQuantityReply,
	UpdateCartItemQuantityRequest
} from "@/common/model/cart";
import {UriMPTrade} from "@/common/api/order";

export const getCartItemsPageList = (data: ListCartItemsPageRequest): Promise<ListCartItemsPageReply> => {
	const url = restURL(UriMPTrade + "cart/items/page-list");

	return $http<ListCartItemsPageReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};
export const AddToCart = (data: AddToCartRequest): Promise<AddToCartReply> => {
	const url = restURL(UriMPTrade + "cart/items");

	return $http<AddToCartReply>({
		url: url,
		method: APIMethodPost,
		data: data,
	}).then((res) => {
		return res;
	});
};

export const updateCartItemQuantity = (data: UpdateCartItemQuantityRequest): Promise<UpdateCartItemQuantityReply> => {
	const url = restURL(UriMPTrade + "cart/items/"+data.itemId);

	return $http<UpdateCartItemQuantityReply>({
		url: url,
		method: APIMethodPut,
		data: data,
	}).then((res) => {
		return res;
	});
};



export const removeCartItem = (data: RemoveCartItemRequest): Promise<RemoveCartItemReply> => {
	const url = restURL(UriMPTrade + "cart/items/"+data.itemId);

	return $http<RemoveCartItemReply>({
		url: url,
		method: APIMethodDelete,
		data: data,
	}).then((res) => {
		return res;
	});
};


export const clearCartItems = (data: ClearCartItemsRequest): Promise<ClearCartItemsReply> => {
	const url = restURL(UriMPTrade + "cart/items/clear");

	return $http<ClearCartItemsReply>({
		url: url,
		method: APIMethodDelete,
		data: data,
	}).then((res) => {
		return res;
	});
};
