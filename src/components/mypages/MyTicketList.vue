<template>
    <div :class="$style.div">
        <div :class="$style.child" />
        <div :class="$style.weuibackFilledParent">
            <img :class="$style.weuibackFilledIcon" alt="" :src="backIcon" />
            <b :class="$style.b">뒤로가기</b>
        </div>
        <div :class="$style.rectangleParent">
            <div :class="$style.groupChild" />
            <img :class="$style.image200Icon" alt="" :src="Image200" />
            <div :class="$style.alladdinTheMusical">뮤지컬 &lt;알라딘&gt; 한국 초연 (ALLADDIN The Musical) - 2매</div>
            <div :class="$style.div1">
                <p :class="$style.p">예매번호</p>
                <p :class="$style.p">예매일</p>
                <p :class="$style.p">장소</p>
                <p :class="$style.p">관람일시</p>
                <p :class="$style.p">좌석</p>
                <p :class="$style.p">취소가능일시</p>
                <p :class="$style.p">상태</p>
            </div>
            <div :class="$style.t200098371820231205Container">
                <p :class="$style.p">T2000983718</p>
                <p :class="$style.p">2023.12.05</p>
                <p :class="$style.p">계명아트센터</p>
                <p :class="$style.p">2024.01.02(화) 19:30</p>
                <p :class="$style.p">R석 11열 6, R석 11열 7</p>
                <p :class="$style.p">2024.01.01(월) 17:00 까지</p>
                <p :class="$style.p11">예매완료</p>
            </div>
            <div :class="$style.groupItem" />
            <div :class="$style.groupInner" />
            <div :class="$style.div2">교환 신청</div>
            <div :class="$style.div3">티켓 취소</div>
        </div>
        <div :class="$style.inner" />
        <img :class="$style.image200Icon1" alt="" :src="Image200" />
        <div :class="$style.alladdinTheMusical1">뮤지컬 &lt;알라딘&gt; 한국 초연 (ALLADDIN The Musical) - 2매</div>
        <div :class="$style.div4">
            <p :class="$style.p">예매번호</p>
            <p :class="$style.p">예매일</p>
            <p :class="$style.p">장소</p>
            <p :class="$style.p">관람일시</p>
            <p :class="$style.p">좌석</p>
            <p :class="$style.p">취소가능일시</p>
            <p :class="$style.p">상태</p>
        </div>
        <div :class="$style.t200098371820231204Container">
            <p :class="$style.p">T2000983718</p>
            <p :class="$style.p">2023.12.04</p>
            <p :class="$style.p">계명아트센터</p>
            <p :class="$style.p">2024.01.02(화) 19:30</p>
            <p :class="$style.p">R석 11열 6, R석 11열 7</p>
            <p :class="$style.p">2024.01.01(월) 17:00 까지</p>
            <p :class="$style.p11">취소됨</p>
        </div>
        <div :class="$style.rectangleDiv" />
        <img :class="$style.image200Icon2" alt="" :src="Image200" />
        <div :class="$style.alladdinTheMusical2">뮤지컬 &lt;알라딘&gt; 한국 초연 (ALLADDIN The Musical) - 1매</div>
        <div :class="$style.div5">
            <p :class="$style.p">교환번호</p>
            <p :class="$style.p">교환 신청일</p>
            <p :class="$style.p">장소</p>
            <p :class="$style.p">관람일시</p>
            <p :class="$style.p">좌석</p>
            <p :class="$style.p">선호 관람일시</p>
            <p :class="$style.p">선호 좌석</p>
            <p :class="$style.p">취소가능일시</p>
            <p :class="$style.p">상태</p>
        </div>
        <div :class="$style.t200098371820231203Container">
            <p :class="$style.p">T2000983718</p>
            <p :class="$style.p">2023.12.03</p>
            <p :class="$style.p">계명아트센터</p>
            <p :class="$style.p">2024.01.02(화) 19:30</p>
            <p :class="$style.p">R석 11열 6</p>
            <p :class="$style.p">2024.01.01(월) 17:00</p>
            <p :class="$style.p">R석 9열 5</p>
            <p :class="$style.p">2024.01.01(월) 17:00 까지</p>
            <p :class="$style.p11">교환신청</p>
        </div>
        <div :class="$style.child1" />
        <div :class="$style.child2" />
        <div :class="$style.div6">교환 취소</div>
        <div :class="$style.div7">티켓 취소</div>
        <div :class="$style.div8">
            <div :class="$style.child3" />
            <div :class="$style.groupParent">
                <div :class="$style.parent">
                    <div :class="$style.div9">홈</div>
                    <img :class="$style.iconexlineTwoTonehome" alt="" :src="homeIcon" />
                </div>
                <div :class="$style.group">
                    <div :class="$style.div10">티켓</div>
                    <img :class="$style.iconexlineTwoTonecoupon3" alt="" :src="couponIcon" />
                </div>
                <div :class="$style.container">
                    <div :class="$style.div10">마이</div>
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
import backIcon from '@/assets/mypages/backIcon.svg';
import Image200 from '@/assets/mypages/image 200.png';
import homeIcon from '@/assets/Iconex/Line Two Tone/Home.svg';
import couponIcon from '@/assets/Iconex/Line Two Tone/Coupon 3.svg';
import userIcon from '@/assets/Iconex/Line Two Tone/User.svg';

