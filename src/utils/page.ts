export function PrePage() {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];

	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}