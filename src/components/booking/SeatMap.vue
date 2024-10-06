<template>
	<div class="seat-map">
		<div class="section" v-for="(row, rowIndex) in seatLayout" :key="rowIndex">
			<div class="row">
				<div
					v-for="(seat, seatIndex) in row"
					:key="seatIndex"
					:class="[
						'seat',
						seat ? seat.type : '',
						{ selected: seat && seat.selected },
						{ empty: !seat },
						{
							disabled:
								seat && (seat.booked || (!seat.selected && isMaxSelected)),
						},
					]"
					@click="toggleSeat(rowIndex, seatIndex)"
				></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useSeatAvailabilityStore } from "@/stores/seatAvailabilityStore";
	import { mapActions, mapState } from "pinia";

	export default {
		name: "SeatMap",
		data() {
			return {
				seatLayout: [],
				selectedSeats: [],
			};
		},
		computed: {
			// Pinia 스토어의 상태를 가져옵니다.
			...mapState(useSeatAvailabilityStore, ["historyList"]),
			isMaxSelected() {
				return this.selectedSeats.length >= 2;
			},
			scheduleId() {
				// 라우트에서 musical_id 추출
				return Number(this.$route.params.musical_id);
			},
		},
		methods: {
			// Pinia 스토어의 액션을 가져옵니다.
			...mapActions(useSeatAvailabilityStore, [
				"fetchSeatAvailability",
				"getBookedSeats",
			]),
			/**
			 * 좌석 배치를 초기화합니다.
			 * @param {Array} bookedSeats - 예약된 좌석 코드 배열
			 */
			initializeSeats(bookedSeats) {
				const layoutString = `
XXXXOOXOOOOOOOOOOOOOOOXOOXXXX
OOOOOOXOOOOOOOOOOOOOOOXOOOOOO
OOOOOOXOOOOOOOOOOOOOOOXOOOOOO
OOOOOOXOOOOOOOOOOOOOOOXOOOOOO
XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
OOOOOXOOOOOOOOOOOOOOOXOOOOO
OOOOOXOOOOOOOOOOOOOOOXOOOOO
OOOOOXOOOOOOOOOOOOOOOXOOOOO
OOOOOXOOOOOOOOOOOOOOOXOOOOO
OOOOOOXOOOOOOOOOOOOOOOXOOOOOO
OOOOOOXOOOOOOOOOOOOOOOXOOOOOO
OOOOOOXOOOOOOOOOOOOOOOXOOOOOO
OOXOOOOOOOOOOOOOOOXOO
            `.trim();

				const rows = layoutString.split("\n");
				const layout = [];
				let seatId = 1;

				const rSeatsCount = 100;
				const sSeatsCount = 100;
				const aSeatsCount = 100;

				let seatTypeCounts = {
					R: rSeatsCount,
					S: sSeatsCount,
					A: aSeatsCount,
				};

				const seatTypes = ["R", "S", "A"];
				let seatTypeNumbers = { R: 1, S: 1, A: 1 }; // 초기값을 1로 설정

				for (let row of rows) {
					const seats = [];
					for (let char of row) {
						if (char === "O") {
							let seatType = seatTypes.find((type) => seatTypeCounts[type] > 0);
							if (!seatType) {
								seats.push(null);
								continue;
							}
							seatTypeCounts[seatType]--;
							const seatNumber = seatTypeNumbers[seatType];
							seatTypeNumbers[seatType]++;
							const seatCode = `${seatType}${seatNumber}`; // 예: R1, S1

							seats.push({
								id: seatId++,
								type: seatType,
								number: seatNumber,
								seatCode: seatCode, // seatCode 추가
								selected: false,
								booked: bookedSeats.includes(seatCode), // 예매된 좌석인지 확인
							});
						} else {
							seats.push(null); // 빈 공간
						}
					}
					layout.push(seats);
				}
				this.seatLayout = layout;
			},
			/**
			 * 특정 좌석의 선택 상태를 토글합니다.
			 * @param {Number} rowIndex - 좌석이 속한 행의 인덱스
			 * @param {Number} seatIndex - 행 내 좌석의 인덱스
			 */
			toggleSeat(rowIndex, seatIndex) {
				const seat = this.seatLayout[rowIndex][seatIndex];
				if (!seat || seat.booked) return; // 빈 좌석은 무시

				console.log(seat.seatCode); // 좌석 코드 출력

				if (seat.selected) {
					// 이미 선택된 좌석은 자유롭게 해제 가능
					seat.selected = false;
					this.updateSelectedSeats();
				} else {
					if (this.isMaxSelected) {
						alert("2매 이상은 예약이 불가합니다.");
						return;
					}
					// 최대 선택 수 미달일 경우 좌석 선택 가능
					seat.selected = true;
					this.updateSelectedSeats();
				}
			},
			/**
			 * 선택된 좌석 목록을 업데이트합니다.
			 */
			updateSelectedSeats() {
				const selected = [];
				this.seatLayout.forEach((row) => {
					row.forEach((seat) => {
						if (seat && seat.selected) {
							selected.push(seat);
						}
					});
				});
				this.selectedSeats = selected;
				this.$emit("update-seats", this.selectedSeats); // 선택된 좌석 정보를 부모 컴포넌트로 전달
			},
			/**
			 * 좌석 배치를 초기화합니다.
			 */
			resetSeatMap() {
				const bookedSeats = this.getBookedSeats(this.scheduleId);
				this.initializeSeats(bookedSeats); // 좌석 배치 초기화
				this.selectedSeats = [];
				this.$emit("update-seats", this.selectedSeats);
				console.log("resetSeatMap 실행");
			},
			/**
			 * 좌석 가용성 데이터를 가져와 좌석 배치를 초기화합니다.
			 */
			async fetchAndInitialize() {
				// scheduleId가 1일 때, 날짜를 '2024-10-01'로 설정
				const scheduleId = 1;
				const dateStr = "2024-10-01"; // scheduleId=1에 해당하는 날짜
				const date = new Date(dateStr);
				await this.fetchSeatAvailability(scheduleId, date);
				const bookedSeats = this.getBookedSeats(scheduleId);
				this.initializeSeats(bookedSeats);
			},
		},
		created() {
			this.fetchAndInitialize();
		},
	};
</script>

<style scoped>
	.seat-map {
		position: absolute;
		top: 300px;
		width: 375px;
		margin: 0 auto;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
			Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	}

	.row {
		display: flex;
		justify-content: center;
	}

	.seat {
		width: 10px;
		height: 10px;
		margin: 1px;
		background-color: #e0e0e0;
		border-radius: 2px;
		cursor: pointer;
	}

	.seat.R {
		background-color: #e47f96;
		/* Gold */
	}

	.seat.S {
		background-color: #babc72;
		/* Silver */
	}

	.seat.A {
		background-color: #8398ca;
		/* Bronze */
	}

	.seat.selected {
		background-color: red !important;
	}

	.seat.empty {
		visibility: hidden;
	}

	.seat.disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}
</style>
