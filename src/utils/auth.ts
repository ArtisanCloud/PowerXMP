import {STATUS_CODE_UNAUTHORIZED} from "@/common/model/constant";

const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'user_info';

const isLogin = () => {
	const token = uni.getStorageSync(TOKEN_KEY)
	return (!!token || token.token == "");
};

const getToken = (): API.Token => {
	return JSON.parse(uni.getStorageSync(TOKEN_KEY));
};

const setToken = (token: API.Token) => {
	// const jsonToken: string = JSON.stringify(token)
	uni.setStorageSync(TOKEN_KEY, token);
};

const clearToken = () => {
	uni.removeStorage({key: TOKEN_KEY});
};

const getUserInfo = (): API.User => {
	return uni.getStorageSync(USER_INFO_KEY);
};


const isAuthorized = () => {
	let userInfo = getUserInfo();
	return !!userInfo.phoneNumber
};

const checkLoginAuth = ($api) => {
	if (!isLogin()) {

		$api.user.wxLogin().then((wxRes) => {
			wxRes.code
			// console.log(wxRes.code)

			var obj = {
				code: wxRes.code,
			}

			// 小程序客户登录，code换取token
			$api.user.userLogin(obj).then((res) => {
				// console.log(res.data)
				// 手机号码客户已经授权过
				if (!!res.data.phoneNumber) {
					console.log(res.data.token)
					// 只需保存token
					setToken(res.data.token)

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

			}).catch((err) => {
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

		}).catch((err) => {
			// 获取微信的登录code出错
			console.error("checkLoginAuth wx login err:", err)
			uni.showModal({
				title: '警示',
				content: err.errMsg,
			});
		})

	}
}


export {
	isLogin, getToken, setToken, clearToken,
	getUserInfo, isAuthorized, checkLoginAuth
};
