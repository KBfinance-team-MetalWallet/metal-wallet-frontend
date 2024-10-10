<template>
  <div :class="$style.div8">
    <div :class="$style.child" />
    <div :class="$style.groupContainer">
      <router-link to="/" :class="$style.parent">
        <div
          :class="$style.div10"
          :style="{ color: $route.path === '/' || $route.path.startsWith('/musical') ? '#C54966' : '#2b3f6c' }"
        >
          홈
        </div>
        <svg
          :class="$style.iconex"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 10.9384C2.5 9.71422 3.06058 8.55744 4.02142 7.79888L9.52142 3.45677C10.9747 2.30948 13.0253 2.30948 14.4786 3.45677L19.9786 7.79888C20.9394 8.55744 21.5 9.71422 21.5 10.9384V17.5C21.5 19.7091 19.7091 21.5 17.5 21.5H16C15.4477 21.5 15 21.0523 15 20.5V17.5C15 16.3954 14.1046 15.5 13 15.5H11C9.89543 15.5 9 16.3954 9 17.5V20.5C9 21.0523 8.55228 21.5 8 21.5H6.5C4.29086 21.5 2.5 19.7091 2.5 17.5L2.5 10.9384Z"
            :stroke="$route.path === '/' || $route.path.startsWith('/musical') ? '#C54966' : '#2b3f6c'"
            stroke-width="2.5"
          />
        </svg>
      </router-link>
      <router-link to="/ticket" :class="$style.group">
        <div
          :class="$style.div10"
          :style="{ color: $route.path === '/ticket' ? '#C54966' : '#2b3f6c' }"
        >
          티켓
        </div>
        <svg
          :class="$style.iconex"
          width="60"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M2.31525 9.63594L2.07079 10.345L2.31525 9.63594ZM2.31525 14.3641L2.07079 13.655L2.31525 14.3641ZM21.6847 14.3641L21.9292 13.655L21.6847 14.3641ZM21.6847 9.63594L21.4403 8.92691L21.6847 9.63594ZM6 3.25C3.37665 3.25 1.25 5.37665 1.25 8H2.75C2.75 6.20507 4.20507 4.75 6 4.75V3.25ZM18 3.25H6V4.75H18V3.25ZM22.75 8C22.75 5.37665 20.6234 3.25 18 3.25V4.75C19.7949 4.75 21.25 6.20507 21.25 8H22.75ZM22.75 9.22305V8H21.25V9.22305H22.75ZM20.75 12C20.75 11.2345 21.242 10.5819 21.9292 10.345L21.4403 8.92691C20.1667 9.36603 19.25 10.575 19.25 12H20.75ZM21.9292 13.655C21.242 13.4181 20.75 12.7655 20.75 12H19.25C19.25 13.425 20.1667 14.634 21.4403 15.0731L21.9292 13.655ZM22.75 16V14.777H21.25V16H22.75ZM18 20.75C20.6234 20.75 22.75 18.6234 22.75 16H21.25C21.25 17.7949 19.7949 19.25 18 19.25V20.75ZM6 20.75H18V19.25H6V20.75ZM1.25 16C1.25 18.6234 3.37665 20.75 6 20.75V19.25C4.20507 19.25 2.75 17.7949 2.75 16H1.25ZM1.25 14.777V16H2.75V14.777H1.25ZM2.55972 15.0731C3.83334 14.634 4.75 13.425 4.75 12H3.25C3.25 12.7655 2.75802 13.4181 2.07079 13.655L2.55972 15.0731ZM4.75 12C4.75 10.575 3.83334 9.36603 2.55972 8.92691L2.07079 10.345C2.75802 10.5819 3.25 11.2345 3.25 12H4.75ZM1.25 8V9.22305H2.75V8H1.25ZM2.55972 8.92691C2.62653 8.94994 2.75 9.03795 2.75 9.22305H1.25C1.25 9.78862 1.64428 10.1979 2.07079 10.345L2.55972 8.92691ZM2.75 14.777C2.75 14.962 2.62653 15.0501 2.55972 15.0731L2.07079 13.655C1.64428 13.8021 1.25 14.2114 1.25 14.777H2.75ZM21.4403 15.0731C21.3735 15.0501 21.25 14.962 21.25 14.777H22.75C22.75 14.2114 22.3557 13.8021 21.9292 13.655L21.4403 15.0731ZM21.25 9.22305C21.25 9.03795 21.3735 8.94994 21.4403 8.92691L21.9292 10.345C22.3557 10.1979 22.75 9.78862 22.75 9.22305H21.25Z"
            :fill="$route.path === '/ticket' ? '#C54966' : '#2b3f6c'"
            stroke-width="2.5"
          />
          <path
            d="M15 7L15 4"
            :stroke="$route.path === '/ticket' ? '#C54966' : '#2b3f6c'"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 13.5L15 10.5"
            :stroke="$route.path === '/ticket' ? '#C54966' : '#2b3f6c'"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 20L15 17"
            :stroke="$route.path === '/ticket' ? '#C54966' : '#2b3f6c'"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </router-link>
      <router-link to="/mypage" :class="$style.container">
        <div
          :class="$style.div10"
          :style="{ color: $route.path === '/mypage' || $route.path.startsWith('/payment-history') || $route.path === '/my-ticket-list' ? '#C54966' : '#2b3f6c' }"
        >
          마이
        </div>
        <svg
          :class="$style.iconex"
          width="60"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
		  preserveAspectRatio="none"
        >
          <path
            d="M12 12C15.3137 12 18 14.6863 18 18C18 19.0519 17.834 20.0596 17.5302 21H6.46979C6.16595 20.0596 6 19.0519 6 18C6 14.6863 8.68629 12 12 12Z"
            :stroke="$route.path === '/mypage' || $route.path.startsWith('/payment-history') || $route.path === '/my-ticket-list' ? '#C54966' : '#2b3f6c'"
            stroke-width="2.5"
          />
          <path
            d="M12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3Z"
            :stroke="$route.path === '/mypage' || $route.path.startsWith('/payment-history') || $route.path === '/my-ticket-list' ? '#C54966' : '#2b3f6c'"
            stroke-width="2.5"
          />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script lang="js">
import couponIcon from '@/assets/Iconex/Line Two Tone/Coupon 3.svg';
import homeIcon from '@/assets/Iconex/Line Two Tone/Home.svg';
import userIcon from '@/assets/Iconex/Line Two Tone/User.svg';
import { defineComponent } from 'vue';

export default defineComponent({
 name: 'Footer',
 data() {
  return {
	  homeIcon,
	  couponIcon,
	  userIcon
  };
 },
});
</script>

<style module>
.div8 {
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  height: 68px;
  font-size: 13px;
  font-family: "bamin_title";
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

.iconex {
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
  text-align: center;

  /* color: #c54966; */
}

.group {
  text-align: center;
  position: absolute;
  height: 100%;
  width: 9.82%;
  top: 0%;
  right: 45.59%;
  bottom: 0%;
  left: 45.59%;
}

.container {
  position: absolute;
  text-align: center;

  height: 100%;
  width: 9.82%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 91.18%;
}

.div10 {
  position: absolute;
  height: 35%;
  width: 100%;
  top: 65%;
  left: 0%;
  display: inline-block;
  color: black;
  font-size: 14px;
}

.groupContainer {
  position: absolute;
  height: 58.82%;
  width: 72.53%;
  top: 23.53%;
  right: 13.87%;
  bottom: 17.65%;
  left: 13.6%;
}
</style>
