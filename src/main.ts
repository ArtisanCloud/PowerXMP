import {createSSRApp} from "vue";
import App from "./App.vue";

import mock from "./common/mock/index";
import api from "./common/api/index";

// 引入第三方UI组件
import uViewPlus from "uview-plus";

console.log('meta env', import.meta.env);

export function createApp() {
	const app = createSSRApp(App);

	// 基于Vue3的一些额外配置
	{
		// Vue3的global变量初始化
		// https://cn.vuejs.org/api/application.html#app-config-globalproperties
		if (import.meta.env.VITE_MOCK_MODE == "true") {
			console.log("mock mode");
			app.config.globalProperties.$api = mock
		} else {
			console.log("api mode");
			app.config.globalProperties.$api = api
		}
		//
		// 在Vue3配置uViewPlus
		app.use(uViewPlus)
		// // uViewPlus如此配置即可
		uni.$u.config.unit = 'rpx'

	}

	return {
		app,
	};
}
