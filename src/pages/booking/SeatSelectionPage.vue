<template>
  <div :class="$style.div">
    <div :class="$style.groupParent">
      <div :class="$style.vectorParent">
        <img :class="$style.groupChild" alt="" src="@/assets/booking/Rectangle 203.svg" />
        <div :class="$style.div1">좌석 선택</div>
      </div>
      <img :class="$style.frameChild" alt="" src="@/assets/booking/Group 9670.png" />
    </div>
    <div :class="$style.groupContainer">
      <img :class="$style.groupItem" alt="" src="@/assets/booking/Group 9668.svg" />
      <div :class="$style.rParent">
        <div :class="$style.r">
          <div :class="$style.colorboxRed" />
          <div :class="$style.r1">R석</div>
          <div :class="$style.div2">190,000원</div>
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
      <SeatMap />
    </div>

    <BackHeader />
    <div :class="$style.locationandamountParent">
      <div :class="$style.locationandamount">
        <div :class="$style.locationandamountframe" />
        <div :class="$style.div5">290,000원</div>
        <div :class="$style.div6">
          <p :class="$style.r16">R석 1열 6</p>
          <p :class="$style.r16">A석 11열 7</p>
        </div>
      </div>
      <!-- paymentsystem 전체를 버튼으로 수정 -->
      <button :class="$style.paymentsystem" @click="navigateToPassword">
        간편 결제하기
      </button>
    </div>
    <Footer />
  </div>
</template>
<script lang="js">
import { defineComponent } from 'vue';
import BackHeader from '@/components/BackHeader.vue';
import Footer from '@/components/Footer.vue';
import SeatMap from '@/components/booking/SeatMap.vue';

export default defineComponent({
  name: "SeatSelectionPage",
  components: {
    BackHeader,
    Footer,
    SeatMap,
  },
  methods: {
    navigateToPassword() {
      this.$router.push({path: "/booking/password"});
    },
  },
  data() {
    return {
      BackHeader,
      Footer,
      SeatMap,
    }
  }
})
</script>
<style module>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap');

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
  top: 9px;
  left: 18px;
  display: inline-block;
  width: 57px;
}

.vectorParent {
  width: 90px;
  position: relative;
  height: 35px;
  z-index: 0;
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

.div2 {
  position: absolute;
  top: 0px;
  left: 80px;
  text-align: right;
}

.r {
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
  position: absolute;
  top: 0px;
  left: 80px;
}

.s1 {
  position: absolute;
  top: 1px;
  left: 19px;
  text-align: left;
}

.s {
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

.locationandamountframe {
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 15px 15px 0px 0px;
  background-color: #504d4d;
  width: 375px;
  height: 45px;
}

.div5 {
  position: absolute;
  top: 21px;
  left: 285px;
  font-weight: 600;
}

.r16 {
  margin: 0;
}

.div6 {
  position: absolute;
  top: 8px;
  left: 18px;
  font-size: 12px;
  color: #fff;
}

.locationandamount {
  width: 375px;
  position: relative;
  height: 45px;
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
  background-color: #c54966;
  border: none;
  color: #fff;
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
  position: absolute;
  top: 652px;
  left: 0px;
  width: 375px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  gap: 0px;
  color: #e9e9e9;
}

.div {
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
  /* 필요에 따라 높이를 지정합니다 */
  height: 100%;
}
</style>