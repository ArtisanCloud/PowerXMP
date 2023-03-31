import $http from './mock'

export const wxLogin = (): any => {
	// console.log("wxLogin")
	return $http({
		data: {
			errMsg: "login:ok",
			code: "0d1soell2Aef2b42yQml2TyHVu3soelm"
		},
	})
}


export const userPhoneLogin = (data: any)  => {

	// return $http({
	// 	data: {
	// 		Reason: "ERR_CODE",
	// 		Msg: "错误Code登录",
	// 	},
	// })

	return $http({
		data: {
			openID: "o1IFX5A8sfi5nbkXwOzNLLLiL0OA",
			unionID: "",
			phoneNumber: "",
			nickName: "",
			avatarURL: "",
			gender: "",
			token: {
				tokenType: "Bearer",
				expiresIn: "259200",
				accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2Nlc3NUb2tlbiI6ImJhciIsIk5pY2tOYW1lIjoiIiwiT3BlbklEIjoibzFJRlg1QThzZmk1bmJrWHdPek5MTExpTDBPQSIsImV4cCI6MTY4MDQ5MzMyNX0.YH-WzZO0XqitUoU71mhxF1Dbgnbj56Q9q0IBHw8Zdf8",
				refreshToken: ""
			}
		},
	})
}


export const getUserInfo = (data: any) => {

	return $http({
		data: {
			'list|1-10': [{
				'id|+1': 1
			}]
		},
	})
}
