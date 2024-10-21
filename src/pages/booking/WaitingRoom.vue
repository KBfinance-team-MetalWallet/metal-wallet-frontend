<template>
  <div :class="$style.div">
    <MainHeader />
    <img :class="$style.imageIcon" alt="" src="@/assets/mascord2.png" />
    <div :class="$style.div1">
      <p :class="$style.p">나의 대기순서</p>
      <p :class="$style.p1">
        <b>1</b>
      </p>
    </div>
    <div :class="$style.rectangleParent">
      <div :class="$style.groupChild" />
      <div :class="$style.groupItem" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import MainHeader from '../../components/MainHeader.vue';

export default defineComponent({
  name: "Waiting",
  components: {
    MainHeader,
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
}

.imageIcon {
  position: absolute;
  top: 99px;
  left: 68px;
  width: 242px;
  height: 371px;
  object-fit: cover;
}

.p {
  margin: 0;
  font-weight: 500;
}

.p1 {
  margin: 0;
  font-size: 36px;
}

.div1 {
  position: absolute;
  top: 493px;
  left: 131px;
  color: #000;
  text-align: center;
  font-size: 20px;
}

.groupChild {
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 15px;
  background-color: #dfdfdf;
  width: 315px;
  height: 27px;
}

.groupItem {
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 15px;
  background-color: #c54966;
  width: 301px;
  height: 27px;
}

.rectangleParent {
  position: absolute;
  top: 581px;
  left: 29px;
  width: 315px;
  height: 27px;
}

.div {
  width: 100%;
  position: relative;
  background-color: #fafafa;
  height: 812px;
  overflow: hidden;
  text-align: left;
  font-size: 16px;
  color: #6e6e6e;
  font-family: Roboto;
}
</style>