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
						{ disabled: seat && !seat.selected && isMaxSelected },
					]"
					@click="toggleSeat(rowIndex, seatIndex)"
				></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "SeatMap",
		data() {
			return {
				seatLayout: [],
				selectedSeats: [],
			};
		},
		created() {
			/**
			 * 현재 선택된 좌석이 최대 개수에 도달했는지 여부를 반환합니다.
			 * @returns {Boolean} 최대 선택 여부
			 */
			this.initializeSeats();
		},
		computed: {
			/**
			 * 현재 선택된 좌석이 최대 개수에 도달했는지 여부를 반환합니다.
			 * @returns {Boolean} 최대 선택 여부
			 */
			isMaxSelected() {
				return this.selectedSeats.length >= 2;
			},
		},
		methods: {
			initializeSeats() {
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
				const seatLayout = [];
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
				let seatTypeNumbers = { R: 0, S: 0, A: 0 };

				for (let row of rows) {
					const seats = [];
					for (let char of row) {
						if (char === "O") {
							let seatType = seatTypes.find((type) => seatTypeCounts[type] > 0);
							seatTypeCounts[seatType]--;
							seats.push({
								id: seatId++,
								type: seatType,
								number: seatTypeNumbers[seatType]++,
								selected: false,
							});
						} else {
							seats.push(null); // 빈 공간
						}
					}
					seatLayout.push(seats);
				}
				this.seatLayout = seatLayout;
			},
			/**
			 * 특정 좌석의 선택 상태를 토글합니다.
			 * @param {Number} rowIndex - 좌석이 속한 행의 인덱스
			 * @param {Number} seatIndex - 행 내 좌석의 인덱스
			 */
			toggleSeat(rowIndex, seatIndex) {
				const seat = this.seatLayout[rowIndex][seatIndex];
				if (!seat) return; // 빈 좌석은 무시

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
			updateSelectedSeats() {
				const selectedSeats = [];
				for (let row of this.seatLayout) {
					for (let seat of row) {
						if (seat && seat.selected) {
							selectedSeats.push(seat);
							console.log(selectedSeats);
						}
					}
				}
				this.selectedSeats = selectedSeats;
				this.$emit("update-seats", selectedSeats); // 선택된 좌석 정보를 부모 컴포넌트로 전달
			},
			resetSeatMap() {
				this.initializeSeats(); // 좌석 배치 초기화
				this.selectedSeats = [];
				this.$emit("update-seats", this.selectedSeats);
				console.log("resetSeatMap 실행");
			},
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
