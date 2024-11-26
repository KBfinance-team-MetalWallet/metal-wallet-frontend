<template>
    <div :class="$style.alert">
        <div :class="$style.overlay">
            <div :class="$style.blurBackground" />
        </div>
        <div :class="$style.titleAndDescription">
            <b :class="$style.title">알림</b>
            <div :class="$style.description">비밀번호를 확인해주세요.</div>
        </div>
        <div :class="$style.footer">
            <div :class="$style.confirmButton">확인</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "Alert"
})
</script>

<style module>
@import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre+ExtraBold:wght@400&display=swap');

body {
    margin: 0;
    line-height: normal;
}

.blurBackground {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 0%;
    backdrop-filter: blur(50px);
    background: rgba(179, 179, 179, 0.82);
}

.overlay {
    width: 100%;
    position: absolute;
    margin: 0 !important;
    height: 100%;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    overflow: hidden;
    z-index: 0;
}

.title {
    align-self: stretch;
    position: relative;
    letter-spacing: -0.43px;
    line-height: 22px;
}

.description {
    align-self: stretch;
    position: relative;
    font-size: 13px;
    letter-spacing: -0.08px;
    line-height: 18px;
}

.titleAndDescription {
    width: 270px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 16px 15px;
    box-sizing: border-box;
    gap: 2px;
    z-index: 1;
}

.confirmButton {
    position: absolute;
    top: calc(50% - 11px);
    left: calc(50% - 16px);
    letter-spacing: -0.43px;
    line-height: 22px;
}

.footer {
    align-self: stretch;
    position: relative;
    border-top: 0.3px solid rgba(128, 128, 128, 0.55);
    box-sizing: border-box;
    height: 44px;
    z-index: 2;
    color: #007aff;
}

.alert {
    position: relative;
    border-radius: 14px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 19px 0px 0px;
    box-sizing: border-box;
    gap: 2px;
    text-align: center;
    font-size: 17px;
    color: #000;
    font-family: 'Abhaya Libre';
}
</style>