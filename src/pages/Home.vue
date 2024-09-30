<template>
	<div :class="$style.div">
		<div :class="$style.groupParent">
			<MainHeader />
			<!-- Use FlipAccount Component -->
			<FlipAccount />
			<!-- Musical Top 10 Section Component -->
			<MusicalTop10 />
		</div>
		<!-- Footer -->
		<Footer></Footer>
	</div>
</template>

<script>
	import Footer from "@/components/Footer.vue";
	import MainHeader from "@/components/MainHeader.vue";
	import FlipAccount from "@/components/home/FlipAccount.vue";
	import MusicalTop10 from "@/components/home/MusicalTop10.vue";

	import { defineComponent } from "vue";

	export default defineComponent({
		name: "Home",
		components: {
			Footer,
			MainHeader,
			FlipAccount,
			MusicalTop10,
		},
	});
</script>
<style module>
	@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

	body {
		margin: 0;
		line-height: normal;
	}

	.groupParent {
		position: relative;
		width: 100%;
		padding: 14px;
	}

	.div {
		width: 100%;
		position: relative;
		background-color: #fafafa;
		min-height: 100vh;
		overflow: hidden;
		text-align: left;
		font-size: 16px;
		color: #c54966;
		font-family: Roboto;
	}

	/* 필요한 추가 스타일이 있다면 여기에 작성하세요 */
</style>
