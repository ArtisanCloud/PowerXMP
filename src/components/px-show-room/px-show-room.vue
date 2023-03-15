<template>
  <view class="content">
    <view class="tab-bar-container">

      <view class="tab-bar" v-for="(item,index) in this.tabList" :key="index">
        <view :id="index" class="tab" :class="currentTab==index ? 'active' : ''" @click="clickTab">{{ item }}</view>
      </view>

      <view class="separate-line">
        <text>|</text>
      </view>
      <view class="filter-view">
        <uni-icons style="margin-right: 2rpx;" type="settings" size="26" color="#666"></uni-icons>
      </view>
    </view>
    <view class="tab-view-container">
      <px-work :style="currentTab!=0 ? 'display:none' : '' "></px-work>
      <px-case :style="currentTab!=1 ? 'display:none' : '' "></px-case>
      <px-brand-info :style="currentTab!=2 ? 'display:none' : '' "></px-brand-info>
    </view>


  </view>

</template>

<script>

export default {
  components: {},
  name: "px-show-room",
  data() {
    return {
      tabList: ['作品', '案例', '品牌介绍'],
      currentTab: 0
    };
  },
  methods: {
    clickTab(e) {
      this.currentTab = e.target.id;
      // console.log(e, this.currentTab)
    }
  }
}
</script>

<style lang="scss">

$debug: false;
//$debug: true;

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  height: 100%;
  @if $debug or $globalDebug {
    border: 1rpx green solid;
  }

  .tab-bar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 24rpx;
    padding-bottom: 8rpx;


    .tab-bar {
      display: flex; // 使用flex一维布局模型
      flex: 10; // 该样式占据整个flex行 的5/7
      justify-content: space-between;
      width: 100%;
      text-align: center;
      color: #888;
      font-size: 32rpx;

      @if $debug or $globalDebug {
        border: 1rpx blue solid;
      }

      .tab {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        min-width: 44rpx;
        line-height: 40rpx;
        font-size: 32rpx;
        color: #8B8D8D;
        margin-right: 14rpx;
        position: relative;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-user-select: none;
        -moz-user-focus: none;
        -moz-user-select: none;
        text-align: center;

      }

      .active {
        font-weight: bold;
        color: #303537;
      }

      .active:after {
        position: absolute;
        left: calc(50% - 8px);
        z-index: 3;
        width: 48rpx;
        height: 2px;
        background: #303537;
        bottom: 0;
        content: " ";
        margin-bottom: -24rpx;
      }
    }

    .separate-line {
      display: flex; // 使用flex一维布局模型
      justify-content: center; // 元素以主轴（横轴）对齐的位置，这里是左右方向
      align-items: center; // 元素以交叉轴（横轴）对齐的位置，这里是上下方向
      flex: 1; // 该样式占据整个flex行 的1/7
      @if $debug or $globalDebug {
        border: 1rpx red solid;
      }
    }

    .filter-view {
      display: flex; // 使用flex一维布局模型
      flex: 1; // 该样式占据整个flex行 的1/7
      align-items: center; // 元素以交叉轴（横轴）对齐的位置，这里是上下方向
      justify-content: center; // 元素以主轴（横轴）对齐的位置，这里是左右方向
      padding-right: 8rpx;
      @if $debug or $globalDebug {
        border: 1rpx blue solid;
      }
    }
  }

  .tab-view-container {
    overflow: hidden;
    height: 100%;

  }

}
</style>
