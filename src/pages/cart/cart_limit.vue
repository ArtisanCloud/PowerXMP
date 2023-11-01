<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="@/static/images/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../product-category/product-category" open-type="switchTab">
					随便逛逛>
				</navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartItemList" :key="item.id">
					<view
						class="cart-item"
						:class="{'b-b': index!==cartItemList.length-1}"
					>
						<view class="image-wrapper">
							<image :src="ossURL(item.imageUrl!)"
										 :class="['loaded']"
										 mode="aspectFill"
										 lazy-load
										 @load="onImageLoad( index)"
										 @error="onImageError( index)"
							></image>
							<view
								class="yticon icon-xuanzhong2 checkbox"
								:class="{checked: item.checked}"
								@click="check('item', index)"
							></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{ item.productName }}</text>
							<text class="attr">{{ item.specifications }}</text>
							<text class="price">¥{{ item.unitPrice }}</text>
							<px-number-box
								class="step"
								:min="1"
								:max="3"
								:value="(item.quantity>item.stock) ? item.stock! : item.quantity"
								:isMax="item.quantity>=item.stock"
								:isMin="item.quantity===1"
								:index="index"
								@eventChange="numberChange"
							></px-number-box>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image
						:src="allChecked?'/static/images/selected.png':'/static/images/select.png'"
						mode="aspectFit"
						@click="check('all',-1)"
					></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{ total }}</text>
					<text class="coupon">
						已优惠
						<text>0.0</text>
						元
					</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>


<script lang="ts" setup>
import {defineComponent, ref, watch} from 'vue';
import pxNumberBox from '@/components/px-number-box/px-number-box-limit.vue';
import {IsLogin} from '@/utils/auth';
import {clearCartItems, getCartItemsPageList, removeCartItem, updateCartItemQuantity} from '@/common/api/cart';
import {MaxPageSize, ossURL} from '@/common/api';
import {ShowToast} from '@/utils';
import {CreateMethodByCartItems} from '@/common/api/order';
import type {CartItem} from "@/common/model/cart";
import {onShow} from "@dcloudio/uni-app";

const total = ref(0);
const allChecked = ref(false);
const empty = ref(false);
const cartItemList = ref([] as CartItem[]);

const loadData = async () => {
	let page = await getCartItemsPageList({pageSize: MaxPageSize});
	cartItemList.value = page.list.map(item => {
		item.checked = true;
		return item;
	});
	calcTotal();
};

const onImageLoad = (index: number) => {
	cartItemList.value[index].loaded = 'loaded';
};

const onImageError = (index: number) => {
	cartItemList.value[index].imageUrl = './static/images/errorImage.jpg';
};

const navToLogin = () => {
	uni.navigateTo({
		url: '/pages/login/login'
	});
};

const check = (type: string, index: number) => {
	if (type === 'item') {
		cartItemList.value[index].checked = !cartItemList.value[index].checked;
	} else {
		const checked = !allChecked.value;
		const list = cartItemList.value;
		list.forEach(item => {
			item.checked = checked;
		});
		allChecked.value = checked;
	}
	calcTotal();
};

const numberChange = async (data: any) => {
	const cartItem = cartItemList.value[data.index];
	if (cartItem.id) {
		const res = await updateCartItemQuantity({
			itemId: cartItem.id,
			quantity: data.number,
		});
		cartItem.quantity = data.number;
		calcTotal();
	} else {
		ShowToast("修改该商品的信息有误", 'error');
	}
};

const deleteCartItem = async (index: number) => {
	let row = cartItemList.value[index];
	let id = row.id;
	if (id) {
		const res = await removeCartItem({itemId: id});
		cartItemList.value.splice(index, 1);
		calcTotal();
		uni.hideLoading();
	} else {
		ShowToast("删除该商品的信息有误", 'error');
	}
};

const clearCart = () => {
	uni.showModal({
		content: '清空购物车？',
		success: async (e) => {
			if (e.confirm) {
				const res = await clearCartItems({});
				if (res.message) {
					ShowToast(res.message, 'success');
					cartItemList.value = [];
				} else {
					ShowToast("清空失败", 'error');
				}
			}
		}
	});
};

const calcTotal = () => {
	let list = cartItemList.value;
	if (list.length === 0) {
		empty.value = true;
		return;
	}
	let totalValue = 0;
	let checked = true;
	list.forEach(item => {
		if (item.checked) {
			totalValue += item.unitPrice * item.quantity;
		} else if (checked) {
			checked = false;
		}
	});
	allChecked.value = checked;
	total.value = Number(totalValue.toFixed(2));
};

const createOrder = () => {
	let list = cartItemList.value;
	uni.navigateTo({
		url: `/pages/order/create-order?data=${JSON.stringify({
			goodsData: list,
			total: total.value,
			makeOrderBy: CreateMethodByCartItems,
		})}`
	});
};

onShow(() => {
	loadData();
});


watch(cartItemList, (e) => {
	let emptyValue = e.length === 0;
	if (empty.value !== emptyValue) {
		empty.value = emptyValue;
	}
});

const hasLogin = IsLogin();

const components = {
	pxNumberBox
};


</script>

<style lang='scss'>
@import './cart.scss';
</style>