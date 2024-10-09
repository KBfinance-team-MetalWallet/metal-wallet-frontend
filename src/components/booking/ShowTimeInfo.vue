<!-- components/booking/ShowTimeInfo.vue -->
<template>
	<div :class="$style.groupWrapper">
		<div :class="$style.group">
			<div :class="$style.div2">{{ time }}</div>
			<div :class="$style.button" @click="handleSelect">
				<div :class="$style.div3">선택</div>
				<div :class="$style.border" />
			</div>
			<div :class="$style.container">
				<div :class="$style.backgroundhorizontalborder">
					<div :class="$style.div4">{{ formattedNames }}</div>
					<div :class="$style.list2">
						<div :class="$style.item8">
							<div :class="$style.container1">
								<div :class="$style.r">R석</div>
							</div>
							<div :class="$style.container2">
								<div :class="$style.div5">{{ rSeats }}석</div>
							</div>
						</div>
						<div :class="$style.item9">
							<div :class="$style.container1">
								<div :class="$style.r">S석</div>
							</div>
							<div :class="$style.container2">
								<div :class="$style.div6">{{ sSeats }}석</div>
							</div>
						</div>
						<div :class="$style.item10">
							<div :class="$style.container1">
								<div :class="$style.r">A석</div>
							</div>
							<div :class="$style.container2">
								<div :class="$style.div7">{{ aSeats }}석</div>
							</div>
						</div>
					</div>
				</div>
				<div :class="$style.waiting">
					<img
						:class="$style.imageIcon"
						alt="예매 아이콘"
						src="@/assets/booking/wait-icon.png"
					/>
					<div :class="$style.div8">예매대기 신청</div>
					<img
						:class="$style.border1"
						alt="예매 아이콘"
						src="@/assets/booking/arrow-right.png"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			time: {
				type: String,
				required: true,
			},
			names: {
				type: Array,
				required: true,
				validator: (value) => {
					return value.every((name) => typeof name === "string");
				},
			},
			rSeats: {
				type: Number,
				required: true,
			},
			sSeats: {
				type: Number,
				required: true,
			},
			aSeats: {
				type: Number,
				required: true,
			},
			musicalId: {
				type: Number,
				required: true,
			},
			scheduleId: {
				type: Number,
				required: true,
			},
		},
		computed: {
			formattedNames() {
				return this.names.join(", ");
			},
		},
		methods: {
			handleSelect() {
				// 선택된 일정에 좌석 선택 페이지로 이동
				this.$router.push({
					name: "seats",
					params: { musicalId: this.musicalId, scheduleId: this.scheduleId },
				});
			},
		},
	};
</script>

<style module>
	.groupWrapper {
		border-radius: 10px;
		width: 350px;
		position: relative;
		height: 160px;
		padding: 10px;
	}

	.group {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}

	.div2 {
		position: absolute;
		top: 10px;
		left: 10px;
		line-height: 14px;
	}

	.button {
		position: absolute;
		top: 0px;
		right: 0px;
		border-radius: 15px;
		background-color: #c54966;
		width: 88px;
		height: 30px;
		overflow: hidden;
		font-size: 15px;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	/* "선택" 텍스트 */
	.div3 {
		position: relative;
		right: 4px;
		line-height: 30px;
	}
	/* "선택" 옆 ">" 텍스트 */
	.border {
		position: absolute;
		top: 9px;
		font-weight: bold;
		right: 20px;
		border-top: 1px solid #fff;
		border-right: 1px solid #fff;
		box-sizing: border-box;
		width: 8px;
		height: 8px;
		transform: rotate(45deg);
		transform-origin: 0 0;
	}

	.container {
		position: absolute;
		width: 100%;
		top: 37px;
		right: 0px;
		left: 0px;
		height: 112.6px;
		/* overflow: hidden; */
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
		/* height: auto; */
	}

	.div4 {
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
	.item9,
	.item10 {
		display: flex;
		justify-content: space-around;
		position: absolute;
		width: 46%;
		height: 27.6px;
		border-bottom: 1px solid #dedede;
		box-sizing: border-box;
	}

	.item8 {
		right: 54%;
		left: 0%;
	}

	.item9 {
		right: 1%;
		left: 53%;
	}
	/* a석 */
	.item10 {
		top: 30px;
		right: 1%;
		left: 53%;
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

	.waiting {
		position: relative;
		top: 100px;
		display: flex;
		gap: 5px;
		height: auto;
	}
	.imageIcon {
		width: 16px;
		height: 16px;
		object-fit: cover;
	}

	.button1 {
		width: 100%;
		padding: 0px;
		color: #333;
		cursor: pointer;
		background-color: transparent;
	}
	.div5,
	.div6 {
		position: absolute;
		top: -1px;
		left: 10px;
		line-height: 15.6px;
	}

	.div7 {
		position: relative;
		line-height: 18px;
		height: auto;
	}

	.div8 {
		position: relative;
		line-height: 18px;
		height: auto;
	}

	.border1 {
		width: 16px;
		height: 16px;
	}
</style>
