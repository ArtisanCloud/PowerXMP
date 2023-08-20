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
							<image :src="item.imageUrl"
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
								:max="item.stock"
								:value="item.quantity>item.stock?item.stock:item.quantity"
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
						@click="check('all')"
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

<script lang="ts">

import pxNumberBox from '@/components/px-number-box/px-number-box.vue'
import {IsLogin} from "@/utils/auth";
import {defineComponent} from "vue";
import {clearCartItems, getCartItemsPageList, removeCartItem, updateCartItemQuantity} from "@/common/api/cart";
import type {CartItem} from "@/common/model/cart";
import {MaxPageSize, ossURL, staticURL} from "@/common/api";
import {ShowToast} from "@/utils";
import {CreateMethodByCartItems} from "@/common/api/order";

export default defineComponent({
	components: {
		pxNumberBox
	},
	data() {
		return {
			total: 0, //总价格
			allChecked: false, //全选状态  true|false
			empty: false, //空白页显示  true|false
			cartItemList: [] as CartItem[],
		};
	},
	// onLoad() {
	// 	this.loadData();
	// },
	onShow() {
		this.loadData();
	},
	watch: {
		//显示空白页
		cartItemList(e) {
			let empty = e.length === 0;
			if (this.empty !== empty) {
				this.empty = empty;
			}
		}
	},
	computed: {
		hasLogin() {
			return IsLogin()

		}
	},
	methods: {

		// getOssUrl(url:string) {
		// 	return ossURL(url)
		// },

		//请求数据
		async loadData() {
			let page = await getCartItemsPageList({pageSize: MaxPageSize});
			this.cartItemList = page.list.map(item => {
				item.checked = true;
				return item;
			});

			this.calcTotal();  //计算总价
		},

		//监听image加载完成
		onImageLoad(index: number) {
			// console.log("loaded:",index)
			this.cartItemList[index].loaded = 'loaded';
		},
		//监听image加载失败
		onImageError(index: number) {
			// console.log("load err:",index)
			this.cartItemList[index].imageUrl = './static/images/errorImage.jpg';
		},

		navToLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		},
		//选中状态处理
		check(type: string, index: number) {
			if (type === 'item') {
				this.cartItemList[index].checked = !this.cartItemList[index].checked;
			} else {
				const checked = !this.allChecked
				const list = this.cartItemList;
				list.forEach(item => {
					item.checked = checked;
				})
				this.allChecked = checked;
			}
			this.calcTotal();
		},
		//数量
		async numberChange(data: any) {
			const cartItem = this.cartItemList[data.index]
			// console.log(data.index,cartItem)
			if (cartItem.id) {
				const res = await updateCartItemQuantity({
					itemId: cartItem.id,
					quantity: data.number,
				})
				cartItem.quantity = data.number;
				this.calcTotal();
			} else {
				ShowToast("修改该商品的信息有误", 'error')
			}

		},
		//删除
		async deleteCartItem(index: number) {
			let row = this.cartItemList[index];
			let id = row.id;
			if (id) {
				const res = await removeCartItem({itemId: id})
				this.cartItemList.splice(index, 1);
				this.calcTotal();
				uni.hideLoading();
			} else {
				ShowToast("删除该商品的信息有误", 'error')
			}

		},
		//清空
		clearCart() {
			uni.showModal({
				content: '清空购物车？',
				success: async (e) => {
					if (e.confirm) {
						const res = await clearCartItems({})
						if (res.message) {
							ShowToast(res.message, 'success')
							this.cartItemList = [];
						} else {
							ShowToast("清空失败", 'error')
						}

					}
				}
			})
		},
		//计算总价
		calcTotal() {
			let list = this.cartItemList;
			if (list.length === 0) {
				this.empty = true;
				return;
			}
			let total = 0;
			let checked = true;
			list.forEach(item => {
				if (item.checked) {
					// console.log(item.unitPrice, item.quantity)
					total += item.unitPrice * item.quantity;
				} else if (checked) {
					checked = false;
				}
			})
			this.allChecked = checked;
			this.total = Number(total.toFixed(2));
			// console.log("total:",total)
		},
		//创建订单
		createOrder() {
			let list = this.cartItemList;

			uni.navigateTo({
				url: `/pages/order/create-order?data=${JSON.stringify({
					goodsData: list,
					total: this.total,
					makeOrderBy: CreateMethodByCartItems,
				})}`
			})

		}
	}
})

</script>

<style lang='scss'>
@import './cart.scss';
</style>
