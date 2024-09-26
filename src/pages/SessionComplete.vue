<template>
  <div :class="$style.div">
    <img :class="$style.solarwalletOutlineIcon" alt="" src="solar:wallet-outline.svg" />
    <b :class="$style.b">강철지갑</b>
    <div :class="$style.image163" />
    <img :class="$style.imageIcon" alt="" src="@/assets/mascord.png" />
    <div :class="$style.child" />
    <b :class="$style.b1">
      <p :class="$style.p">확인해주세요.</p>
      <p :class="$style.p1">세션이 만료되었습니다.</p>
    </b>
    <div :class="$style.div1">
      <div :class="$style.rectangleParent" @click="goBack">
        <div :class="$style.groupChild" />
        <b :class="$style.b2">뒤로가기</b>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: "SessionComplete",
  methods: {
    goBack() {
      this.$router.back(); // 이전 페이지로 리다이렉트
    }
  }
})
</script>

<style module>
.solarwalletOutlineIcon {
  position: absolute;
  top: 11px;
  left: 14px;
  width: 24px;
  height: 24px;
  overflow: hidden;
}

.b {
  position: absolute;
  top: 14px;
  left: 43px;
  font-size: 16px;
}

.image163 {
  position: absolute;
  top: 93px;
  left: 0px;
  width: 375px;
  height: 550.9px;
}

.imageIcon {
  position: absolute;
  top: 113px;
  left: calc(50% - 98.5px);
  width: 197px;
  height: 269px;
  object-fit: cover;
}

.child {
  position: absolute;
  top: 401px;
  left: 50%; /* 가로 기준 가운데 정렬 */
  transform: translateX(-50%); /* 가운데로 정렬되도록 이동 */
  border-radius: 50px;
  border: 5px solid #000;
  box-sizing: border-box;
  width: 85%;
  height: 174px;
}

.p {
  margin-block-start: 0;
  margin-block-end: 5px;
}

.p1 {
  margin: 0;
}

.b1 {
  position: absolute;
  top: 463px;
  left: 50%; /* 가로 기준 가운데 정렬 */
  transform: translateX(-50%); /* 가운데로 정렬되도록 이동 */
  display: inline-block;
  color: #000;
  text-align: center;
  width: 237px;
  font-size: 18px; /* 글자 크기를 기존보다 조금 줄임 */
}

.groupChild {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  border-radius: 15px;
  background-color: #c54966;
}

.b2 {
  position: absolute;
  top: calc(50% - 11.5px);
  left: calc(50% - 37px);
}

.rectangleParent {
  position: absolute;
  height: 100%;
  width: 95%;
  top: 0%;
  left: 50%; /* 가로 기준 가운데 정렬 */
  transform: translateX(-50%); /* 가운데로 정렬되도록 이동 */
}


.div1 {
  position: absolute;
  top: calc(50% + 193px);
  left: calc(50% - 123.5px);
  width: 250px;
  height: 55px;
  color: #fff;
}

.div {
  width: 100%;
  position: relative;
  background-color: #fafafa;
  height: 812px;
  overflow: hidden;
  text-align: left;
  font-size: 20px;
  color: #6e6e6e;
  font-family: Roboto;
  
  /* Flexbox를 사용한 가운데 정렬 */
  display: flex;
  flex-direction: column; /* 하위 요소들을 수직으로 쌓음 */
  justify-content: center; /* 세로 가운데 정렬 */
  align-items: center; /* 가로 가운데 정렬 */
}

.div_7ni70_185 {
  /* Flexbox를 사용하여 하위 요소들을 가로 및 세로 가운데 정렬 */
  display: flex;
  flex-direction: column; /* 하위 요소들을 수직으로 배치 */
  justify-content: center; /* 세로 가운데 정렬 */
  align-items: center; /* 가로 가운데 정렬 */
  width: 100%; /* 부모 요소에 맞춰 가로 폭을 채움 */
  height: 100%; /* 필요 시 세로 높이도 설정 */
}
</style>