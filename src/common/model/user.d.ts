declare namespace API {

	export interface WXLoginReply {
		errMsg: string,
		code: string,
	}

	// 作为小程序的使用者，客户MPCustomer就界定为User，这里的User就代表了PowerX的WechatMPCustomer
	export interface User extends Model {
		OpenID?: string,
		UnionID?: string,
		PhoneNumber?: string,
		NickName?: string,
		AvatarURL?: string,
		Gender?: string,
		Token?: string,

	}


}