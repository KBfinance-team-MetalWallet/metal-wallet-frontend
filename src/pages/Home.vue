<template>
	<div :class="$style.div">
		<MainHeader />
		<div :class="$style.groupParent">
			<div :class="$style.contentWrapper">
				<FlipAccount :accounts="accountStore.accounts" v-if="!accountStore.isLoading" />
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

.div {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	position: relative;
	background-color: #fafafa;
	text-align: left;
	font-size: 16px;
	color: #c54966;
	font-family: Roboto;
}

.groupParent {
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow-y: auto;
}

.container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: auto;
}
</style>
