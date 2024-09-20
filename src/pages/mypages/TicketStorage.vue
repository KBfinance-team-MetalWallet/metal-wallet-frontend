<template>
    <div :class="$style.div">
        <MainHeader />
        <MyPageTabs />
        <div :class="$style.child" />
        <div :class="$style.group">
            <div :class="$style.b1">나의 예매 내역</div>
            <div :class="$style.div2">&gt;</div>
        </div>
        <div :class="$style.rectangleParent">
            <div :class="$style.groupItem" />
            <b :class="$style.my">My 뮤지컬 해시태그</b>
            <img :class="$style.image203Icon" alt="" :src="image203Icon" />

            <div :class="$style.rectangleGroup">
                <div :class="$style.groupInner" />
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
                <div :class="$style.button">
                    <b :class="$style.b6">#신작</b>
                </div>
                <div :class="$style.button">
                    <b :class="$style.b6">#신작</b>
                </div>
            </div>
        </div>
        <Footer />
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

import Footer from '@/components/Footer.vue';
import MainHeader from '../../components/MainHeader.vue';
import MyPageTabs from '../../components/mypages/MyPageTabs.vue';

export default defineComponent({
    name: "TicketStorage",
    components: {
        MainHeader,
        MyPageTabs,
        Icon,
        Footer
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
    top: 0px;
    left: 0px;
}

.b2 {
    position: absolute;
    top: 0px;
    left: 153px;
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

.groupItem {
    position: absolute;
    top: 0px;
    left: 0px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    background-color: #fff;
    width: 334px;
    height: 164px;
}

.my {
    position: absolute;
    top: 16px;
    left: 20px;
}

.image203Icon {
    position: absolute;
    top: 17px;
    left: 161px;
    width: 12px;
    height: 13px;
    object-fit: cover;
}

.groupInner {
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
    left: 7px;
    font-weight: 100;
}

.rectangleGroup {
    position: absolute;
    top: 17px;
    left: 179px;
    width: 152px;
    height: 14px;
    font-size: 6px;
    color: #000;
}

.b3 {
    position: absolute;
    top: 4.75px;
    left: calc(50% - 25px);
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
    top: calc(50% - 37px);
    left: calc(50% - 158px);
    width: 310px;
    overflow: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
    padding: 0px 5px;
    box-sizing: border-box;
    gap: 8px;
    text-align: center;
    font-size: 15px;
    color: #fff;
}

.rectangleParent {
    position: absolute;
    top: 147px;
    left: 17px;
    width: 334px;
    height: 164px;
    color: #c54966;
}

.item {
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
    width: 100%;
    top: 65%;
    left: 0%;
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