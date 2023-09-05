//useShare.js
import { onShareAppMessage,onShareTimeline } from '@dcloudio/uni-app'
import {PathHomePage} from "@/common/api";

export const useShare = (params = {}) => {
	let defaultOptions = {
		title:'LBEE club立特缤甄选',
		path: PathHomePage,
		...params
	}
	const shareApp = (options = {}) => {
		onShareAppMessage(() => {
			return {
				...defaultOptions,
				...options
			}
		})
	}
	const shareTime = (options = {}) => {
		onShareTimeline(() => {
			return {
				...defaultOptions,
				...options
			}
		})
	}
	return {
		onShareAppMessage: shareApp,
		onShareTimeline: shareTime,
	}
}