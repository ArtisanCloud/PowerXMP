const CacheSystemInfoKey = 'cache_shop_system_info_key'




/**
 * 设置设备信息
 */
export function SetDeviceSystemInfo(): any {
	const system_info = uni.getSystemInfoSync();
	uni.setStorageSync(CacheSystemInfoKey, system_info);
	return system_info;
}


/**
 * 获取设备信息
 */
export function GetDeviceSystemInfo(key: string, dv: any, is_real: boolean): any {
	let info = null;
	if (is_real) {
		info = SetDeviceSystemInfo() || null;
	} else {
		info = uni.getStorageSync(CacheSystemInfoKey) || null;
	}
	if (info == null || (key || null) == null) {
		return info;
	}
	return (info[key] == undefined) ? (dv == undefined ? null : dv) : info[key];
}


// rpx转px
export function RPXToPX(value: number) {
	return ((value || 0) == 0) ? 0 : value / 750 * parseInt(GetDeviceSystemInfo('windowWidth', 0, false));
}


// px转rpx
export function PxToRPX(value: number) {
	return ((value || 0) == 0) ? 0 : value * 750 / parseInt(GetDeviceSystemInfo('windowWidth', 0, false));
}


