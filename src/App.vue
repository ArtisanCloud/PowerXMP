<script setup lang="ts">
import {onLaunch, onShow, onHide, getSsrGlobalData} from "@dcloudio/uni-app";
import {isAuthorized, isLogin} from "@/utils/auth";
import {inject} from 'vue';

const $api = inject('$api');

onLaunch(async () => {
  console.log("App Launch");

  // console.log($api)

});

onShow(async () => {
  console.log("App Show");
  // 是否登录
  if (!isLogin()) {
    uni.navigateTo({
      url: 'pages/login/login',
    })
  }

});
onHide(() => {
  console.log("App Hide");
});

</script>
<style></style>
