<template>
  <div :class="$style.div">
    <div :class="$style.child" />
    <div :class="$style.groupParent">
      <div :class="$style.parent" @click="navigateToAdmin">
        <div :class="$style.div1">입장관리</div>
        <img :class="$style.iconexlineTwoTonehome" alt="" :src="homeIcon" />
      </div>
      <div :class="$style.group">
        <div :class="$style.div1">티켓 내역</div>
        <img :class="$style.iconexlineTwoTonecoupon3" alt="" :src="couponIcon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import homeIcon from "@/assets/Iconex/Line Two Tone/Home.svg";
import couponIcon from '@/assets/Iconex/Line Two Tone/Coupon 3.svg';

export default defineComponent({
  name: "adminFooter",
  data() {
    return {
      homeIcon,
      couponIcon
    };
  },
  setup() {
    const router = useRouter();

    const navigateToAdmin = () => {
      router.push({ name: 'Admin' });
    };

    return {
      navigateToAdmin,
    };
  },
})
</script>
<style module>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');

body {
  margin: 0;
  line-height: normal;
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

.div1 {
  position: absolute;
  height: 35%;
  width: 100%;
  top: 65%;
  left: 0%;
  display: inline-block;
}

.iconexlineTwoTonehome {
  position: absolute;
  height: 60%;
  width: 50%;
  top: 0%;
  right: 25%;
  bottom: 40%;
  left: 25%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}

.parent {
  position: absolute;
  height: 100%;
  width: 20.34%;
  top: 0%;
  right: 79.66%;
  bottom: 0%;
  left: 0%;
}

.iconexlineTwoTonecoupon3 {
  position: absolute;
  height: 60%;
  width: 46.15%;
  top: 0%;
  right: 26.92%;
  bottom: 40%;
  left: 26.92%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
}

.group {
  position: absolute;
  height: 100%;
  width: 22.03%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 77.97%;
  color: #2b3f6c;
}

.groupParent {
  position: absolute;
  height: 58.82%;
  width: 62.93%;
  top: 20.59%;
  right: 18.4%;
  bottom: 20.59%;
  left: 18.67%;
}

.div {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 375px;
  height: 68px;
  font-size: 13px;
  color: #2b3f6c;
}
</style>