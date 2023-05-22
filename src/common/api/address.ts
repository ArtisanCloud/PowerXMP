import {APIMethodDelete, APIMethodGet, APIMethodPost, APIMethodPut, restURL} from "@/common/api/index";
import {$http} from "@/common/api/http";
import {URIMPTrade} from "@/common/api/cart";
import type {
	CreateShippingAddressReply, CreateShippingAddressRequest,
	DeleteShippingAddressReply,
	DeleteShippingAddressRequest,
	ListShippingAddressesPageReply,
	ListShippingAddressesPageRequest, UpdateShippingAddressReply, UpdateShippingAddressRequest
} from "@/common/model/address";


export const getShippingAddressesPageList = (data: ListShippingAddressesPageRequest): Promise<ListShippingAddressesPageReply> => {
	const url = restURL(URIMPTrade + "address/shipping/page-list");

	return $http<ListShippingAddressesPageReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};

export const createShippingAddress = (data: CreateShippingAddressRequest): Promise<CreateShippingAddressReply> => {
	const url = restURL(URIMPTrade + "address/shipping");

	return $http<CreateShippingAddressReply>({
		url: url,
		method: APIMethodPost,
		data: data,
	}).then((res) => {
		return res;
	});
};

export const putShippingAddress = (data: UpdateShippingAddressRequest): Promise<UpdateShippingAddressReply> => {
	const url = restURL(URIMPTrade + "address/shipping/"+data.shippingAddressId);

	return $http<UpdateShippingAddressReply>({
		url: url,
		method: APIMethodPut,
		data: data,
	}).then((res) => {
		return res;
	});
};

export const deleteShippingAddress = (data: DeleteShippingAddressRequest): Promise<DeleteShippingAddressReply> => {
	const url = restURL(URIMPTrade + "address/shipping/"+data.shippingAddressId);

	return $http<DeleteShippingAddressReply>({
		url: url,
		method: APIMethodDelete,
		data: data,
	}).then((res) => {
		return res;
	});
};