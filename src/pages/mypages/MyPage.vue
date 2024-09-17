<template>
    <div :class="$style.pageContainer">
        <Icon icon="solar:wallet-outline" :class="$style.walletIcon" />
        <b :class="$style.pageTitle">강철지갑</b>
        <div :class="$style.walletSection">
            <div :class="$style.walletInfo">
                <b :class="$style.walletType">전자지갑</b>
                <b :class="$style.walletStorage">티켓 보관함</b>
            </div>
            <img :class="$style.walletImage" :src="line7Image" alt="Line 7" />
        </div>
        <div :class="$style.walletSection">
            <div :class="$style.walletInfo">
                <b :class="$style.walletType">전자지갑</b>
                <b :class="$style.walletStorage">티켓 보관함</b>
            </div>
            <img :class="$style.walletImage" :src="line7Image" alt="Line 7" />
        </div>
        <div :class="$style.separator"></div>
        <div :class="$style.historyContainer">
            <div :class="$style.historyTitle">전자지갑 결제내역</div>
            <div :class="$style.arrow">&gt;</div>
        </div>
        <div :class="$style.certificationContainer">
            <div :class="$style.certificationTitle">공인인증서 관리 / 발급</div>
            <div :class="$style.arrow">&gt;</div>
        </div>
        <div :class="$style.cardList">
            <div :class="$style.card">
                <div :class="$style.cardContent">
                    <div :class="$style.accountNumber">출금계좌 : 420220-01-123456</div>
                    <div :class="$style.balance">$23,345.43</div>
                    <img :class="$style.bankLogo" :src="imageIcon" alt="Bank Logo" />
                    <div :class="$style.bankName">국민은행</div>
                </div>
            </div>
            <div :class="$style.cardAlternate">
                <div :class="$style.cardContent">
                    <div :class="$style.accountNumber">출금계좌 : 981234-01-123456</div>
                    <div :class="$style.balance">$23,345.43</div>
                    <img :class="$style.bankLogo" :src="imageIcon" alt="Bank Logo" />
                    <div :class="$style.bankName">현대카드</div>
                </div>
            </div>
        </div>
        <div :class="$style.cardSection">
            <div class="container">
                <div class="circle circle1"></div>
                <div class="circle circle2"></div>
                <div class="circle circle3"></div>
            </div>
            <img :class="$style.groupImage" :src="group122Image" alt="Group Image" />
            <div :class="$style.cardContentHighlighted">
                <div :class="$style.accountNumber">출금계좌 : 111111-01-123456</div>
                <div :class="$style.balance">$23,345.43</div>
                <img :class="$style.bankLogo" :src="imageIcon" alt="Bank Logo" />
                <div :class="$style.bankName">토스</div>
            </div>
        </div>
        <div :class="$style.footer">
            <div :class="$style.footerItem"></div>
            <div :class="$style.footerNav">
                <div :class="$style.navItem">
                    <img :class="$style.navIcon" alt="" :src="homeIcon" />
                    <div :class="$style.navTitle">홈</div>
                </div>
                <div :class="$style.navItem">
                    <img :class="$style.navIcon" alt="" :src="couponIcon" />
                    <div :class="$style.navTitle">티켓</div>
                </div>
                <div :class="$style.navItem">
                    <img :class="$style.navIcon" alt="" :src="userIcon" />
                    <div :class="$style.navTitle">마이</div>
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
import imageIcon from '@/assets/mypages/tossImage.jpg';
import group122Image from '@/assets/mypages/Group 122.png';
import homeIcon from '@/assets/Iconex/Line Two Tone/Home.svg';
import couponIcon from '@/assets/Iconex/Line Two Tone/Coupon 3.svg';
import userIcon from '@/assets/Iconex/Line Two Tone/User.svg';

export default defineComponent({
    name: "MyPage",
    components: {
        Icon,
    },
    data() {
        return {
            line7Image,
            imageIcon,
            group122Image,
            homeIcon,
            couponIcon,
            userIcon,
        };
    },
});
</script>

<style module>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@500&display=swap');

body {
    margin: 0;
    padding: 0;
    line-height: normal;
}

