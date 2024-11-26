<template>
  <div :class="$style.container">
    <b :class="$style.title">
      <p :class="$style.text">
        <span>간편 비밀번호 </span>
        <span :class="$style.highlight">를</span>
      </p>
      <p :class="$style.text">
        <span :class="$style.highlight">{{
          firstInput ? "입력" : "다시 한번 입력"
        }}</span>
        <span>해주세요.</span>
      </p>
    </b>

    <div :class="$style.dividerwrapper">
      <svg :class="$style.icon" xmlns="http://www.w3.org/2000/svg">
        <g>
          <circle v-for="(circleColor, index) in circles" :key="index" :cx="15.5 + index * 43" cy="15.5" r="15.5"
            :fill="circleColor" />
        </g>
      </svg>
      <div :class="$style.divider"></div>
    </div>

    <div :class="$style.keypad">
      <div v-for="(row, rowIndex) in keypadRows" :key="rowIndex" :class="$style.keypadRow">
        <div v-for="(key, keyIndex) in row" :key="keyIndex" :class="$style.key" @click="handleKeyPress(key)">
          <!-- 0을 제외한 숫자 렌더링 -->
          <div v-if="key !== null && key !== 'delete'" :class="$style.numberRect"></div>
          <div v-if="key !== null && key !== 'delete'" :class="$style.number">
            {{ key }}
          </div>

          <!-- deleteIcon 렌더링 -->
          <img v-if="key === 'delete'" :class="$style.deleteIcon" alt="delete icon"
            src="@/assets/login/deleteIcon.svg" />

          <!-- 빈 공간 렌더링 -->
          <div v-if="key === null" :class="$style.emptySpace"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "VerificationPasswordInput",
  data() {
    return {
      enteredPassword: [],
      maxPasswordLength: 6,
      firstInput: true,
      firstPin: "",
      keypadRows: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [null, 0, "delete"],
      ],
    };
  },
  computed: {
    circles() {
      return Array.from(
        { length: this.maxPasswordLength },
        (_, index) => {
          return this.enteredPassword.length > index ? "#C54966" : "#D9D9D9";
        }
      );
    },
    seatIds() {
      try {
        return JSON.parse(this.$route.query.seats || '[]');
      } catch (error) {
        console.error('Error parsing seatIds:', error);
        return [];
      }
    },
  },
  methods: {
    handleKeyPress(key) {
      if (
        typeof key === "number" &&
        this.enteredPassword.length < this.maxPasswordLength
      ) {
        this.enteredPassword.push(key);
        if (this.enteredPassword.length === this.maxPasswordLength) {
          if (this.firstInput) {
            this.firstPin = this.enteredPassword.join("");
            this.verifyPinAndBookTickets();
            this.enteredPassword = [];
          }
        }
      } else if (key === "delete" && this.enteredPassword.length > 0) {
        this.enteredPassword.pop();
      }
    },
    getDeviceInfo() {
      return navigator.userAgent;
    },
    async verifyPinAndBookTickets() {
      const pinNumber = this.firstPin;
      const deviceInfo = this.getDeviceInfo();
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.post(
          "http://localhost:8080/api/members/pin-number-verification",
          { pinNumber, deviceInfo },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Verification successful:", response.data);
        await this.bookTickets();
        this.$router.push({ path: "/booking/payment-success" });
      } catch (error) {
        // 에러 응답 처리
        if (error.response && error.response.data && error.response.data.code) {
          alert(`에러 발생: ${error.response.data.message} (에러 코드: ${error.response.data.code})`);
        } else {
          alert("일치하지 않는 비밀번호입니다.");
        }
        console.error(
          "Error during verification:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async bookTickets() {
      const formData = {
        seatId: this.seatIds,
        deviceId: this.deviceInfo ? this.deviceInfo : "temp",
      };
      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.post(
          "http://localhost:8080/api/tickets",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Tickets booked successfully:", response.data);
      } catch (error) {
        // 백엔드 에러 응답 처리
        if (error.response && error.response.data && error.response.data.resultMsg) {
          alert(`에러 발생: ${error.response.data.resultMsg} (에러 코드: ${error.response.data.code})`);
        } else {
          alert('서버와의 통신 중 문제가 발생했습니다.');
        }
        console.error(
          "Error booking tickets:",
          error.response ? error.response.data : error.message
        );
      }
    },
  },
});
</script>

<style module>
body {
  margin: 0;
  line-height: normal;
}

.container {
  width: 100%;
  position: relative;
  background-color: #fafafa;
  height: 812px;
  text-align: left;
}

.title {
  position: absolute;
  top: 107px;
  left: 38px;
  font-size: 24px;
}

.text {
  margin: 0;
  color: #6e6e6e;
}

.highlight {
  color: #c54966;
}

.dividerwrapper {
  position: absolute;
  top: calc(50% - 149px);
  left: calc(50% - 137.5px);
  width: 276px;
  height: 59px;
}

.icon {
  position: absolute;
  top: calc(50% - 29.5px);
  left: calc(50% - 123px);
  width: 246px;
  height: 31px;
}

.divider {
  position: absolute;
  top: calc(50% + 29px);
  left: calc(50% - 138.5px);
  border-top: 1px solid #000;
  box-sizing: border-box;
  width: 277px;
  height: 1px;
}

.keypad {
  position: absolute;
  top: 501px;
  left: 50px;
  width: 281px;
}

.keypadRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}

.key {
  width: 57px;
  height: 38px;
  position: relative;
}

.numberRect {
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
  opacity: 0;
}

.number {
  position: absolute;
  top: 10%;
  left: 36%;
  font-size: 25px;
  color: #0b0b0b;
}

.emptySpace {
  position: absolute;
  top: 10%;
  left: 48%;
}

.deleteIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
</style>
