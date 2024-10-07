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
import axios from "axios";

export default {
  name: "SeatMap",
  data() {
    return {
      seatLayout: [],
      selectedSeats: [],
      availableSeats: {}, // 예매 가능한 좌석
    };
  },
  computed: {
    isMaxSelected() {
      return this.selectedSeats.length >= 2;
    },
    scheduleId() {
      return Number(this.$route.params.scheduleId);
    },
  },
  methods: {
    /**
     * 좌석 배치를 초기화합니다.
     * @param {Array} availableSeats - 가용 좌석 데이터 배열
     */
    initializeSeats(availableSeats) {
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
      let seatTypeNumbers = { R: 1, S: 101, A: 201 }; // 구역 초기 값

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
              seatCode: seatCode,
              selected: false,
              booked: seatCode in availableSeats ? false : true,
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
      if (!seat || seat.booked) return;

      console.log(`Selected seatCode: ${seat.seatCode}`);
      console.log(`Selected seatId: ${this.availableSeats[seat.seatCode]}`);

      if (seat.selected) {
        seat.selected = false;
        this.updateSelectedSeats();
      } else {
        if (this.isMaxSelected) {
          alert("2매 이상은 예약이 불가합니다.");
          return;
        }
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
            selected.push(this.availableSeats[seat.seatCode]);
          }
        });
      });
      this.selectedSeats = selected;
      this.$emit("update-seats", this.selectedSeats);
    },
    /**
     * 좌석 가용성 데이터를 가져와 좌석 배치를 초기화합니다.
     */
    async fetchAndInitialize() {
      const scheduleId = this.scheduleId;
      try {
        const response = await axios.get(
          `http://localhost:8080/api/musicals/schedules/${scheduleId}/seats`
        );

        if (response && response.data && Array.isArray(response.data.result)) {
          // 가용한 좌석을 {seatCode: seatId} 형식으로 저장
          this.availableSeats = response.data.result.reduce((acc, seat) => {
            if (seat.grade && seat.seatNo && seat.seatId) {
              const key = `${seat.grade}${seat.seatNo}`;
              acc[key] = seat.seatId; // Object 형태로 저장
            }
            return acc;
          }, {});
        } else {
          throw new Error("Invalid response structure");
        }
        this.initializeSeats(this.availableSeats); // 이 호출은 데이터가 유효할 때만 실행됩니다.
      } catch (error) {
        console.error("Error fetching available seats:", error);
        alert("좌석 정보를 불러오는 데 문제가 발생했습니다.");
      }
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
}

.seat.S {
  background-color: #babc72;
}

.seat.A {
  background-color: #8398ca;
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
