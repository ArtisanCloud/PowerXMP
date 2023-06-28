import {URLParamsToJson} from "@/utils/index";
import type {SKU} from "@/common/model/product";

const CACHE_LAUNCH_INFO_KEY = 'cache_launch_info_key'
const CACHE_SCENE_KEY = 'cache_scene_key'

/**
 * 系统参数获取
 */
export function GetLaunchCacheInfo(): any {
	return uni.getStorageSync(CACHE_LAUNCH_INFO_KEY) || null;
}


/**
 * 系统参数设置
 */
export function SetLaunchCacheInfo(params: any): any {
	params = LaunchParamsHandle(params);
	uni.setStorageSync(CACHE_LAUNCH_INFO_KEY, params);
	return params;
}


/**
 * 启动参数处理
 */
export function LaunchParamsHandle(params: any): any {
	// 原有缓存
	const cachedParams = GetLaunchCacheInfo();

	// 当前参数、从query读取覆盖
	if ((params.query || null) != null) {
		params = params.query;
	}
	// query下scene参数解析处理
	if ((params.scene || null) != null) {
		params = URLParamsToJson(decodeURIComponent(params.scene));
	}

	// 原始缓存是否存在邀请id、邀请使用最开始的用户id
	if (cachedParams != null && (cachedParams.referrer || null) != null) {
		params['referrer'] = cachedParams.referrer;
	}

	return params;
}

/**
 * 场景值获取
 */
export function GetSceneData(): number {
	return uni.getStorageSync(CACHE_SCENE_KEY) || 0;
}


/**
 * 场景值设置
 */
export function SetSceneData(params: any): number {
	const scene = ((params.scene || null) == null) ? 0 : parseInt(params.scene);
	uni.setStorageSync(CACHE_SCENE_KEY, scene);
	return scene;
}

/**
 * 当前是否单页模式
 */
export function IsCurrentSinglePage(): boolean {
	const scene = GetSceneData();
	console.log("scene id:",scene)
	// #ifdef MP-WEIXIN
	return (scene == 1002);
	// #endif

	return false;
}


// 保存选中的 SKU 记录到 sessionStorage
export function SaveSelectedSKUsToStorage(selectedSKUs: SKU[]) {
	try {
		uni.setStorageSync('selectedSKUs', selectedSKUs);
		console.log('Selected SKUs saved to sessionStorage.');
	} catch (e) {
		console.error('Error saving selected SKUs to sessionStorage:', e);
	}
}

// 从 sessionStorage 中读取选中的 SKU 记录
function GetSelectedSKUsFromStorage() {
	try {
		const selectedSKUs = uni.getStorageSync('selectedSKUs');
		console.log('Selected SKUs retrieved from sessionStorage:', selectedSKUs);
		return selectedSKUs;
	} catch (e) {
		console.error('Error retrieving selected SKUs from sessionStorage:', e);
		return null;
	}
}

// 清空指定键的数据
function ClearKeyFromStorage(key:string) {
	try {
		uni.removeStorageSync(key);
		console.log(`Key '${key}' cleared from sessionStorage.`);
	} catch (e) {
		console.error(`Error clearing key '${key}' from sessionStorage:`, e);
	}
}

// 清空所有数据
function ClearAllFromStorage() {
	try {
		uni.clearStorageSync();
		console.log('All data cleared from sessionStorage.');
	} catch (e) {
		console.error('Error clearing all data from sessionStorage:', e);
	}
}