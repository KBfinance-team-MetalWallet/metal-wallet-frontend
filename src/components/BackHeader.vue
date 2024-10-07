<template>
	<div :class="$style.weuibackFilledParent">
		<img :class="$style.weuibackFilledIcon" alt="뒤로가기" :src="backIcon" />
		<b :class="$style.b">뒤로가기</b>
	</div>
</template>

<script lang="js">
	import backIcon from "@/assets/mypages/backIcon.svg";
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "BackHeader",
		data() {
			return {
				backIcon,
			};
		},
	});
</script>

<style module>
	.weuibackFilledIcon {
		position: absolute;
		left: 0px;
		width: 11px;
		height: 22px;
		overflow: hidden;
	}

	.b {
		position: absolute;
		left: 18px;
	}

	.weuibackFilledParent {
		display: flex;
		align-items: center;
		position: absolute;
		top: 16px;
		left: 14px;
		width: 82px;
		height: 22px;
		font-size: 16px;
		color: #6e6e6e;
	}
</style>
