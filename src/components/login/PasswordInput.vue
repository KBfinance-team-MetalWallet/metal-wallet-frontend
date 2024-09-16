<template>
    <div :class="$style.container">
        <b :class="$style.title">
            <p :class="$style.text">
                <span>간편 비밀번호 </span>
                <span :class="$style.highlight">를</span>
            </p>
            <p :class="$style.text">
                <span :class="$style.highlight">입력</span>
                <span>해주세요.</span>
            </p>
        </b>

        <img :class="$style.icon" alt="password icon" src="@/assets/login/password.svg" />

        <div :class="$style.divider" />

        <div :class="$style.keypad">
            <div v-for="(row, rowIndex) in keypadRows" :key="rowIndex" :class="$style.keypadRow">
                <div v-for="(key, keyIndex) in row" :key="keyIndex" :class="$style.key">
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
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Frame',
    data() {
        return {
            keypadRows: [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [null, 0, 'delete'] // deleteIcon 위치 추가
            ]
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
    font-family: Roboto, sans-serif;
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

.icon {
    position: absolute;
    top: 257px;
    left: 65px;
    width: 246px;
    height: 31px;
}

.divider {
    position: absolute;
    top: 315.5px;
    left: 49.5px;
    border-top: 1px solid #000;
    box-sizing: border-box;
    width: 277px;
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