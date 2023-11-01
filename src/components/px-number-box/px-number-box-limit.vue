<template>
	<view style="display: flex">
		<view class="uni-numbox">
			<view class="uni-numbox-minus"
						@click="_calcValue('subtract')"
			>
				<text class="yticon icon--jianhao" :class="minDisabled?'uni-numbox-disabled': ''"></text>
			</view>
			<input
				class="uni-numbox-value"
				type="number"
				:disabled="setting.disabled"
				:value="inputValue"

				@blur="_onBlur"
			>
			<view
				class="uni-numbox-plus"
				@click="_calcValue('add')"
			>
				<text class="yticon icon-jia2" :class="maxDisabled?'uni-numbox-disabled': ''"></text>
			</view>
		</view>

		<!--		<view @click="contactQRCode" v-if="maxDisabled" class="uni-contact-us">-->
		<view v-if="maxDisabled" class="uni-contact-us">
			<button open-type="contact">
				<uni-icons class="uni-contact-us-icon" size="30" type="chatboxes-filled" ></uni-icons>
			</button>
		</view>
		<!--		<uni-popup ref="refPopup" :mask-click="false">-->
		<!--			<view>-->
		<!--				<image style="width:320px; height:320px" src="/static/images/contact-us-qr.jpg"></image>-->
		<!--				<button @click="contactClose">关闭</button>-->
		<!--			</view>-->
		<!--		</uni-popup>-->
	</view>
</template>

<script setup lang="ts">

import {ref, watch, reactive} from 'vue';
import {onShow} from "@dcloudio/uni-app";

const emits = defineEmits(['eventChange']);


interface Props {
	isMax: boolean;
	isMin: boolean;
	index: number;
	value: number;
	min: number;
	max: number;
	step: number;
	disabled: boolean;
}


const props = defineProps({
	isMax: {
		type: Boolean,
		default: false,
	},
	isMin: {
		type: Boolean,
		default: false,
	},
	index: {
		type: Number,
		default: 0,
	},
	value: {
		type: Number,
		default: 0,
	},
	min: {
		type: Number,
		default: -Infinity,
	},
	max: {
		type: Number,
		default: Infinity,
	},
	step: {
		type: Number,
		default: 1,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});

const setting = reactive({
	isMax: props.isMax,
	isMin: props.isMin,
	index: props.index,
	value: props.value,
	min: props.min,
	max: props.max,
	step: props.step,
	disabled: props.disabled,
} as Props);

const inputValue = ref<number>(setting.value);
const minDisabled = ref<boolean>(false);
const maxDisabled = ref<boolean>(false);

const refPopup = ref()

watch(inputValue, (number) => {
	const data = {
		number: number,
		index: setting.index,
	};
	emits('eventChange', data);
});

const contactQRCode = () => {
	refPopup.value.open('center')
}

const contactClose = () => {
	refPopup.value.close()
	// console.log('close');
}

const _calcValue = (type: 'subtract' | 'add') => {
	const scale = _getDecimalScale();
	let value = inputValue.value * scale;
	let newValue = 0;
	let step = setting.step * scale;

	if (type === 'subtract') {
		newValue = value - step;
		if (newValue <= setting.min) {
			minDisabled.value = true;
		}
		if (newValue < setting.min) {
			newValue = setting.min;
		}
		if (newValue < setting.max && maxDisabled.value === true) {
			maxDisabled.value = false;
		}
	} else if (type === 'add') {
		newValue = value + step;
		if (newValue >= setting.max) {
			maxDisabled.value = true;
		}
		if (newValue > setting.max) {
			newValue = setting.max;
		}
		if (newValue > setting.min && minDisabled.value === true) {
			minDisabled.value = false;
		}
	}
	if (newValue === value) {
		return;
	}
	inputValue.value = newValue / scale;
};

const _getDecimalScale = () => {
	let scale = 1;
	// Floating point type
	if (~~setting.step !== setting.step) {
		scale = Math.pow(10, (setting.step + '').split('.')[1].length);
	}
	return scale;
};

const _onBlur = (event: any) => {
	let value = event.detail.value;
	if (!value) {
		inputValue.value = 0;
		return;
	}
	value = +value;
	if (value > setting.max) {
		value = setting.max;
	} else if (value < setting.min) {
		value = setting.min;
	}
	inputValue.value = value;
};


</script>

<style lang="scss">
@import './index.css';
</style>

