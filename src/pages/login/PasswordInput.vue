<template>
    <div :class="$style.container">
        <b :class="$style.title">
            <p :class="$style.text">
                <span>간편 비밀번호 </span>
                <span :class="$style.highlight">를</span>
            </p>
            <p :class="$style.text">
                <span :class="$style.highlight">{{ firstInput ? '입력' : '다시 한번 입력' }}</span>
                <span>해주세요.</span>
            </p>
        </b>

        <div :class="$style.dividerwrapper">
            <svg :class="$style.icon" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <circle v-for="(circleColor, index) in circles" :key="index" :cx="15.5 + index * 43" cy="15.5"
                        r="15.5" :fill="circleColor" />
                </g>
            </svg>
            <div :class="$style.divider"></div>
        </div>

        <div :class="$style.keypad">
            <div v-for="(row, rowIndex) in keypadRows" :key="rowIndex" :class="$style.keypadRow">
                <div v-for="(key, keyIndex) in row" :key="keyIndex" :class="$style.key" @click="handleKeyPress(key)">
                    <!-- 0을 제외한 숫자 렌더링 -->
                    <div v-if="key !== null && key !== 'delete'" :class="$style.numberRect"></div>
                    <div v-if="key !== null && key !== 'delete'" :class="$style.number">{{ key }}</div>

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

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
import { useUserStore } from '../../stores/userStore';

export default defineComponent({
    name: 'Frame',
    data() {
        return {
            enteredPassword: [] as number[], // 입력된 비밀번호를 저장하는 배열
            maxPasswordLength: 6, // 최대 비밀번호 자리수
            firstInput: true, // 첫 번째 입력 여부
            firstPin: '', // 첫 번째 PIN 저장
            keypadRows: [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [null, 0, 'delete']
            ]
        }
    },
    computed: {
        circles() {
            // 비밀번호 자리수에 맞춰 색상을 결정
            return Array.from({ length: this.maxPasswordLength }, (_, index) => {
                return this.enteredPassword.length > index ? '#C54966' : '#D9D9D9'
            });
        }
    },
    methods: {
        handleKeyPress(key: number | string | null) {
            if (typeof key === 'number' && this.enteredPassword.length < this.maxPasswordLength) {
                this.enteredPassword.push(key);

                // PIN 번호가 6자리가 모두 입력되었을 때
                if (this.enteredPassword.length === this.maxPasswordLength) {
                    if (this.firstInput) {
                        // 첫 번째 입력 시 PIN 저장
                        this.firstPin = this.enteredPassword.join('');
                        this.firstInput = false; // 두 번째 입력 대기 상태로 변경
                        this.enteredPassword = []; // 이전 비밀번호 초기화
                    } else {
                        // 두 번째 입력
                        const secondPin = this.enteredPassword.join('');
                        if (this.firstPin === secondPin) {
                            this.register(); // PIN이 일치할 시 API 호출
                        } else {
                            alert("두 비밀번호가 일치하지 않습니다.");
                            this.enteredPassword = []; // 입력 초기화
                        }
                    }
                }
            } else if (key === 'delete' && this.enteredPassword.length > 0) {
                this.enteredPassword.pop();
            }
        },
        async register() {
            // Pinia에서 사용자 정보 가져오기
            const userStore = useUserStore();
            const { name, password, email, phone } = userStore; // Pinia 스토어에서 값 가져오기
            const pinNumber = this.firstPin;

            // API 호출
            const formData = {
                name,
                password,
                email,
                phone,
                pinNumber // PIN 번호를 포함하여 데이터 전송
            };

            try {
                const response = await axios.post('http://localhost:8080/api/members/register', formData);
                console.log('Registration successful:', response.data);
                this.$router.push('/');
            } catch (error) {
                console.error('Error registering member:', error.response ? error.response.data : error.message);
            }
        }
    }
})
</script>

<style module>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

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