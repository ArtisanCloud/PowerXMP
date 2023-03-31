<template>
  <view class="brand-page">
    <px-scroll-view class="px-scroll-view">

      <uni-section class="brand-container">
        <uni-card class="brand-card" :title="this.brandInfo.name" :extra="this.brandInfo.extra">
          <text>
            {{ this.brandInfo.description }}
          </text>
        </uni-card>

        <uni-card class="team-card" title="团队介绍" extra="明星点将">
          <scroll-view class="px-scroll-view-h" scroll-x="true" @scroll="scroll" scroll-left="120">

            <view v-for="item in this.brandInfo.team" class="scroll-view-item_h ">

              <view class="employee-avatar-container">
                <image class="employee-avatar" :src="item.avatar"></image>
              </view>
              <view class="employee-text">
                <text>{{ item.name }}</text>
                <text>{{ item.position }}</text>

              </view>
            </view>

          </scroll-view>


        </uni-card>

      </uni-section>


    </px-scroll-view>
  </view>
</template>

<script lang="ts">


export default {
  props: {
    brandInfo: {
      name:"",
      extra:""

    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">

$debug: false;
//$debug: true;

.brand-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  overflow: hidden;
  height: 100%;
  width: 100%;

  @if $debug or $globalDebug {
    border: 5rpx pink solid;
  }

  .px-scroll-view {

    overflow: hidden;
    height: 100%;
    margin: 2rpx;

    @if $debug or $globalDebug {
      border: 5rpx blue solid;
    }

    .brand-container {
      display: flex;
      overflow: hidden;
      width: 100%;

      @if $debug or $globalDebug {
        border: 5rpx yellow solid;
      }

      .brand-card {

      }

      .team-card {
        overflow: hidden;
        width: 100%;

        .px-scroll-view-h {
          overflow: hidden;
          //white-space: nowrap;

          .scroll-view-item_h {
            //display: inline-flex;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 8rpx;
            @if $debug or $globalDebug {
              border: 5rpx blue solid;
            }

            .employee-avatar-container {
              flex: 2;

              .employee-avatar {

                width: 128rpx;
                height: 128rpx;
                border-radius: 10%;

              }
            }


            .employee-text {
              flex: 6;
              display: flex;
              flex-direction: column;
              margin-left: 8rpx;
            }
          }
        }
      }
    }


  }
}
</style>
