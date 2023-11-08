<template>
  <uni-popup id="privacy" type="center" ref="privacyPopup" :maskClick="false">
    <view class="ws-privacy-popup" :style="rootStyle">
      <view class="ws-privacy-popup__header">
        <!--标题-->
        <view class="ws-picker__title">{{ title }}</view>
      </view>
      <view class="ws-privacy-popup__container">
        <text>{{ desc }}</text>
        <text class="ws-privacy-popup__container-protocol" :style="protocolStyle"
              @click="openPrivacyContract">{{ privacyContractName||protocol }}</text>
        <text>{{ subDesc }}</text>
      </view>
      <view class="ws-privacy-popup__footer">
        <button class="is-agree" :style="agreeStyle" id="agree-btn" open-type="agreePrivacyAuthorization"
                @agreeprivacyauthorization="handleAgree">
          {{agreeText}}
        </button>
        <button class="is-disagree" id="disagree-btn" @click="handleDisagree">
          {{disagreeText}}
        </button>
      </view>
    </view>
  </uni-popup>
<!--  <uni-popup :mask-click="false" zIndex="11112"  ref="privacyPopup" round="12" :show="innerShow" mode="center" >-->
<!--    <view class="ws-privacy-popup" :style="rootStyle">-->
<!--      <view class="ws-privacy-popup__header">-->
<!--        &lt;!&ndash;标题&ndash;&gt;-->
<!--        <view class="ws-picker__title">{{ title }}</view>-->
<!--      </view>-->
<!--      <view class="ws-privacy-popup__container">-->
<!--        <text>{{ desc }}</text>-->
<!--        <text class="ws-privacy-popup__container-protocol" :style="protocolStyle"-->
<!--              @click="openPrivacyContract">{{ privacyContractName||protocol }}</text>-->
<!--        <text>{{ subDesc }}</text>-->
<!--      </view>-->
<!--      <view class="ws-privacy-popup__footer">-->
<!--        <button class="is-agree" :style="agreeStyle" id="agree-btn" open-type="agreePrivacyAuthorization"-->
<!--                @agreeprivacyauthorization="handleAgree">-->
<!--          {{agreeText}}-->
<!--        </button>-->
<!--        <button class="is-disagree" id="disagree-btn" @click="handleDisagree">-->
<!--          {{disagreeText}}-->
<!--        </button>-->
<!--      </view>-->
<!--    </view>-->
<!--  </uni-popup>-->
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getComponent, getContext } from '@/components/ws-wx-privacy/util';

const privacyResolves = new Set<Function>(); // onNeedPrivacyAuthorization的reslove

let privacyHandler: ((resolve: Function) => void) | null = null;

const title = ref('用户隐私保护提示123');
const desc = ref('感谢您使用本应用，您使用本应用的服务之前请仔细阅读并同意');
const protocol = ref('《用户隐私保护指引》');
const enableAutoProtocol = ref(false);
const subDesc = ref(
	'。当您点击同意并开始使用产品服务时，即表示你已理解并同意该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法使用相应服务。'
);
const disagreeEnabled = ref(true);
const disagreePromptText = ref('请先仔细阅读并同意隐私协议');
const disagreeText = ref('不同意');
const agreeText = ref('同意并继续');
const bgColor = ref('');
const themeColor = ref('');

const privacyContractName = ref('');
const innerShow = ref(true);

const rootStyle = computed(() => {
	if (bgColor.value) {
		return `background:${bgColor.value}`;
	} else {
		return '';
	}
});

const protocolStyle = computed(() => {
	if (themeColor.value) {
		return `color:${themeColor.value}`;
	} else {
		return '';
	}
});

const agreeStyle = computed(() => {
	if (themeColor.value) {
		return `background:${themeColor.value}`;
	} else {
		return '';
	}
});

onMounted(() => {
	privacyHandler = (resolve: Function) => {
		const context = getContext();
		const privacyPopup = getComponent(context, '#privacy-popup');
		if (privacyPopup) {
			const privacy = getComponent(privacyPopup, '#privacy');
			if (privacy && privacy.open) {
				privacy.open();
			}
		}
		privacyResolves.add(resolve);
	};
	if (enableAutoProtocol.value && uni.getPrivacySetting) {
		uni.getPrivacySetting({
			success: (res: any) => {
				if (res.privacyContractName) {
					privacyContractName.value = res.privacyContractName;
				}
			},
			fail: () => {},
			complete: () => {},
		});
	}
});

const openPrivacyContract = () => {
	wx.openPrivacyContract({
		success: (res: any) => {
			console.log('openPrivacyContract success');
		},
		fail: (res: any) => {
			console.error('openPrivacyContract fail', res);
		},
	});
};

const handleDisagree = () => {
	if (disagreeEnabled.value) {
		innerShow.value = false;
		privacyResolves.forEach((resolve) => {
			resolve({
				event: 'disagree',
			});
		});
		privacyResolves.clear();
		// @ts-ignore
		emit('disagree');
	} else {
		uni.showToast({
			icon: 'none',
			title: disagreePromptText.value,
		});
	}
};

const handleAgree = () => {
	innerShow.value = false;
	privacyResolves.forEach((resolve) => {
		resolve({
			event: 'agree',
			buttonId: 'agree-btn',
		});
	});
	privacyResolves.clear();
	// @ts-ignore
	emit('agree');
};
</script>

<style lang="scss" scoped>
.ws-privacy-popup {
  padding: 48rpx;
  box-sizing: border-box;
  overflow: hidden;
  width: 560rpx;
  background: linear-gradient(180deg, #e5edff 0%, #ffffff 100%);
  border-radius: 24rpx;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 52rpx;
    font-size: 36rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 550;
    color: #1a1a1a;
    line-height: 52rpx;
    margin-bottom: 48rpx;
  }

  &__container {
    width: 100%;
    box-sizing: border-box;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 48rpx;
    margin-bottom: 48rpx;

    &-protocol {
      font-weight: 550;
      color: #4D80F0;
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;

    .is-disagree,
    .is-agree {
      width: 100%;
      height: 88rpx;
      background: #ffffff;
      border-radius: 44rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }

    .is-agree {
      background: #4D80F0;
      color: #ffffff;
      margin-bottom: 18rpx;
    }

    button {
      border: none;
      outline: none;

      &::after {
        border: none;
      }
    }
  }
}
</style>
