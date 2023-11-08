<template>

  <view class="container">
    <image class="logo" src="/static/images/logo.png"></image>
    <text class="title">手机号快捷登录</text>
		<!-- #ifdef MP-WEIXIN -->
<!--		<ws-wx-privacy-->
<!--			id="privacy-popup"-->
<!--			title="用户隐私保护提示"-->
<!--			desc="感谢您使用本应用，您使用本应用的服务之前请仔细阅读并同意"-->
<!--			protocol="《用户隐私保护指引》"-->
<!--			:enableAutoProtocol="true"-->
<!--			subDesc="。当您点击同意并开始时用产品服务时，即表示你已理解并同意该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法使用相应服务。"-->
<!--		></ws-wx-privacy>-->
		<!-- #endif -->
    <view class="form">
      <button class="btn" open-type="getPhoneNumber" @getphonenumber="getPhone">
				手机号快捷登录
      </button>
    </view>
  </view>


</template>
<script setup lang="ts">
import { SetToken } from "@/utils/auth";
import { PathHomePage } from "@/common/api";
// import WsWxPrivacy from "@/components/ws-wx-privacy/ws-wx-privacy.vue";
import { inject } from 'vue';

const $api = inject("$api");

const data = () => {
	return {
		code: '',
	};
};

const onLoad = () => {
	//一打开就请求code，解决第一次不能获取手机号
};

const getPhone = async (e: any) => {
	console.log(e);
	if (!e.detail.iv) {
		uni.showToast({
			title: '获取手机号失败',
			icon: 'none',
		});
		return;
	}

	// 小程序登录，获取code
	$api.user.wxLogin().then((wxRes: any) => {
		wxRes.code;
		// console.log(wxRes.code)

		var obj = {
			code: wxRes.code,
			iv: e.detail.iv,
			encryptedData: e.detail.encryptedData,
		};

		// 小程序客户登录，code换取token
		$api.user.authByPhone(obj)
			.then((res: any) => {
				// console.log(res)
				const resData = res;
				if (!!resData.phoneNumber) {
					if (!!resData.token) {
						// 只需保存token
						SetToken(resData.token);
						uni.switchTab({
							url: PathHomePage,
						});
					} else {
						// 授权手机为空
						uni.showModal({
							title: '警示',
							content: "授权登录凭证为空",
						});
					}
				} else {
					// 授权手机为空
					uni.showModal({
						title: '警示',
						content: "授权手机为空",
					});
				}
			})
			.catch((err: any) => {
				// 手机用户授权登录失败
				console.error(err);
				uni.showModal({
					title: '警示',
					content: err.Msg,
				});
			});
	}).catch((err: any) => {
		// 获取微信登录code失败
		console.error(err);
		uni.showModal({
			title: '警示',
			content: err.errMsg,
		});
	});
};

const components = {
	WsWxPrivacy,
};
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;

  .logo {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 40px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .btn {
      width: 200px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 20px;
      background-color: #2db7f5;
      color: #ffffff;
      font-size: 32rpx;
    }
  }


}


</style>