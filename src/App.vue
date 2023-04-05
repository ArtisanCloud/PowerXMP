<script setup lang="ts">
import {onLaunch, onShow, onHide} from "@dcloudio/uni-app";
import {checkLoginAuth} from "@/utils/auth";
import {inject} from 'vue';

const $api = inject('$api');

onLaunch(async () => {
  console.log("App Launch");

  // console.log($api)

});

onShow(async () => {
  console.log("App Show");
  // 是否登录

  checkLoginAuth($api)

});
onHide(() => {
  console.log("App Hide");
});


</script>

<script lang="ts">
export default {
  globalData: {
    // 场景值
    cache_scene_key: "cache_scene_key"
  }
}

</script>

<style></style>
