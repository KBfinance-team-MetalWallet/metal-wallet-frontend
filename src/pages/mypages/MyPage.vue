<template>
    <div :class="$style.div">
        <MainHeader />

        <div :class="$style.groupParent">
            <div :class="$style.parent">
                <div :class="[$style.b1, { [$style.activeTab]: selectedTab === 'wallet' }]"
                    @click="selectTab('wallet')">전자지갑</div>
                <div :class="[$style.b2, { [$style.activeTab]: selectedTab === 'tickets' }]"
                    @click="selectTab('tickets')">티켓 보관함</div>
            </div>
        </div>

        <div v-if="selectedTab === 'wallet'">
            <div :class="$style.groupDiv">
                <div :class="$style.div3">공인인증서 관리 / 발급</div>
                <div :class="$style.div2">&gt;</div>
            </div>
        </div>
        <div v-else-if="selectedTab === 'tickets'">
            <div :class="$style.groupDiv" @click="goToPage('/my-ticket-list')">
                <div :class="$style.child100"></div>
                <div :class="$style.div3">나의 예매 내역</div>
                <div :class="$style.div2">&gt;</div>
            </div>
        </div>
        <div v-if="selectedTab === 'wallet'" :class="$style.groupParent3">
            <FlipAccount :disableCardClick="true" />
            <div :class="$style.child100"></div>
        </div>

        <div v-else-if="selectedTab === 'tickets'" :class="$style.groupParent4">
            <TicketStorage />
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

import { Icon } from '@iconify/vue';
// Import images
import line7Image from '@/assets/mypages/Line 7.svg';
import imageIcon from '@/assets/mypages/tossImage.jpg';
import group122Image from '@/assets/mypages/Group 122.png';
import homeIcon from '@/assets/Iconex/Line Two Tone/Home.svg';
import couponIcon from '@/assets/Iconex/Line Two Tone/Coupon 3.svg';
import userIcon from '@/assets/Iconex/Line Two Tone/User.svg';

import FlipAccount from "@/components/home/FlipAccount.vue";
import TicketStorage from "@/components/mypages/TicketStorage.vue";
import Footer from '@/components/Footer.vue';
import MainHeader from '../../components/MainHeader.vue';
import MyPageTabs from '../../components/mypages/MyPageTabs.vue';

import { useAccountStore } from "@/stores/accounts.js";

export default defineComponent({
    name: "MyPage",
    components: {
        MainHeader,
        MyPageTabs,
        Icon,
        Footer,
        FlipAccount,
        TicketStorage
    },
    data() {
        const accountStore = useAccountStore();
        return {
            line7Image,
            imageIcon,
            group122Image,
            homeIcon,
            couponIcon,
            userIcon,
            selectedTab: 'wallet',
            accounts: accountStore.accounts,
        };
    },
    mounted() {
        const accountStore = useAccountStore();
        accountStore.fetchAccounts();
    },
    methods: {
        selectTab(tab) {
            console.log(tab)
            this.selectedTab = tab;
            this.$emit('tab-selected', tab);
        },
        goToPage(path) {
            this.$router.push(path);
        },
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
    color: #6e6e6e;
}

.b1 {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
    color: #6e6e6e;
    /* 기본 색상: 회색 */
    cursor: pointer;
}

.parent {
    position: absolute;
    top: 0px;
    left: 11px;
    width: 237px;
    height: 19px;
}

.groupChild {
    position: absolute;
    top: 25.5px;
    left: 0px;
    max-height: 100%;
    width: 80px;
}

.groupParent {
    position: absolute;
    top: 50px;
    left: 59px;
    width: 242px;
    font-size: 18px;
}

.child100 {
    position: fixed;
    /* position: absolute; */
    border-top: 1px solid rgba(110, 110, 110, 0.37);
    /* box-sizing: border-box; */
    top:350px;

    width: 350px;
    /* margin-top: 70px; */
    /* margin-bottom: 60px; */
}

.div2 {
    position: absolute;
    /* top: 0px; */
    left: 317px;
    margin-top: 10px;
}

.div3 {
    position: absolute;
    top: 5px;
    left: 0px;
    margin-top: 10px;
}

.groupDiv {
    position: absolute;
    top: 300px;
    left: 23px;
    width: 326px;
    height: 24px;
    color: #000;
}

.div5 {
    position: absolute;
    top: 100px;
    left: 22px;
    letter-spacing: 0.1px;
    line-height: 120%;
    font-weight: 500;
}

.div6 {
    position: absolute;
    top: 50px;
    left: 22px;
    font-size: 24px;
    letter-spacing: 0.1px;
    line-height: 160%;
    font-weight: 500;
    color: #000;
}

.imageIcon {
    position: absolute;
    top: 19px;
    left: 239px;
    width: 72px;
    height: 72px;
    object-fit: cover;
}

.div7 {
    position: absolute;
    top: 19px;
    left: 22px;
    letter-spacing: 0.1px;
    line-height: 120%;
    font-weight: 500;
}

.cardFrame {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 15px;
    background-color: #f9c505;
    width: 335px;
    height: 175px;
    overflow: hidden;
}

.card {
    width: 335px;
    position: relative;
    height: 175px;
}

.image {
    width: 335px;
    position: relative;
    border-radius: 15px;
    height: 175px;
    overflow: hidden;
    flex-shrink: 0;
    background-image: url('image.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
}

.card1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-left: -322px;
}

.cardFrame1 {
    width: 335px;
    position: relative;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    background-color: #d7f905;
    height: 175px;
    overflow: hidden;
    flex-shrink: 0;
    margin-left: -322px;
}

.cardParent {
    position: absolute;
    top: 127px;
    left: calc(50% - 180.5px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #575757;
    font-family: 'Readex Pro';
}

.Flipcard {

    margin-left: 10px;
}

.item {
    position: absolute;
    top: 326px;
    left: 161px;
    width: 52px;
    height: 12px;
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

.div15 {
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

.parent1 {
    position: absolute;
    height: 100%;
    width: 8.82%;
    top: 0%;
    right: 91.18%;
    bottom: 0%;
    left: 0%;
}

.div16 {
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

.parent2 {
    position: absolute;
    height: 100%;
    width: 8.82%;
    top: 0%;
    right: 45.59%;
    bottom: 0%;
    left: 45.59%;
}

.parent3 {
    position: absolute;
    height: 100%;
    width: 8.82%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 91.18%;
}

.groupParent1 {
    position: absolute;
    height: 58.82%;
    width: 72.53%;
    top: 23.53%;
    right: 13.87%;
    bottom: 17.65%;
    left: 13.6%;
}

.div {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #fafafa;
    overflow: hidden;
    text-align: left;
    font-size: 16px;
    color: #c54966;
}

/* tab */

.b2 {
    position: absolute;
    top: 0px;
    left: 153px;
    color: #6e6e6e;
    cursor: pointer;
    z-index: 10;
}

.activeTab {
    color: #c54966;
    font-weight: bold;
    border-bottom: 2px solid #c54966;
    /* 밑줄 추가 */
    padding-bottom: 4px;
    /* 밑줄과 텍스트 간격 */
}

.groupParent3 {
    position: absolute;
    top: 78px;
    left: 12px;
    width: 348px;
    height: 225.5px;
    margin-bottom: 10px;
}

.groupParent4 {
    position: absolute;
    top: 0%;
    width: fit-content;
    height: fit-content;
}
</style>