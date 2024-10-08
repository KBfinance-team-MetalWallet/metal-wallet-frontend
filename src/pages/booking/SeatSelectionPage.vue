<template>
  <div :class="$style.div">
    <BackHeader />
    <div :class="$style.groupParent">
      <!-- 좌석선택 -->
      <div :class="$style.vectorParent" @click="sectionsSelect">
        <img
          :class="$style.groupChild"
          alt=""
          src="@/assets/booking/Rectangle 203.svg"
        />
        <div :class="$style.div1">좌석 선택</div>
      </div>
      <!-- refresh 버튼 -->
      <img
        :class="$style.frameChild"
        alt=""
        @click="resetSeats"
        src="@/assets/booking/Group 9670.png"
      />
    </div>

    <!-- 좌석 정보 -->
    <div :class="$style.groupContainer" v-if="isSectionsInfo">
      <img
        :class="$style.groupItem"
        alt=""
        src="@/assets/booking/Group 9668.svg"
      />
      <div :class="$style.rParent">
        <div :class="$style.r">
          <div :class="$style.colorboxRed" />
          <div :class="$style.r1">R석</div>
          <div :class="$style.div3">190,000원</div>
        </div>
        <div :class="$style.s">
          <div :class="$style.colorboxGreen" />
          <div :class="$style.div3">160,000원</div>
          <div :class="$style.s1">S석</div>
        </div>
        <div :class="$style.a">
          <div :class="$style.aChild" />
          <div :class="$style.div3">130,000원</div>
          <div :class="$style.a1">A석</div>
        </div>
      </div>
    </div>

    <div :class="$style.seatMapContainer">
      <SeatMap @update-seats="handleUpdateSeats" ref="seatMapRef" />
    </div>

    <!-- 선택된 좌석 정보 -->
    <div :class="$style.locationandamountParent">
      <div :class="$style.locationandamount" v-if="selectedSeats.length > 0">
        <!-- 동적으로 선택된 좌석 정보 표시 -->
        <div :class="$style.div5">{{ totalAmount }}원</div>
        <div :class="$style.div6">
          <p
            v-for="(seat, index) in selectedSeats"
            :key="index"
            :class="$style.r16"
          >
            {{ seat.type }}석 {{ seat.number }} -
            {{ getSeatPrice(seat.type).toLocaleString() }}원
          </p>
        </div>
      </div>
      <!-- paymentsystem 전체를 버튼으로 수정 -->
      <button :class="$style.paymentsystem" @click="navigateToPassword">
        간편 결제하기
      </button>
    </div>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader.vue";
import Footer from "@/components/Footer.vue";
import SeatMap from "@/components/booking/SeatMap.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SeatSelectionPage",
  components: {
    BackHeader,
    Footer,
    SeatMap,
  },
  data() {
    return {
      isSectionsInfo: false,
      selectedSeats: [],
      totalAmount: 0,
    };
  },
  methods: {
    sectionsSelect() {
      this.isSectionsInfo = !this.isSectionsInfo;
    },
    navigateToPassword() {
      if (this.selectedSeats.length === 0) {
        alert("좌석을 선택해주세요!");
        return;
      }
      const seatIdList = this.selectedSeats.map((seat) => seat.id);
      console.log(seatIdList);
      this.$router.push({
        path: "/booking/password",
        query: { seats: JSON.stringify(seatIdList) }, // 문자열로 변환하여 전달
      });
    },
    handleUpdateSeats(seats) {
      this.selectedSeats = seats;

      // 좌석에 따른 금액 계산
      let total = 0;
      seats.forEach((seat) => {
        if (seat.type === "R") total += 190000;
        if (seat.type === "S") total += 160000;
        if (seat.type === "A") total += 130000;
      });

      this.totalAmount = total;
    },
    resetSeats() {
      console.log("reset");
      this.selectedSeats = [];
      this.totalAmount = 0;

      // SeatMap 컴포넌트의 메서드 호출
      if (
        this.$refs.seatMapRef &&
        typeof this.$refs.seatMapRef.resetSeatMap === "function"
      ) {
        this.$refs.seatMapRef.fetchAndInitialize(); // 좌석 현황 업데이트
        this.$refs.seatMapRef.resetSeatMap(); // 좌석 맵의 상태도 리셋
      } else {
        console.error("SeatMap reference or resetSeatMap method not available");
      }
    },
    getSeatPrice(type) {
      if (type === "R") return 190000;
      if (type === "S") return 160000;
      if (type === "A") return 130000;
      return 0;
    },
  },
});
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap");

body {
  margin: 0;
  line-height: normal;
}

.mingcutetimeLineIcon {
  position: absolute;
  top: 501px;
  left: 59px;
  width: 21px;
  height: 21px;
  overflow: hidden;
}

