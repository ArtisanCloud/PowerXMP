<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.recipient" placeholder="收货人姓名"
						 placeholder-class="placeholder"/>
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.phoneNumber" placeholder="收货人手机号码"
						 placeholder-class="placeholder"/>
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<input @click="chooseLocation" class="input" v-model="addressData.addressLine"/>
		</view>
		<view class="row b-b">
			<text class="tit">地图选址</text>
			<text @click="chooseLocation" class="input">
				{{ addressData.addressLine2 }}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b">
			<text class="tit">门牌号</text>
			<input class="input" type="text" v-model="addressData.street" placeholder="楼号、门牌"
						 placeholder-class="placeholder"/>
		</view>
		<view class="row b-b">
			<text class="tit">别名</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="家/办公室/临时住址"
						 placeholder-class="placeholder"/>
		</view>
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.isDefault" @change="switchChange"/>
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import type {ShippingAddress} from "@/common/model/address";
import {Alert, ShowToast} from "@/utils";
import {PrePage} from "@/utils/page";
import {createShippingAddress, updateShippingAddress} from "@/common/api/address";

export default defineComponent({
	data() {
		return {
			manageAction: "",
			addressData: {} as ShippingAddress
		}
	},
	onLoad(option: any) {
		let title = '新增收货地址';
		this.manageAction = option.action;
		if (this.manageAction === 'edit') {
			title = '编辑收货地址'
			// console.log(option.data)
			this.addressData = JSON.parse(option.data)
		}

		uni.setNavigationBarTitle({
			title
		})
	},
	methods: {
		switchChange(e: any) {
			this.addressData.isDefault = e.detail.value;
		},

		//地图选择地址
		chooseLocation() {
			uni.chooseLocation({
				success: (data: any) => {
					// console.log(data)
					this.addressData.name = data.name;
					this.addressData.addressLine = data.name;
				}
			})
		},

		//提交
		async confirm() {
			let data = this.addressData;
			if (!data.recipient) {
				Alert('请填写收货人姓名');
				return;
			}
			if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phoneNumber)) {
				Alert('请输入正确的手机号码');
				return;
			}
			if (!data.addressLine && data.addressLine2) {
				data.addressLine = data.addressLine2
			} else if (!data.addressLine && !data.addressLine2) {
				Alert('请在输入地址或选择地图');
				return;
			}


			if (!data.street) {
				Alert('请填写门牌号信息');
				return;
			}


			let formData:any = {
				name: data.name,
				recipient: data.recipient,
				addressLine: data.addressLine,
				addressLine2: data.addressLine2,
				street: data.street,
				city: data.city,
				province: data.province,
				postalCode: data.postalCode,
				country: data.country,
				phoneNumber: data.phoneNumber,
				isDefault: data.isDefault,
			}

			var res:any
			if (this.manageAction == 'edit') {
				formData.shippingAddressId = data.id
				res = await updateShippingAddress(formData)
			}else{
				res = await createShippingAddress(formData)
			}


			if (!res.id) {
				Alert(`地址${this.manageAction == 'edit' ? '修改' : '添加'}失败`)
				return
			}

			//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
			await PrePage().refreshList(data, this.manageAction);
			Alert(`地址${this.manageAction == 'edit' ? '修改' : '添加'}成功`);
			setTimeout(() => {
				uni.navigateBack()
			}, 800)
		},
	}
})
</script>

<style lang="scss">
@import "./address-manage";
</style>
