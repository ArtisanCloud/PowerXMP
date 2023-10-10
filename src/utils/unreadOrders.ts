export const ToPay = 'toPay'
export const ToShip  = 'toShip'

// 定义未读订单状态类型
export interface UnreadOrderState {
	[key: string]: number;
}

// 加载未读订单状态
export function loadUnreadOrdersFromLocalStorage(): UnreadOrderState {
	const unreadOrdersJson = uni.getStorageSync('unreadOrders');
	console.log(unreadOrdersJson)
	if (unreadOrdersJson === null || unreadOrdersJson==="") {
		return {}; // 如果为 null，返回一个空对象作为默认值
	}
	return JSON.parse(unreadOrdersJson);
}

// 保存未读订单状态
export function saveUnreadOrdersToLocalStorage(unreadOrders: UnreadOrderState): void {
	uni.setStorageSync('unreadOrders', JSON.stringify(unreadOrders));
}

// 更新特定类型的未读状态并进行累加
export function updateUnreadCount(type: string, countToAdd: number): void {
	const unreadOrders = loadUnreadOrdersFromLocalStorage();
	const currentCount = unreadOrders[type] || 0;
	unreadOrders[type] = currentCount + countToAdd;
	saveUnreadOrdersToLocalStorage(unreadOrders);
}

export function clearUnreadOrdersFromLocalStorage() {
	const unreadOrdersJson = uni.getStorageSync('unreadOrders');
	uni.removeStorageSync('unreadOrders');
	const unreadOrdersJson1 = uni.getStorageSync('unreadOrders');
	console.log(unreadOrdersJson1)
}