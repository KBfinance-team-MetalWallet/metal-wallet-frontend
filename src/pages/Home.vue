<template>
	<div :class="$style.div">
		<MainHeader />
		<div :class="$style.groupParent">
			<div :class="$style.contentWrapper">
				<FlipAccount
					:accounts="accountStore.accounts"
					v-if="!accountStore.isLoading"
				/>
				<MusicalTop10 />
				<SlidePoster />
			</div>
		</div>
		<!-- Footer -->
		<Footer />
	</div>
</template>

<script>
	import Footer from "@/components/Footer.vue";
	import MainHeader from "@/components/MainHeader.vue";
	import FlipAccount from "@/components/home/FlipAccount.vue";
	import MusicalTop10 from "@/components/home/MusicalTop10.vue";
	import SlidePoster from "@/components/home/SlidePoster.vue";
	import { useAccountStore } from "@/stores/accounts";
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "Home",
		components: {
			Footer,
			MainHeader,
			FlipAccount,
			MusicalTop10,
			SlidePoster,
		},
		setup() {
			const accountStore = useAccountStore();
			accountStore.fetchAccounts();

			return {
				accountStore,
			};
		},
	});
</script>
<style module>
	@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

	body {
		margin: 0;
		line-height: normal;
		overflow-x: hidden; /* Prevent horizontal scrolling on the body */
	}

	.div {
		width: 100%;
		position: relative;
		background-color: #fafafa;
		min-height: 100vh;
		text-align: left;
		font-size: 16px;
		color: #c54966;
		font-family: Roboto;
	}

	.groupParent {
		width: 100%;
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		position: relative;
		text-align: left;
		font-size: 14px;
		color: #000;
		font-family: Inter;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
