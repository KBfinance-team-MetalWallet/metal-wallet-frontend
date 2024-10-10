<template>
  <div :class="$style.div">
    <MainHeader />
    <div :class="$style.image163" />
    <img :class="$style.imageIcon" alt="" src="@/assets/mascord2.png" />
    <!-- child 태그 -->
    <div :class="$style.child">
      <b :class="$style.b1">
        <p :class="$style.p1">결제를 완료하였습니다.</p>
        <p :class="$style.p1">결제 내역을 확인하세요.</p>
      </b>
    </div>
    <!-- child 아래에 위치하는 div1 태그 -->
    <div :class="$style.div1">

      <div :class="$style.rectangleParent" @click="goToPaymentHistory">
        <b :class="$style.b2">
          결제 내역 확인하기
        </b>
      </div>
      <div :class="$style.countdown">
        {{ countdown }}초 후 홈으로 이동
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from '../../components/MainHeader.vue';

export default {
  name: "PaymentSuccessPage",
  components: {
    MainHeader,
  },
  data() {
    return {
      countdown: 3, // 카운트다운 초기값
      accountId: 1, // 기본 계좌 ID 설정
      interval: null, // interval ID를 저장할 변수
    };
  },
  methods: {
    goToPaymentHistory() {
      // 페이지 이동 전에 타이머 정지
      clearInterval(this.interval);
      this.$router.push(`/payment-history/${this.accountId}`);
    },
  },
  mounted() {
    // 화면이 로딩되면 카운트다운 시작
    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown -= 1;
      } else {
        clearInterval(this.interval); // 카운트다운 종료 시 타이머 제거
        this.$router.push("/"); // 홈으로 이동
      }
    }, 1000); // 1초마다 실행
  },
  beforeUnmount() {
    // 컴포넌트가 언마운트될 때 타이머 정지
    clearInterval(this.interval);
  }
};
</script>


<style module>
.div {
  width: 100%;
  height: 100vh;
  text-align: center;
  color: #6e6e6e;
  display: flex;
  flex-direction: column;
  /* 위에서 아래로 배치 */
  align-items: center;
}

.child {
  display: flex;
  /* 내부 요소 정렬을 위한 flex 사용 */
  justify-content: center;
  /* 가로 방향 중앙 정렬 */
  align-items: center;
  /* 세로 방향 중앙 정렬 */
  width: 85%;
  height: 174px;
  border-radius: 50px;
  border: 2px solid #b5b5b5;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.b1 {
  text-align: center;
  /* 내부 텍스트를 가운데 정렬 */
  font-size: 18px;
}

.div1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.rectangleParent {
  width: 250px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  /* 버튼과 아래 카운트다운 문구 사이의 간격 */
  cursor: pointer;
}

.p1 {
  font-weight: bold;
  color: black;
}

.b2 {
  font-weight: bold;
  font-size: 18px;
  color: black;
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
}

.imageIcon {
  position: relative;
  top: 60px;
  padding: 0px;
}

.countdown {
  font-weight: bold;
  margin-top: 10px;
}
</style>
