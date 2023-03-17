<template>
  <view class="brand-page">
    <px-scroll-view class="px-scroll-view">

      <uni-section class="brand-card">
        <uni-card title="小裂匠" extra="帮助品牌社交裂变">
          <text>小裂匠这一家专注于提供全面的房地产品牌管理服务的公司，致力于帮助房地产企业塑造并提升品牌形象，提高市场竞争力。我们的团队由一群来自不同领域的专业人士组成，包括市场营销、品牌策划、设计、媒体传播等领域的精英，以及拥有多年行业经验的资深管理者。
            <br /><br />
            我们的公司坚持以客户为中心的经营理念，以满足客户需求为己任，为客户提供个性化、专业化、精准化的品牌服务。我们的服务包括品牌策略规划、品牌形象设计、品牌营销推广、线上线下整合传播等领域，为客户提供一站式品牌管理解决方案。
            <br><br>
            我们的团队拥有丰富的房地产行业经验和卓越的品牌管理能力，在为客户提供品牌服务的同时，我们还积极引进国内外先进的品牌管理理念和技术，不断提升自身服务水平和竞争力。我们坚信，客户的成功就是我们的成功，我们愿意与每一位客户携手共创美好未来！</text>
        </uni-card>
      </uni-section>

      <uni-section class="team-card">
        <uni-card title="团队介绍" extra="团队是">
          <text class="uni-body">这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text>
        </uni-card>
      </uni-section>


    </px-scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.brand-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  overflow: hidden;
  height: 100%;
  width: 100%;

  .px-scroll-view {

    overflow: hidden;
    height: 100%;
    margin: 5rpx;



  }
}
</style>
