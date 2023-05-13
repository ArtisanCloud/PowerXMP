import {STATUS_CODE_UNAUTHORIZED} from "@/common/model/constant";
import type {Token} from "@/common/model";
import type {User} from "@/common/model/user";
import useOptionsStore from "@/store/modules/data-dictionary";
import {InitSystemOptions} from "@/utils/cachedData";

const TokenKey = 'token';
const UserInfoKey = 'user_info';

const IsLogin = () => {
	const token = uni.getStorageSync(TokenKey)
	return (!!token || token.token == "");
};

const GetToken = (): Token => {
	return uni.getStorageSync(TokenKey)

};

const SetToken = (token: Token) => {
	// const jsonToken: string = JSON.stringify(token)
	uni.setStorageSync(TokenKey, token);
};

const ClearToken = () => {
	uni.removeStorage({key: TokenKey});
};

const GetUserInfo = (): User => {
	return uni.getStorageSync(UserInfoKey);
};


const IsAuthorized = () => {
	let userInfo = GetUserInfo();
	return !!userInfo.phoneNumber
};

const CheckLoginAuth = ($api: any): boolean => {
	if (!IsLogin()) {

		$api.user.wxLogin().then((wxRes: any) => {
			wxRes.code
			// console.log(wxRes.code)

			var obj = {
				code: wxRes.code,
			}

			// 小程序客户登录，code换取token
			$api.user.userLogin(obj).then((res: any) => {
				// console.log(res)
				const resData = res
				// 手机号码客户已经授权过
				if (!!resData.phoneNumber) {
					console.log(resData.token)
					// 只需保存token
					SetToken(resData.token)

					const options = useOptionsStore();
					InitSystemOptions(options)

					uni.redirectTo({
						url: '/pages/index/index',
					})
				} else {
					console.error("checkLoginAuth user login, phone is empty")
					// 需要先授权手机号码
					uni.redirectTo({
						url: '/pages/login/login',
					})
				}

			}).catch((err: any) => {
				console.error("checkLoginAuth user login", err)

				if (err.statusCode == STATUS_CODE_UNAUTHORIZED) {
					// 获取客户授权登录出错
					uni.showModal({
						title: '警示',
						content: err.data.msg,
						success(res) {
							uni.redirectTo({
								url: '/pages/login/login',
							})
						}
					})
				}
			})

		}).catch((err: any) => {
			// 获取微信的登录code出错
			console.error("checkLoginAuth wx login err:", err)
			uni.showModal({
				title: '警示',
				content: err.errMsg,
			});
		})
		return false
	}

	return true
}


export {
	IsLogin, GetToken, SetToken, ClearToken,
	GetUserInfo, IsAuthorized, CheckLoginAuth
};
