import type {Model, Token} from "@/common/model/index";

export interface WXLoginReply {
	errMsg: string,
	code: string,
}

// 作为小程序的使用者，客户MPCustomer就界定为User，这里的User就代表了PowerX的WechatMPCustomer
export interface User extends Model {
	openID: string,
	unionID: string,
	phoneNumber: string,
	nickName: string,
	avatarURL: string,
	gender: string,
	token: Token,

}
