<script setup lang="ts">
import {onLaunch, onShow, onHide} from "@dcloudio/uni-app";
import {inject} from 'vue';
import {CheckLoginAuth} from "@/utils/auth";

const $api = inject('$api');


/**
 * 小程序初始化
 */
onLaunch(async (params) => {
  console.log("App Launch");
});


/**
 * 小程序页面显示
 */
onShow(async (params) => {
  console.log("App Show");
  // console.log(params);

  // // 登录授权
  // const isLogin = CheckLoginAuth($api)
  // if (!isLogin){
  //   return
  // }

});


onHide(() => {
  console.log("App Hide");
});


</script>

<script lang="ts">
export default {
  globalData: {

  }
}

</script>

<style></style>
