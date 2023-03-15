<template>
  <view class="content">
    <view>

      <uni-search-bar class="search-input" placeholder="关键词" clearButton="auto" cancelButton="none"
                      @confirm="search"/>
    </view>
    <px-scroll-view style="overflow: hidden;height: 100%">
      <view v-for="item in 100">
        案例 - {{ item }}
      </view>
    </px-scroll-view>

  </view>
</template>

<script>

export default {
  name: "px-work",
  data() {
    return {}
  },
  methods: {}
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
    border: 5rpx pink solid;
  }

  .search-input {
    :deep(.uni-searchbar__box-search-input) {
      flex: 1;
      font-size: 8px;
      color: #333;
    }

    :deep(.uni-searchbar__text-placeholder) {
      font-size: 8px;
      color: #B3B3B3;
      margin-left: 5px;
    }
  }
}

</style>
