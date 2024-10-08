<template>
	<div :class="$style.reservation_wait_button">
		<img
			:class="$style.imageIcon1"
			alt=""
			src="@/assets/booking/wait-icon.png"
		/>
		<div :class="$style.div88"><a :class="$style.div99">예매대기 신청</a></div>
		<img
			:class="$style.arrow_right33"
			src="@/assets/booking/arrow-right.png"
			alt="arrow-left"
		/>
	</div>
</template>

<script lang="js">
	export default {
		name: "ReservationWaitButton",
	};
</script>

<style module>
	.reservation_wait_button {
		width: 100%;
		height: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 6px;
	}
	.imageIcon1 {
		/* width: 100%; */
		width: 16px;
		height: 16px;
	}

	.div88 {
		/* width: 100%; */
		color: white;
		text-align: center;
	}
	.div99 {
		height: 16px;
		width: auto;
		font-size: 12px;
		color: gray;
	}
	.arrow_right33 {
		position: relative;
		top: 1px;
		width: 12px;
		height: 12px;
	}
</style>
