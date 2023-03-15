<template>
  <view class="home">

    <px-cover></px-cover>
    <px-show-room class="showroom"></px-show-room>

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
//$debug: true;

page {
  display: flex;
  height: 100%;
}

.home {
  display: flex;
  flex-direction: column;
  flex: 1;
  @if $debug or $globalDebug {
    border: 5rpx pink solid;
  }

}

.showroom {
  overflow: hidden;
  height: 100%;
  @if $debug or $globalDebug {
    border: 5rpx blue solid;
  }
}


</style>