.pageContainer {
    width: 100%;
    position: relative;
    background-color: #fafafa;
    height: 812px;
    overflow: hidden;
    text-align: left;
    font-size: 16px;
    color: #c54966;
    font-family: Roboto;
}

.walletIcon {
    position: absolute;
    top: 11px;
    left: 14px;
    width: 24px;
    height: 24px;
    overflow: hidden;
}

.pageTitle {
    position: absolute;
    top: 14px;
    left: 43px;
    color: #6e6e6e;
}

.walletSection {
    position: absolute;
    top: 78px;
    left: 59px;
    width: 242px;
    height: 25.5px;
}

.walletInfo {
    position: absolute;
    top: 0;
    left: 11px;
    width: 231px;
    height: 19px;
}

.walletType {
    position: absolute;
    top: 0;
    left: 0;
}

.walletStorage {
    position: absolute;
    top: 0;
    left: 145px;
    color: #6e6e6e;
}

.walletImage {
    position: absolute;
    top: 25.5px;
    left: 0;
    max-height: 100%;
    width: 80px;
}

.separator {
    position: absolute;
    top: 352.5px;
    left: -0.5px;
    border-top: 1px solid rgba(110, 110, 110, 0.37);
    box-sizing: border-box;
    width: 376px;
    height: 1px;
}

.arrow {
    position: absolute;
    top: 0;
    left: 317px;
}

.historyContainer {
    position: absolute;
    top: 387px;
    left: 23px;
    width: 326px;
    height: 19px;
    color: #000;
}

.certificationContainer {
    position: absolute;
    top: 429px;
    left: 23px;
    width: 326px;
    height: 24px;
    color: #000;
}

.cardList {
    position: absolute;
    top: 127px;
    left: 13px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    color: #575757;
}

.card {
    width: 335px;
    position: relative;
    height: 175px;
}

.cardAlternate {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-left: -322px;
}

.cardContent {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 15px;
    background-color: #f9c505;
    width: 335px;
    height: 175px;
    overflow: hidden;
}

.cardContentHighlighted {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    background-color: #d7f905;
    width: 335px;
    height: 175px;
    overflow: hidden;
}

.accountNumber {
    position: absolute;
    top: 100px;
    left: 22px;
    letter-spacing: 0.1px;
    line-height: 120%;
    font-weight: 500;
}

.balance {
    position: absolute;
    top: 50px;
    left: 22px;
    font-size: 24px;
    letter-spacing: 0.1px;
    line-height: 160%;
    font-weight: 500;
    color: #000;
}

.bankLogo {
    position: absolute;
    top: 19px;
    left: 239px;
    width: 72px;
    height: 72px;
    object-fit: cover;
}

.bankName {
    position: absolute;
    top: 19px;
    left: 22px;
    letter-spacing: 0.1px;
    line-height: 120%;
    font-weight: 500;
}

.cardSection {
    position: absolute;
    top: 127px;
    left: 19px;
    width: 335px;
    height: 211px;
    color: #575757;
}

.groupImage {
    position: absolute;
    top: 199px;
    left: 142px;
    width: 52px;
    height: 12px;
}

.footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 375px;
    height: 68px;
    font-size: 13px;
    color: #2b3f6c;
    background-color: #fff;
    border-top: 1px solid #e0e0e0;
}

.footerItem {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    border-radius: 15px 15px 0 0;
    background-color: #fff;
}

.footerNav {
    position: absolute;
    height: 58.82%;
    width: 72.53%;
    top: 23.53%;
    right: 13.87%;
    bottom: 17.65%;
    left: 13.6%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navItem {
    position: relative;
    width: 8.82%;
    text-align: center;
}

.navIcon {
    display: block;
    max-width: 100%;
    max-height: 60%;
    margin: 0 auto;
    margin-bottom: 5px;
    /* 아이콘 아래에 여백 추가 */
}

.navTitle {
    font-size: 12px;
    color: #2b3f6c;
    margin-top: 0;
    /* 제목 위 여백 제거 */
}


.navIcon {
    display: block;
    max-width: 100%;
    max-height: 60%;
    margin: 0 auto;
}
</style>
