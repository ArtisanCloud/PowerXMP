<template>
  <view>
    <web-view :webview-styles="webviewStyles" src="{{this.awesomeLink}}"></web-view>
  </view>
</template>

<script>
export default {
  name: "px-pano-webview",
  props:{
    awesomeLink:""
  },
  data() {
    return {
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