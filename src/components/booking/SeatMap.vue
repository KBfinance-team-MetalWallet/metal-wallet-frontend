<template>
  <div class="container">
    <div class="section" v-for="(row, rowIndex) in seatLayout" :key="rowIndex">
      <div class="row">
        <div v-for="(seat, seatIndex) in row" :key="seatIndex" :class="[
          'seat',
          seat ? seat.type : '',
          { selected: seat && seat.selected },
          { empty: !seat },
        ]" @click="toggleSeat(rowIndex, seatIndex)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeatSelection",
  data() {
    return {
      seatLayout: [],
      selectedSeats: [],
    };
  },
  created() {
    this.initializeSeats();
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

      // 좌석 타입 할당을 위한 변수
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
            let seatType = seatTypes.find(
              (type) => seatTypeCounts[type] > 0
            );
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
    toggleSeat(rowIndex, seatIndex) {
      const seat = this.seatLayout[rowIndex][seatIndex];
      if (seat) {
        seat.selected = !seat.selected;

        // 선택된 좌석 업데이트
        this.updateSelectedSeats();
      }
    },
    updateSelectedSeats() {
      const selectedSeats = [];
      for (let row of this.seatLayout) {
        for (let seat of row) {
          if (seat && seat.selected) {
            selectedSeats.push(`${seat.type}${seat.number}`);
          }
        }
      }
      this.selectedSeats = selectedSeats;
      console.log(this.selectedSeats.join(" "));
    },
  },
};
</script>

<style scoped>
.container {
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
  background-color: #E47F96;
  /* Gold */
}

.seat.S {
  background-color: #BABC72;
  /* Silver */
}

.seat.A {
  background-color: #8398CA;
  /* Bronze */
}

.seat.selected {
  background-color: red !important;
}

.seat.empty {
  visibility: hidden;
}
</style>