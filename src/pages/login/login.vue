<template>

  <view class="container">
    <image class="logo" src="/static/images/logo.png"></image>
    <text class="title">微信授权注册</text>
    <view class="form">
      <button class="btn" open-type="getPhoneNumber" @getphonenumber="getPhone">
        微信授权一键登录
      </button>
    </view>
  </view>


</template>

<script lang="ts">
import {SetToken} from "@/utils/auth";
import {PathHomePage} from "@/common/api";

export default {

  name: "用户授权登录",
  inject: ["$api"],
  data() {
    return {
      code: '',
    }
  },
  onLoad() {
    //一打开就请求code，解决第一次不能获取手机号

  },

  methods: {

    //获取手机号
    async getPhone(e:any) {

      if (!e.detail.iv) {
        uni.showToast({
          title: '获取手机号失败',
          icon: 'none'
        })
        return;
      }

      // 小程序登录，获取code
      this.$api.user.wxLogin().then((wxRes:any) => {
        wxRes.code
        // console.log(wxRes.code)

        var obj = {
          code: wxRes.code,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData
        }

        // 小程序客户登录，code换取token
        this.$api.user.authByPhone(obj).then((res:any) => {
          // console.log(res)
					const resData = res
          if (!!resData.phoneNumber) {
            if (!!resData.token) {
              // 只需保存token
              SetToken(resData.token)
              uni.switchTab({
                url: PathHomePage,
              })
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
        }).catch((err:any) => {

          // 手机用户授权登录失败
          console.error(err)
          uni.showModal({
            title: '警示',
            content: err.Msg,
          });
        })

      }).catch((err:any) => {
        // 获取微信登录code失败
        console.error(err)
        uni.showModal({
          title: '警示',
          content: err.errMsg,
        });
      })

    },
  }

}
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