<template>
  <view class="home">

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

</style>
