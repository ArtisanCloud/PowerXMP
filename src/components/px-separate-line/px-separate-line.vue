<template>

  <view :style="cssProps" class="hr-solid"></view>

</template>

<script>
export default {
  name: "px-separate-line",
  props: {
    title: String,
    width: String,
    height: String,
  },
  computed: {
    cssProps() {
      return {
        '--width': this.width,
        '--height': this.height,

      }
    }
  }
}
</script>

<style lang="scss" scoped>

.hr-solid {
  width: var(--width);
  height: var(--height);
  border: 0;
  border-top: 1px solid #d0d0d5;
}

</style>