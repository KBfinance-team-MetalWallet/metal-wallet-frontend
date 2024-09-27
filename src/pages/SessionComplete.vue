<template>
  <div :class="$style.div">
    <MainHeader />
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
import MainHeader from '../components/MainHeader.vue';

export default defineComponent({
  name: "SessionComplete",
  components: {
    MainHeader,
  },
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
  left: 50%;
  transform: translateX(-50%);
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
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  color: #000;
  text-align: center;
  width: 237px;
  font-size: 18px;
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

.rectangleParent {
  position: absolute;
  height: 100%;
  width: 95%;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
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
  color: #6e6e6e;
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.div_7ni70_185 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>