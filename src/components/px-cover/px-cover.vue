<template>
  <view class="content">
    <image class="banner"
           src="https://img2.baidu.com/it/u=2513717267,2125557001&fm=253&fmt=auto&app=138&f=PNG?w=1876&h=500">
    </image>
    <image class="logo" src="/static/images/logo.png"></image>
    <view class="report">
      <span style="margin-left:128rpx;"></span>
      <text> 作品：{{ workCount }}</text>
      <text> 人气：{{ watchedCount }}</text>
      <text> 喜欢：{{ likesCount }}</text>
    </view>

    <px-separate-line class="px-separate-line" width="500rpx" title="123"></px-separate-line>

  </view>
</template>

<script>
import uLine from "uview-plus/components/u-line/u-line.vue";

export default {
  components: {
    uLine
  },
  name: "px-cover",
  data() {
    return {
      workCount: 0,
      watchedCount: 0,
      likesCount: 0
    };
  }
}
</script>

<style lang="scss">

$debug: false;
//$debug : true;

// 用于通用展示页面,放入横幅和logo
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 8rpx;

  @if $debug or $globalDebug {
    border: 1rpx green solid;
  }

  .banner {
    height: 200rpx;
    width: 100%;

    @if $debug or $globalDebug {
      border: 1rpx red solid;
    }
  }

  .logo {
    height: $logoWidth;
    width: $logoHeight;
    margin-top: -96rpx;
    margin-left: 32rpx;
    margin-right: auto;
    margin-bottom: 50rpx;
    background-color: white;
    border-radius: 50%;
    border: 1rpx gray solid;
    z-index: 20;
  }

  .report {
    margin-top: -160rpx;
    width: 100%;
    text-align: center;
    padding-top: 48rpx;
    padding-bottom: 24rpx;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: white;
    font-size: $uni-font-size-base;

    z-index: 10;

    @if $debug or $globalDebug {
      border: 1rpx blue solid;
    }


    text {
      margin-left: 8rpx;
      margin-right: 8rpx;
    }
  }

  .px-separate-line{
    margin-left: 24rpx;
  }


}
</style>
