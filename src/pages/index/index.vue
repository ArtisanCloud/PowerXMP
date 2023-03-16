<template>
  <view class="home">

    <px-cover></px-cover>
    <px-show-room class="showroom"></px-show-room>

  </view>
</template>

<script lang="ts">


export default {
  data() {

    return {
      title: '小裂匠',
    }
  },

  methods: {

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