.groupChild {
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 50px;
  width: 90px;
  height: 35px;
}

.div1 {
  position: absolute;
  top: 7.5px;
  left: 20px;
  display: inline-block;
  width: 62px;
}

.vectorParent {
  width: 90px;
  position: relative;
  height: 35px;
  z-index: 10;
}

.frameChild {
  width: 35px;
  position: absolute;
  margin: 0 !important;
  top: 0px;
  left: 96px;
  height: 35px;
  z-index: 1;
}

.groupParent {
  position: absolute;
  top: 35px;
  left: 232px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  font-size: 14px;
}

.groupItem {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 148px;
  height: 109.5px;
}

.colorboxRed {
  position: absolute;
  top: 1px;
  left: 0px;
  background-color: #c54966;
  width: 11px;
  height: 10px;
}

.r1 {
  position: absolute;
  top: 0px;
  left: 19px;
}

.r {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  position: relative;
  height: 12px;
  text-align: left;
}

.colorboxGreen {
  position: absolute;
  top: 2px;
  left: 0px;
  background-color: #babc72;
  width: 11px;
  height: 10px;
}

.div3 {
  display: flex;
  justify-content: end;
  align-items: center;
  width: 125px;
}

.s1 {
  position: absolute;
  top: 1px;
  left: 19px;
  text-align: left;
}

.s {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  position: relative;
  height: 13px;
}

.aChild {
  position: absolute;
  top: 1px;
  left: 0px;
  background-color: #8398ca;
  width: 11px;
  height: 10px;
}

.a1 {
  position: absolute;
  top: 0px;
  left: 19px;
  text-align: left;
}

.a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  position: relative;
  height: 12px;
}

.rParent {
  position: absolute;
  top: 27px;
  left: 9px;
  width: 125px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  gap: 17px;
}

.groupContainer {
  position: absolute;
  top: 73px;
  left: 205px;
  width: 148px;
  height: 109.5px;
  text-align: right;
  font-size: 10px;
}

.weuibackFilledIcon {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 11px;
  height: 22px;
  overflow: hidden;
}

.b {
  position: absolute;
  top: 2px;
  left: 18px;
}

.weuibackFilledParent {
  position: absolute;
  top: 13px;
  left: 14px;
  width: 77px;
  height: 22px;
  color: #6e6e6e;
}

.div5 {
  position: absolute;
  left: 285px;
  font-weight: 600;
}

.div6 {
  font-size: 12px;
  color: #fff;
  padding: 8px;
}

.paymentframe {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #c54966;
  width: 375px;
  height: 47px;
}

.b1 {
  position: absolute;
  top: 14px;
  left: 141px;
}

.paymentsystem {
  width: 375px;
  position: relative;
  height: 47px;
  color: #fff;
  background-color: #c54966;
  border: none;
}

.child {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  border-radius: 15px 15px 0px 0px;
  background-color: #fff;
}

.div8 {
  position: absolute;
  height: 35%;
  width: 50%;
  top: 65%;
  left: 25%;
  display: inline-block;
}

.iconexlineTwoTonehome {
  position: absolute;
  height: 60%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 40%;
  left: 0%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}

.parent {
  position: absolute;
  height: 100%;
  width: 8.82%;
  top: 0%;
  right: 91.18%;
  bottom: 0%;
  left: 0%;
  color: #c54966;
}

.div9 {
  position: absolute;
  height: 35%;
  width: 100%;
  top: 65%;
  left: 0%;
  display: inline-block;
}

.iconexlineTwoTonecoupon3 {
  position: absolute;
  height: 60%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 40%;
  left: 0%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
}

.group {
  position: absolute;
  height: 100%;
  width: 8.82%;
  top: 0%;
  right: 45.59%;
  bottom: 0%;
  left: 45.59%;
}

.container {
  position: absolute;
  height: 100%;
  width: 8.82%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 91.18%;
}

.groupDiv {
  position: absolute;
  height: 58.82%;
  width: 72.53%;
  top: 23.53%;
  right: 13.87%;
  bottom: 17.65%;
  left: 13.6%;
}

.div7 {
  flex: 1;
  position: relative;
  height: 68px;
  font-size: 13px;
  color: #2b3f6c;
}

.locationandamountParent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 375px;
  flex-wrap: nowrap;
}

.locationandamount {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  height: auto;
  padding: 10px 20px;
  border-radius: 15px 15px 0px 0px;
  background-color: #504d4d;
  box-sizing: border-box;
}

.r16 {
  margin: 0;
  width: 100%;
  word-break: break-all;
  color: white;
  height: auto;
}

.div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: relative;
  background-color: #fafafa;
  height: 812px;
  overflow: hidden;
  text-align: left;
  font-size: 16px;
  color: #fff;
  font-family: Roboto;
}

.seatMapContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 812px;
}
</style>
