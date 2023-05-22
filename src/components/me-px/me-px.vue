<template>
  <view class="content">
    <view class="head-container">
      <image class="logo" src="/images/logo.png"></image>

    </view>

    <view class="scroll-container">
      <scroll-view class="list-scroll" scroll-y>
        <text>123</text>
      </scroll-view>
    </view>


  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "赚零钱",
      currentMonthEarned: 0,
      totalEarned: 0
    }
  },
  methods: {}
}
</script>

<style lang="scss">

$debug: false;
//$debug: true;

$headContainerHeight: 250rpx;

.content {
  display: flex;
  flex-direction: column;
  height: calc(100vh);
  overflow: hidden;

  @if $debug or $globalDebug {
    border: 5rpx pink solid;
  }

  .head-container {
    display: flex;
    justify-content: center; // 元素以主轴（横轴）对齐的位置，这里是左右方向
    align-items: center; // 元素以交叉轴（横轴）对齐的位置，这里是上下方向
    flex: 1; // 该样式占据整个flex行 的1/7
    height: $headContainerHeight;
    background-color: #f8f8f8;

    @if $debug or $globalDebug {
      border: 2rpx green solid;
    }

    .logo {

      height: $logoWidth;
      width: $logoHeight;
      margin-top: 24rpx;
      margin-left: 24rpx;
      margin-right: auto;
      margin-bottom: 50rpx;
      background-color: white;
      border-radius: 50%;
      border: 1rpx gray solid;
      z-index: 20;
      @if $debug or $globalDebug {
        border: 1rpx red solid;
      }
    }

    .earn-summary-box{
      width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      @if $debug or $globalDebug {
        border: 1rpx red solid;
      }
    }

    .separate-line {
      border-left: 1rpx dashed grey;
      margin-left: 24rpx;
      height: 60%;
      width: 1rpx;
      @if $debug or $globalDebug {
        border: 1rpx red solid;
      }
    }

    .btn-share{

      display: inline-flex;
      padding: 6rpx;
      line-height: 32rpx;
      font-size: 24rpx;
      font-weight: 400;
      text-align: center;
    }
  }

  .filter-view {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8rpx;


    @if $debug or $globalDebug {
      border: 2rpx yellow solid;
    }

    .btn-filter{
      position: relative;
      display: inline-flex;
      padding: 6rpx;
      line-height: 32rpx;
      font-size: 24rpx;
      font-weight: 400;
      text-align: center;
      //margin: 4rpx;
    }
  }

  .scroll-container{
    overflow: hidden;
    height: calc((100vh) - #{$headContainerHeight});
    display: flex;

    .scroll-container {
      overflow: hidden;
      height: 100%;
      display: flex;

      @if $debug or $globalDebug {
        border: 2rpx blue solid;
      }

      .list-scroll {
        overflow: hidden;
        height: 100%;

        @if $debug or $globalDebug {
          border: 2rpx red solid;
        }
      }
    }
  }

}

</style>
