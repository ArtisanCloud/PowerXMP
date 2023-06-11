<template>
  <view>
    <web-view :src="awesomeLink" />
  </view>
</template>

<script>
export default {
  name: "px-pano-webview",
  onLoad: function (option) {
    // console.log(option.q)
    if (option.q) {
      const q = decodeURIComponent(option.q);
      // console.log(q)
      this.awesomeLink = q
    }
  },
  data() {
    return {
      awesomeLink: "",
      webviewStyles: {
        progress: {
          color: '#FF3333'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>