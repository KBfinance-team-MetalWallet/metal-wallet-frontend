<template>
    <div :class="$style.div">
        <Icon icon="solar:wallet-outline" :class="$style.solarwalletOutlineIcon" />
        <b :class="$style.b">강철지갑</b>
        <div :class="$style.groupParent">
            <div :class="$style.parent">
                <b :class="$style.b1">전자지갑</b>
                <b :class="$style.b2">티켓 보관함</b>
            </div>
            <img :class="$style.groupChild" :src="line7Image" alt="Line 7" />
        </div>
        <div :class="$style.child" />
        <div :class="$style.group">
            <div :class="$style.b1">나의 예매 내역</div>
            <div :class="$style.div2">&gt;</div>
        </div>
        <div :class="$style.item" />
        <b :class="$style.my">My 뮤지컬 해시태그</b>
        <img :class="$style.image203Icon" alt="" :src="image203Icon" />
        <div :class="$style.rectangleParent">
            <div :class="$style.groupItem" />
            <div :class="$style.div3">사용자의 예매 내역을 바탕으로 생성된 해시태그입니다. </div>
        </div>
        <div :class="$style.menuItem">
            <div :class="$style.button">
                <b :class="$style.b3">#알라딘</b>
            </div>
            <div :class="$style.button">
                <b :class="$style.b3">#시카고</b>
            </div>
            <div :class="$style.button">
                <b :class="$style.b3">#발랄한</b>
            </div>
            <div :class="$style.button">
                <b :class="$style.b6">#캣츠</b>
            </div>
            <div :class="$style.button">
                <b :class="$style.b6">#신작</b>
            </div>
        </div>
        <div :class="$style.div4">
            <div :class="$style.inner" />
            <div :class="$style.groupContainer">
                <div :class="$style.container">
                    <div :class="$style.div5">홈</div>
                    <img :class="$style.iconexlineTwoTonehome" alt="" :src="homeIcon" />
                </div>
                <div :class="$style.groupDiv">
                    <div :class="$style.div6">티켓</div>
                    <img :class="$style.iconexlineTwoTonecoupon3" alt="" :src="couponIcon" />
                </div>
                <div :class="$style.parent1">
                    <div :class="$style.div6">마이</div>
                    <img :class="$style.iconexlineTwoTonehome" alt="" :src="userIcon" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
// Import images
import line7Image from '@/assets/mypages/Line 7.svg';
import image203Icon from '@/assets/mypages/image 203.png';
import homeIcon from '@/assets/Iconex/Line Two Tone/Home.svg';
import couponIcon from '@/assets/Iconex/Line Two Tone/Coupon 3.svg';
import userIcon from '@/assets/Iconex/Line Two Tone/User.svg';

export default defineComponent({
    name: "TicketStorage",
    components: {
        Icon,
    },
    data() {
        return {
            line7Image,
            image203Icon,
            homeIcon,
            couponIcon,
            userIcon,
        };
    },
});
</script>
<style module>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap');

body {
    margin: 0;
    line-height: normal;
}

.solarwalletOutlineIcon {
    position: absolute;
    top: 11px;
    left: 14px;
    width: 24px;
    height: 24px;
    overflow: hidden;
    color: #c54966;
}

.b {
    position: absolute;
    top: 14px;
    left: 43px;
}

.b1 {
    position: absolute;
    top: 0px;
    left: 0px;
}

.b2 {
    position: absolute;
    top: 0px;
    left: 147px;
    color: #c54966;
}

.parent {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 231px;
    height: 19px;
}

.groupChild {
    position: absolute;
    top: 26px;
    left: 146px;
    max-height: 100%;
    width: 91px;
}

.groupParent {
    position: absolute;
    top: 78px;
    left: 77px;
    width: 237px;
    height: 26px;
}

.child {
    position: absolute;
    top: 355.5px;
    left: -0.5px;
    border-top: 1px solid rgba(110, 110, 110, 0.37);
    box-sizing: border-box;
    width: 376px;
    height: 1px;
}

.div2 {
    position: absolute;
    top: 0px;
    left: 317px;
}

.group {
    position: absolute;
    top: 390px;
    left: 23px;
    width: 326px;
    height: 19px;
    color: #000;
}

.item {
    position: absolute;
    top: 147px;
    left: 17px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    background-color: #fff;
    width: 334px;
    height: 164px;
}

.my {
    position: absolute;
    top: 163px;
    left: 37px;
    color: #c54966;
}

.image203Icon {
    position: absolute;
    top: 167px;
    left: 180px;
    width: 12px;
    height: 13px;
    object-fit: cover;
}

.groupItem {
    position: absolute;
    top: 0px;
    left: 0px;
    backdrop-filter: blur(4px);
    border-radius: 10px;
    background-color: rgba(217, 217, 217, 0.5);
    width: 152px;
    height: 14px;
}

.div3 {
    position: absolute;
    top: 3px;
    left: 2px;
    font-weight: 100;
}

.rectangleParent {
    position: absolute;
    top: 164px;
    left: 196px;
    width: 152px;
    height: 14px;
    font-size: 6px;
    color: #000;
}

.b3 {
    position: absolute;
    top: 5.75px;
    left: calc(48% - 25px);
    line-height: 22.5px;
}

.button {
    width: 84px;
    position: relative;
    border-radius: 32px;
    background-color: #e47f96;
    height: 34px;
}

.b6 {
    position: absolute;
    top: 4.75px;
    left: calc(50% - 18px);
    line-height: 22.5px;
}

.menuItem {
    position: absolute;
    top: 192px;
    left: calc(50% - 161.5px);
    width: 310px;
    overflow: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: center;
    padding: 0px 5px;
    box-sizing: border-box;
    gap: 8px;
    text-align: center;
    font-size: 15px;
    color: #fff;
}

.inner {
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

.div5 {
    position: absolute;
    height: 35%;
    width: 50%;
    top: 65%;
    left: 25%;
    display: inline-block;
}

.iconexlineTwoTonehome {
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

.container {
    position: absolute;
    height: 100%;
    width: 8.82%;
    top: 0%;
    right: 91.18%;
    bottom: 0%;
    left: 0%;
    color: #c54966;
}

.div6 {
    position: absolute;
    height: 35%;
    width: 109%;
    top: 65%;
    left: -4%;
    display: inline-block;
}

.iconexlineTwoTonecoupon3 {
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
    object-fit: cover;
}

.groupDiv {
    position: absolute;
    height: 100%;
    width: 8.82%;
    top: 0%;
    right: 45.59%;
    bottom: 0%;
    left: 45.59%;
}

.parent1 {
    position: absolute;
    height: 100%;
    width: 8.82%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 91.18%;
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

.div4 {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 375px;
    height: 68px;
    font-size: 13px;
    color: #2b3f6c;
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