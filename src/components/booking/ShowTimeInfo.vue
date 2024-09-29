<template>
	<div :class="$style.groupWrapper">
		<div :class="$style.group">
			<div :class="$style.div3">{{ time }}</div>
			<div :class="$style.button">
				<div :class="$style.div4">선택</div>
				<img
					:class="$style.arrow_right2"
					src="@/assets/booking/arrow-right.png"
				/>
			</div>
			<div :class="$style.container">
				<div :class="$style.backgroundhorizontalborder">
					<div :class="$style.div5">{{ names }}</div>
					<div :class="$style.list2">
						<div :class="$style.item8">
							<div :class="$style.container1">
								<div :class="$style.r">R석</div>
							</div>
							<div :class="$style.container2">
								<div :class="$style.div6">{{ rSeats }}석</div>
							</div>
						</div>
						<div :class="$style.item9">
							<div :class="$style.container1">
								<div :class="$style.r">S석</div>
							</div>
							<div :class="$style.container2">
								<div :class="$style.div7">{{ sSeats }}석</div>
							</div>
						</div>
					</div>
				</div>
				<div :class="$style.imageIcon">
					<ReservationWait />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			time: String,
			names: String,
			rSeats: Number,
			sSeats: Number,
		},
	};
</script>

<style module>
	.groupWrapper {
		width: 370px;
		position: relative;
		height: 149.6px;
	}
	.group {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 370px;
		height: 149.6px;
	}
	.div3 {
		position: absolute;
		top: 10px;
		left: 10px;
		line-height: 14px;
	}
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0px;
		right: 5px;
		border-radius: 15px;
		background-color: #c54966;
		width: 88px;
		height: 30px;
		overflow: hidden;
		font-size: 15px;
		color: #fff;
	}
	.arrow_right2 {
		box-sizing: border-box;
		width: 16px;
		height: 16px;
		filter: brightness(0) invert(1); /* This will turn black to white */
	}
	.container {
		position: absolute;
		width: 100%;
		top: 37px;
		right: 0px;
		left: 0px;
		height: 112.6px;
		overflow: hidden;
		font-size: 13px;
		color: #666;
	}
	.backgroundhorizontalborder {
		position: absolute;
		width: 100%;
		top: 0px;
		right: 0px;
		left: 0px;
		background-color: #f8f8f8;
		border-top: 1px solid #c54966;
		box-sizing: border-box;
		height: 71.6px;
	}
	.div5 {
		position: absolute;
		top: 16px;
		left: 10px;
		line-height: 14px;
	}
	.list2 {
		position: absolute;
		width: calc(100% - 20px);
		top: 32px;
		right: 10px;
		left: 10px;
		height: 27.6px;
		font-size: 12.9px;
	}
	.item8,
	.item9 {
		position: absolute;
		width: 46%;
		border-bottom: 1px solid #dedede;
		box-sizing: border-box;
		height: 27.6px;
	}
	.item8 {
		right: 54%;
	}
	.item9 {
		right: 1%;
	}
	.container1 {
		position: absolute;
		width: 70%;
		top: 9px;
		right: 30%;
		left: 0%;
		height: 15.6px;
		overflow: hidden;
	}
	.container2 {
		position: absolute;
		width: 30%;
		top: 9px;
		right: 0.01%;
		left: 69.99%;
		height: 15.6px;
		overflow: hidden;
		text-align: right;
		font-size: 13px;
		color: #ff322e;
	}
	.r {
		position: absolute;
		top: -1px;
		left: 0px;
		line-height: 15.6px;
	}
	.div6,
	.div7 {
		position: absolute;
		top: -1px;
		line-height: 15.6px;
	}
	.imageIcon {
		top: calc(50% + 18px);
		width: 40%;
		height: 20px;
		object-fit: cover;
	}
</style>
