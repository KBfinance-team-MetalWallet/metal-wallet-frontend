<template>
	<div :class="$style.mainHeader">
		<Icon icon="solar:wallet-outline" :class="$style.solarwalletOutlineIcon" />
		<b :class="$style.b">강철지갑</b>
	</div>
</template>

<script lang="ts">
	import { Icon } from "@iconify/vue/dist/iconify.js";
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "BackHeader",
		components: {
			Icon,
		},
		data() {
			return {};
		},
	});
</script>

<style module>
	.mainHeader {
		display: flex;
		justify-content: start;
		align-items: center;
		width: 100%;
		gap: 4px;
	}
	.solarwalletOutlineIcon {
		width: 24px;
		height: 24px;
	}
	.b {
		color: #6e6e6e;
	}
</style>
