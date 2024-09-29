<template>
	<div :class="$style.groupWrapper">
		<div :class="$style.parent">
			<div :class="$style.time">{{ time }}</div>
			<div :class="$style.button">
				<div :class="$style.selectButton">선택</div>
				<div :class="$style.border" />
			</div>
			<div :class="$style.container">
				<div :class="$style.backgroundHorizontalBorder">
					<div :class="$style.participants">{{ participants }}</div>
					<div :class="$style.list">
						<div
							v-for="(seat, index) in seats"
							:key="index"
							:class="$style.item"
						>
							<div :class="$style.seatType">{{ seat.type }}</div>
							<div :class="$style.seatNumber">{{ seat.number }}</div>
						</div>
					</div>
				</div>
				<div :class="$style.icon">
					<!-- Placeholder div 대신 원하는 내용 추가 -->
					<div :class="$style.divPlaceholder"></div>
				</div>
				<div :class="$style.buttonAction">
					<div :class="$style.buttonText">예매대기 신청</div>
					<div :class="$style.border1" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="js">
	import { defineComponent } from 'vue';

	export default defineComponent({
	  name: "BookingItem",
	  props: {
	    time: {
	      type: String,
	      required: true,
	    },
	    participants: {
	      type: String,
	      required: true,
	    },
	    seats: {
	      type: Array,
	      required: true,
	      // 예: [{ type: 'R석', number: '54석' }, { type: 'S석', number: '51석' }]
	    },
	  },
	});
</script>

<style module>
	.groupWrapper {
		width: 370px;
		position: relative;
		height: 149.6px;
	}

	.parent {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 370px;
		height: 149.6px;
	}

	.time {
		position: absolute;
		top: 10px;
		left: 10px;
		line-height: 14px;
		font-size: 16px;
		color: #333;
	}

	.button {
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
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.selectButton {
		/* 선택 버튼 스타일 */
	}

	.border {
		position: absolute;
		top: 10.35px;
		right: 21px;
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
		overflow: hidden;
		font-size: 13px;
		color: #666;
	}

	.backgroundHorizontalBorder {
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

	.participants {
		position: absolute;
		top: 16px;
		left: 10px;
		line-height: 14px;
		font-size: 14px;
		color: #333;
	}

	.list {
		position: absolute;
		width: calc(100% - 20px);
		top: 32px;
		right: 10px;
		left: 10px;
		height: 27.6px;
		font-size: 12.9px;
	}

	.item {
		position: absolute;
		width: 46%;
		top: 0px;
		right: 54%;
		left: 0%;
		border-bottom: 1px solid #dedede;
		box-sizing: border-box;
		height: 27.6px;
	}

	.seatType {
		position: absolute;
		top: -1px;
		left: 0px;
		line-height: 15.6px;
		font-weight: bold;
	}

	.seatNumber {
		position: absolute;
		top: -1px;
		left: 21.12px;
		line-height: 15.6px;
		color: #ff322e;
		font-size: 13px;
		text-align: right;
	}

	.icon {
		position: absolute;
		top: calc(50% + 23.38px);
		left: 11px;
		width: 16px;
		height: 16px;
		background-color: #ccc; /* 임시 배경색 */
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.divPlaceholder {
		width: 100%;
		height: 100%;
		/* 추가 스타일 */
	}

	.buttonAction {
		position: absolute;
		top: 79.6px;
		left: 31px;
		width: 79.1px;
		height: 16px;
		color: #333;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.buttonText {
		/* 예매대기 신청 텍스트 스타일 */
	}

	.border1 {
		position: absolute;
		top: calc(50% - 5.58px);
		left: 76.06px;
		border-top: 1px solid #666;
		border-right: 1px solid #666;
		box-sizing: border-box;
		width: 8px;
		height: 8px;
		transform: rotate(45deg);
		transform-origin: 0 0;
	}
</style>