export default defineComponent({
    name: "MyTicketList",
    components: {
        Icon,
    },
    data() {
        return {
            backIcon,
            Image200,
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

.child {
    position: absolute;
    top: 65px;
    left: 0px;
    background-color: #fff;
    width: 375px;
    height: 208px;
}

.item {
    position: absolute;
    top: 229px;
    left: 53px;
    width: 107px;
    height: 26px;
}

.groupChild {
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #fff;
    width: 375px;
    height: 208px;
}

.image200Icon {
    position: absolute;
    top: 59px;
    left: 26px;
    width: 73.9px;
    height: 91.1px;
    object-fit: cover;
}

.alladdinTheMusical {
    position: absolute;
    top: 9px;
    left: 26px;
    font-size: 13px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 600;
    display: inline-block;
    width: 300px;
    height: 16.1px;
}

.p {
    margin: 0;
}

.div1 {
    position: absolute;
    top: 42px;
    left: 131px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.44);
    display: inline-block;
    width: 59.7px;
    height: 105.3px;
}

.p11 {
    margin: 0;
    color: #c54966;
}

.t200098371820231205Container {
    position: absolute;
    top: 42.99px;
    left: 210.25px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 500;
    display: inline-block;
    width: 132.8px;
    height: 105.3px;
}

.groupItem {
    position: absolute;
    top: 164px;
    left: 26px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #c54966;
    box-sizing: border-box;
    width: 150px;
    height: 31px;
}

.groupInner {
    position: absolute;
    top: 164px;
    left: 190px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #6e6e6e;
    box-sizing: border-box;
    width: 150px;
    height: 31px;
}

.div2 {
    position: absolute;
    top: 170px;
    left: 74px;
    font-size: 14px;
    font-family: Roboto;
    color: #c54966;
    text-align: center;
}

.div3 {
    position: absolute;
    top: 170px;
    left: 238px;
    font-size: 14px;
    font-family: Roboto;
    text-align: center;
}

.rectangleParent {
    position: absolute;
    top: 65px;
    left: 1px;
    width: 375px;
    height: 208px;
}

.inner {
    position: absolute;
    top: 288px;
    left: 0px;
    background-color: #fff;
    width: 375px;
    height: 168px;
}

.image200Icon1 {
    position: absolute;
    top: 347px;
    left: 26px;
    width: 73.9px;
    height: 91.1px;
    object-fit: cover;
}

.alladdinTheMusical1 {
    position: absolute;
    top: 297px;
    left: 26px;
    font-size: 13px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 600;
    display: inline-block;
    width: 300px;
    height: 16.1px;
}

.div4 {
    position: absolute;
    top: 330px;
    left: 131px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.44);
    display: inline-block;
    width: 59.7px;
    height: 105.3px;
}

.t200098371820231204Container {
    position: absolute;
    top: 330.99px;
    left: 210.25px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 500;
    display: inline-block;
    width: 132.8px;
    height: 105.3px;
}

.rectangleDiv {
    position: absolute;
    top: 480px;
    left: -1px;
    background-color: #fff;
    width: 375px;
    height: 235px;
}

.image200Icon2 {
    position: absolute;
    top: 539px;
    left: 25px;
    width: 73.9px;
    height: 91.1px;
    object-fit: cover;
}

.alladdinTheMusical2 {
    position: absolute;
    top: 489px;
    left: 25px;
    font-size: 13px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 600;
    display: inline-block;
    width: 300px;
    height: 16.1px;
}

.div5 {
    position: absolute;
    top: 522px;
    left: 130px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.44);
    display: inline-block;
    width: 63.7px;
    height: 105.3px;
}

.t200098371820231203Container {
    position: absolute;
    top: 522.99px;
    left: 209.25px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 500;
    display: inline-block;
    width: 132.8px;
    height: 105.3px;
}

.child1 {
    position: absolute;
    top: 669px;
    left: 25px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #c54966;
    box-sizing: border-box;
    width: 150px;
    height: 31px;
}

.child2 {
    position: absolute;
    top: 669px;
    left: 189px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #6e6e6e;
    box-sizing: border-box;
    width: 150px;
    height: 31px;
}

.div6 {
    position: absolute;
    top: 675px;
    left: 73px;
    font-size: 14px;
    font-family: Roboto;
    color: #c54966;
    text-align: center;
}

.div7 {
    position: absolute;
    top: 675px;
    left: 237px;
    font-size: 14px;
    font-family: Roboto;
    text-align: center;
}

.weuibackFilledIcon {
    position: absolute;
    top: 2px;
    left: 0px;
    width: 11px;
    height: 22px;
    overflow: hidden;
}

.b {
    position: absolute;
    top: 2px;
    left: 13px;
}

.weuibackFilledParent {
    position: absolute;
    top: 12px;
    left: 14px;
    width: 77px;
    height: 22px;
    font-size: 16px;
    color: #6e6e6e;
    font-family: Roboto;
}

.child3 {
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

.div9 {
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

.parent {
    position: absolute;
    height: 100%;
    width: 8.82%;
    top: 0%;
    right: 91.18%;
    bottom: 0%;
    left: 0%;
    color: #c54966;
}

.div10 {
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

.group {
    position: absolute;
    height: 100%;
    width: 8.82%;
    top: 0%;
    right: 45.59%;
    bottom: 0%;
    left: 45.59%;
}

.container {
    position: absolute;
    height: 100%;
    width: 8.82%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 91.18%;
}

.groupParent {
    position: absolute;
    height: 58.82%;
    width: 72.53%;
    top: 23.53%;
    right: 13.87%;
    bottom: 17.65%;
    left: 13.6%;
}

.div8 {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 375px;
    height: 68px;
    font-size: 13px;
    color: #2b3f6c;
    font-family: Roboto;
}

.div {
    width: 100%;
    position: relative;
    background-color: #fafafa;
    height: 812px;
    overflow: hidden;
    text-align: left;
    font-size: 10px;
    color: #000;
    font-family: Inter;
}
</style>