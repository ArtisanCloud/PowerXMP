<template>
  <view class="content">
    <view>

      <uni-search-bar class="search-input" placeholder="关键词" clearButton="auto" cancelButton="none"
                      radius="20" @confirm="Search"/>
    </view>
    <px-scroll-view class="px-scroll-view">

      <view class="list-wrapper">
        <view class="list">
          <view class="list-item" v-for="item in this.workList" @click="showDetail(item)">

            <view>
              <image class="list-item-cover" :src="item.coverURL"></image>
            </view>
            <view class="list-item-profile">
              <text class="list-item-title">{{ item.id }}-{{ item.title }}</text>
              <view class="list-item-viewed-count">
                <uni-icons style="margin-right: 6rpx;" type="eye-filled" size="18" color="#666"></uni-icons>
                {{ item.viewedCount }}
              </view>

            </view>


          </view>
        </view>
      </view>


    </px-scroll-view>

  </view>
</template>

<script lang="ts">


import {MediaType} from "@/common/model/constant";

export default {
  name: "px-work",
  props: {
    workList: Array<Media>
  },
  data() {
    return {}
  },
  methods: {

    showDetail(item: Media) {

      // console.log(item.title)
      if (item.type == MediaType.threeDWork) {
        uni.navigateTo({
          url: "/pages/pano-webview/pano-webview?q=" + item.awesomeLink
        });

      } else {
        uni.navigateTo({
          url: "/pages/pano-webview/pano-webview?q=" + item.awesomeLink
        });
      }
    },

    async Search(e) {
      console.log(e.value)
    },
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
  width: 100%;

  @if $debug or $globalDebug {
    border: 5rpx pink solid;
  }

  .search-input {

    :deep(.uni-searchbar__box-search-input) {
      flex: 1;
      font-size: 14px;
      color: #333;
    }

    :deep(.uni-searchbar__text-placeholder) {
      font-size: 14px;
      color: #B3B3B3;
      margin-left: 5px;
    }
  }

  .px-scroll-view {

    overflow: hidden;
    height: 100%;
    margin: 5rpx;

    .list-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      @if $debug or $globalDebug {
        border: 1rpx green solid;
      }

      .list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        .list-item {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin: 0 5px 20px 0; // 间隙为5px
          align-items: center;
          justify-content: center;


          @if $debug or $globalDebug {
            border: 1rpx green solid;
          }

          .list-item-cover {
            width: 320rpx;
            height: 240rpx;
            border-radius: 4%;
          }

          .list-item-profile {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 5rpx; // 间隙为5px

            font-size: 24rpx;
            width: 80%;
            @if $debug or $globalDebug {
              border: 1rpx red solid;
            }

            .list-item-title {
              width: 70%;
              padding: 2rpx;
              justify-content: right;
              @if $debug or $globalDebug {
                border: 1rpx green solid;
              }
            }

            .list-item-viewed-count {
              display: flex;
              width: 30%;
              padding: 2rpx;
              align-items: center;
              justify-content: center;
              text-align: right;
              @if $debug or $globalDebug {
                border: 1rpx blue solid;
              }
            }


          }

        }
      }
    }
  }


}

</style>
