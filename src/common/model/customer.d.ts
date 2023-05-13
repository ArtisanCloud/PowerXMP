import type {Model} from "@/common/model/index";

export interface CustomerExternalId {
	openIdInMiniProgram: string,
	openIdInWeChatOfficialAccount: string,
	openIdInWeCom: string,
}

export interface Customer extends Model, CustomerExternalId {

	name: string,
	mobile: string,
	email: string,
	inviterId: number,
	source: number,
	type: number,
	isActivated: boolean,

}