type TargetContext = '_self' | '_parent' | '_blank' | '_top';

export enum LOADING_STATUS {
	DEFAULT=1,
	STATUS_2,
}

export const OpenWindow = (
	url: string,
	opts?: { target?: TargetContext; [key: string]: any }
) => {
	const {target = '_blank', ...others} = opts || {};
	window.open(
		url,
		target,
		Object.entries(others)
			.reduce((preValue: string[], curValue) => {
				const [key, value] = curValue;
				return [...preValue, `${key}=${value}`];
			}, [])
			.join(',')
	);
};


/**
 * 默认弱提示方法
 * msg    [string]  提示信息
 * status [string]  状态 默认error [正确success, 错误error]
 */
export function ShowToast(msg: string, status: string) {
	if ((status || 'error') == 'success') {
		uni.showToast({
			icon: 'success',
			title: msg,
			duration: 3000
		});
	} else {
		uni.showToast({
			icon: 'none',
			title: msg,
			duration: 3000
		});
	}
}

/**
 * alert确认框
 * title              [string]    标题（默认空）
 * msg                [string]    提示信息，必传
 * is_show_cancel     [int]       是否显示取消按钮（默认显示 0否, 1|undefined是）
 * cancel_text        [string]    取消按钮文字（默认 取消）
 * cancel_color       [string]    取消按钮的文字颜色，必须是 16 进制格式的颜色字符串（默认 #000000）
 * confirm_text       [string]    确认按钮文字（默认 确认）
 * confirm_color      [string]    确认按钮的文字颜色，必须是 16 进制格式的颜色字符串（默认 #000000）
 * object             [boject]    回调操作对象，点击确认回调参数1，取消回调0
 * method             [string]    回调操作对象的函数
 */
export function Alert(e:any) {
	const msg = e.msg || null;
	if (msg != null) {
		const title = e.title || '';
		const is_show_cancel = e.is_show_cancel == 0 ? false : true;
		const cancel_text = e.cancel_text || '取消';
		const confirm_text = e.confirm_text || '确认';
		const cancel_color = e.cancel_color || '#000000';
		const confirm_color = e.confirm_color || '#576B95';
		uni.showModal({
			title: title,
			content: msg,
			showCancel: is_show_cancel,
			cancelText: cancel_text,
			cancelColor: cancel_color,
			confirmText: confirm_text,
			confirmColor: confirm_color,
			success(res) {
				if ((e.object || null) != null && typeof e.object === 'object' && (e.method || null) != null) {
					e.object[e.method](res.confirm ? 1 : 0);
				}
			}
		});
	} else {
		ShowToast('提示信息为空 alert', "");
	}
}


export const RegexURL = new RegExp(
	'^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
	'i'
);


// url参数转json对象
export function URLParamsToJson(url: any): any {
	let json = [];
	if ((url || null) != null) {
		const arr = url.split('&');
		for (let i = 0; i < arr.length; i++) {
			let temp = arr[i].split('=');
			json[temp[0]] = temp[1];
		}
	}
	return json;
}

// json对象转url请求参数
export function JsonToUrlParams(data: any): string {
	let str = '';
	for (var i in data) {
		if (str != '') {
			str += '&';
		}
		str += i + '=' + data[i];
	}
	return str;
}


// 拨打电话
export function MakePhoneCall(phoneNumber: string) {
	if (phoneNumber != "") {
		uni.makePhoneCall({
			phoneNumber: phoneNumber
		});
	}
}


export default null;
