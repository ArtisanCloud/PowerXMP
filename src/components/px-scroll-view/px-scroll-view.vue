<template>
  <view class="content">
    <view class="scroll-container">
      <scroll-view class="list-scroll" scroll-y>
        <view>
          <slot></slot>
        </view>
      </scroll-view>
    </view>
  </view>

</template>

<script>
export default {
  name: "px-scroll-view"
}
</script>

<style lang="scss" scoped>
$debug: false;
//$debug: true;

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
  @if $debug or $globalDebug {
    border: 1rpx red solid;
  }

  .scroll-container {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
    height: 100%;

    @if $debug or $globalDebug {
      border: 5rpx yellow solid;
    }

    .list-scroll {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}


</style>