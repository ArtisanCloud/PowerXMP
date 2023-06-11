export function PrePage(preStep: number = 2) {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - preStep];

	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}