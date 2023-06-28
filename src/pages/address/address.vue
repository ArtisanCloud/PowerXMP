<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-box">
					<text v-if="item.isDefault" class="tag">默认</text>
					<text class="address">{{ item.addressLine }} {{ item.city }}</text>
				</view>
				<view class="u-box">
					<text class="name">{{ item.recipient }}</text>
					<text class="mobile">{{ item.phoneNumber }}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
		</view>
		<!--		<text style="display:block;padding: 16rpx 30rpx 10rpx;lihe-height: 1.6;font-size: 24rpx;">-->
		<!--			重要：添加和修改地址回调仅增加了一条数据做演示，实际开发中将回调改为请求后端接口刷新一下列表即可-->
		<!--		</text>-->

		<button class="add-btn" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import type {ShippingAddress} from "@/common/model/address";
import {PrePage} from "@/utils/page";
import {getShippingAddressesPageList} from "@/common/api/address";
import {MaxPageSize} from "@/common/api";

export default defineComponent({
	data() {
		return {
			source: 0,
			addressList: [] as ShippingAddress[]
		}
	},
	async onLoad(option: any) {
		// console.log(option);
		// console.log(option.addresses)

		this.source = option.source;
		if (this.source == 1) {
			this.addressList = JSON.parse(decodeURIComponent(option.addresses));
		} else {
			const res = await getShippingAddressesPageList({
				pageIndex: 1,
				pageSize: MaxPageSize
			})
			if (res.list) {
				this.addressList = res.list
			}
		}


	},
	methods: {
		//选择地址
		checkAddress(item: ShippingAddress) {
			// console.log("selected:",item)
			if (this.source == 1) {
				//this.$api.prePage()获取上一页实例，在App.vue定义
				PrePage().addressData = item;
				uni.navigateBack()
			}
		},
		addAddress(action: string, item: ShippingAddress) {
			uni.navigateTo({
				url: `/pages/address/address-manage?action=${action}&data=${JSON.stringify(item)}`
			})
		},
		//添加或修改成功之后回调
		async refreshList(data: ShippingAddress, action: string) {
			//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可

			const res = await getShippingAddressesPageList({pageIndex: 1, pageSize: MaxPageSize})
			this.addressList = res.list

			// refreshList会被在address-manage这里调用，所以需要-3
			let ppp = PrePage(3)

			ppp.addressList = res.list
			ppp.addressData = res.list[0]
			// console.log(data, type);
		}
	}
})

</script>

<style lang='scss'>
@import "./address";
</style>
