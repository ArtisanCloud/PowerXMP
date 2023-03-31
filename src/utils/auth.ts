const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'user_info';

const isLogin = () => {
	return !!uni.getStorageSync(TOKEN_KEY);
};

const getToken = (): API.Token => {
	return uni.getStorageSync(TOKEN_KEY);
};

const setToken = (token: API.Token) => {
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
	return !!userInfo.PhoneNumber
};

export {isLogin, getToken, setToken, clearToken, getUserInfo, isAuthorized};
