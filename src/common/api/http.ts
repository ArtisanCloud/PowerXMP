import { GetToken } from "@/utils/auth";

export const STATUS_CODE_SUCCESS = 200;
export const STATUS_CODE_UNAUTHORIZED = 401;

uni.addInterceptor("request", {
	invoke(args) {
		const token = GetToken();
		if (token) {
			// console.log(args);
			if (!args.header) {
				args.headers = {};
			}
			args.header.Authorization = "Bearer " + token.accessToken;
		}
	},
});

export function $http<T>(options: {
	url: string;
	method: string;
	data?: any;
}): Promise<T> {
	const { url, method, data } = options;

	return new Promise<T>((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: data,
			header: {},
			success(res: any) {
				if (res.statusCode == STATUS_CODE_SUCCESS) {
					resolve(res.data as T);
				} else if (res.statusCode == STATUS_CODE_UNAUTHORIZED) {
					console.error("http res :");

					uni.redirectTo({
						url: "/pages/login/login",
					});

					return;
				} else {
					reject(res.data);
				}
			},
			fail(err: any) {
				reject(err);
			},
		} as UniNamespace.RequestOptions); // 使用 UniNamespace.RequestOptions 类型断言
	});
}
