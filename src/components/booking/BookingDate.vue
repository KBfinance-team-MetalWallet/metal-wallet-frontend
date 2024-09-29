<template>
	<div :class="$style.div">
		<BackHeader />
		<div :class="$style.groupParent">
			<Calender />
			<div :class="$style.groupContainer">
				<ShowTimeInfo
					time="오후 8:00"
					names="유승현, 홍기범, 강찬"
					:rSeats="54"
					:sSeats="51"
				/>
				<ShowTimeInfo
					time="오후 4:00"
					names="박규원, 김지온, 유태율"
					:rSeats="20"
					:sSeats="0"
				/>
			</div>
		</div>
		<MainHeader />
	</div>
</template>

<script>
	import BackHeader from "@/components/BackHeader.vue";
	import Calender from "@/components/booking/Calender.vue";
	import ShowTimeInfo from "@/components/booking/ShowTimeInfo.vue";
	import MainHeader from "@/components/MainHeader.vue";

	export default {
		components: {
			BackHeader,
			Calender,
			MainHeader,
			ShowTimeInfo,
		},
	};
</script>

<style module>
	.div {
		width: 100%;
		position: relative;
		background-color: #fafafa;
		height: 812px;
		overflow: hidden;
		text-align: left;
		font-size: 16px;
		color: #6e6e6e;
		font-family: Roboto;
	}
	.groupParent {
		position: absolute;
		top: 68px;
		left: 16px;
		width: 374px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 58px;
		text-align: center;
		font-size: 25px;
		color: #22222b;
	}
	.groupContainer {
		align-self: stretch;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 15px;
		text-align: left;
		font-size: 19px;
		color: #c54966;
	}
</style>
