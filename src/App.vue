<script setup lang="ts">
import {onLaunch, onShow, onHide} from "@dcloudio/uni-app";
import {inject} from 'vue';
import {SetDeviceSystemInfo} from "@/utils/device";
import {SetLaunchCacheInfo, SetSceneData} from "@/utils/cachedData";
import {CheckLoginAuth} from "@/utils/auth";

const $api = inject('$api');

/**
 * 小程序初始化
 */
onLaunch(async (params) => {
  console.log("App Launch");
  console.log(params);


  // console.log($api)

});


/**
 * 小程序页面显示
 */
onShow(async (params) => {
  console.log("App Show");
  console.log(params);

  // 登录授权
  CheckLoginAuth($api)

  // 设置设备信息
  SetDeviceSystemInfo();

  // 参数处理+缓存
  SetLaunchCacheInfo(params);

  // 场景值
  SetSceneData(params);

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
