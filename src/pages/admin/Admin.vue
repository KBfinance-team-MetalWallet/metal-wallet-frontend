<template>
  <div :class="$style.div">
    <MainHeader />
    <b :class="$style.b">강철지갑</b>
    <div :class="$style.button">
      <b :class="$style.b1">카메라</b>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MainHeader from '../../components/MainHeader.vue';


export default defineComponent({
  name: "Admin",
  components: {
    MainHeader
  }
})</script>
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

.b1 {
  position: absolute;
  top: 15.5px;
  left: calc(50% - 21px);
}

.button {
  position: absolute;
  width: calc(100% - 25px);
  top: 381px;
  right: 12px;
  left: 13px;
  border-radius: 10px;
  background-color: #c54966;
  height: 50px;
  text-align: center;
  font-size: 15px;
  color: #fff;
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