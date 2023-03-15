<template>
  <view class="home">
    <px-cover></px-cover>
    <view class="scroll-container">
      <scroll-view class="list-scroll" scroll-y>
        <view>
          <view v-for="item in 100">
            {{ item }}
          </view>
        </view>
      </scroll-view>
    </view>
    <!--    <px-show-room class="showroom"></px-show-room>-->

  </view>
</template>

<script>
export default {
  data() {

    return {
      title: '小裂匠'
    }
  },
  onLoad() {
    this.loadWorkList()
  },
  methods: {
    loadWorkList() {

      // console.log(this.$api)
      this.$api.user.getUserInfo({}).then((res) => {
        console.log(res)
        this.title = JSON.stringify(res)
      })
    }
  }
}
</script>

<style lang="scss">

$debug: false;
$debug: true;

page {
  display: flex;
  height: 100%;
}

.home {
  display: flex;
  flex-direction: column;
  flex: 1;
  //height: 100%;
  @if $debug or $globalDebug {
    border: 5rpx pink solid;
  }

  .scroll-container {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
    //height: calc(100vh);
    //height: calc(100vh - 20rpx);
    //height: calc(100vh - 800rpx); // 它上面如果有其他内容则这样使用，如果没有直接写 100%

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

.showroom {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  //height: 100%;
  @if $debug or $globalDebug {
    border: 5rpx blue solid;
  }
}


</style>
