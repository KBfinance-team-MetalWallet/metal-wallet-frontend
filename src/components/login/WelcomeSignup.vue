<template>
    <div :class="$style.div">
        <img :class="$style.imageIcon" alt="" src="@/assets/login/character1.png" />
        <img :class="$style.imageIcon1" alt="" src="@/assets/login/character1.png" />
        <div :class="$style.button">
            <b :class="$style.b">회원가입</b>
        </div>
        <b :class="$style.b1">강철이가 회원님을 기다리고 있어요~</b>
        <img :class="$style.imageIcon2" alt="" src="@/assets/login/character1.png" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
    name: "Frame"
})</script>
<style module>
.div {
    width: 375px;
    height: 812px;
    position: relative;
    background-color: #fafafa;
    overflow: hidden;
    text-align: center;
    font-size: 15px;
    color: #fff;
    font-family: Roboto;
}

.imageIcon {
    position: absolute;
    top: 167px;
    left: 168px;
    width: 56px;
    height: 69px;
    object-fit: cover;
}

.imageIcon1 {
    position: absolute;
    top: 221px;
    left: 178px;
    width: 131px;
    height: 143px;
    object-fit: cover;
}

.b {
    position: absolute;
    top: 14px;
    left: calc(50% - 27.5px);
}

.button {
    position: absolute;
    width: calc(100% - 56px);
    top: 706px;
    right: 28px;
    left: 28px;
    border-radius: 10px;
    background-color: #c54966;
    height: 50px;
}

.b1 {
    position: absolute;
    top: 553px;
    left: 36px;
    font-size: 20px;
    color: #c54966;
    text-align: left;
}

.imageIcon2 {
    position: absolute;
    top: 236px;
    left: 66px;
    width: 242px;
    height: 371px;
    object-fit: cover;
}

.div {
    width: 100%;
    position: relative;
    background-color: #fafafa;
    height: 812px;
    overflow: hidden;
    text-align: center;
    font-size: 15px;
    color: #fff;
    font-family: Roboto;
}
</style>