<template>
    <div :class="$style.div">
        <BackHeader />
        <MainContent :tickets="tickets" />
        <CancelDialog v-if="isCancelDialogVisible" />
        <Footer />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BackHeader from '@/components/BackHeader.vue';
import MainContent from '@/components/mypages/MainContent.vue';
import Footer from '@/components/Footer.vue';
import image200 from '@/assets/mypages/image 200.png'; // 이미지 파일 import
import CancelDialog from '../../components/mypages/CancelDialog.vue';

export default defineComponent({
    name: 'MyTicketList',
    components: {
        BackHeader,
        MainContent,
        CancelDialog,
        Footer
    },
    data() {
        return {
            tickets: [
                {
                    id: 'T200098371820231205',
                    title: '뮤지컬 <알라딘> 한국 초연 (ALLADDIN The Musical) - 2매',
                    date: '2023.12.05',
                    venue: '계명아트센터',
                    time: '2024.01.02(화) 19:30',
                    seats: 'R석 11열 6, R석 11열 7',
                    cancelBy: '2024.01.01(월) 17:00 까지',
                    status: '예매완료',
                    image: image200,
                },
                {
                    id: 'T200098371820231204',
                    title: '뮤지컬 <알라딘> 한국 초연 (ALLADDIN The Musical) - 2매',
                    date: '2023.12.03',
                    venue: '계명아트센터',
                    time: '2024.01.02(화) 19:30',
                    seats: 'R석 11열 6',
                    cancelBy: '2024.01.01(월) 17:00',
                    status: '교환신청',
                    image: image200,
                },
                {
                    id: 'T200098371820231203',
                    title: '뮤지컬 <알라딘> 한국 초연 (ALLADDIN The Musical) - 2매',
                    date: '2023.12.04',
                    venue: '계명아트센터',
                    time: '2024.01.02(화) 19:30',
                    seats: 'R석 11열 6, R석 11열 7',
                    cancelBy: '2024.01.01(월) 17:00 까지',
                    status: '취소됨',
                    image: image200,
                },
            ],
            isCancelDialogVisible: true,
        };
    },
    methods: {
        openCancelDialog() {
            this.isCancelDialogVisible = true;
        },
        closeCancelDialog() {
            this.isCancelDialogVisible = false;
        },
        confirmCancel() {
            // 취소 로직 처리
            this.isCancelDialogVisible = false;
            console.log('티켓이 취소되었습니다.');
        }
    }
});
</script>

<style module>
body {
    margin: 0;
}

/* 티켓 취소 */
.cancelDialog {
    position: absolute;
    top: 638px;
    left: -1px;
    width: 376px;
    height: 106px;
    text-align: center;
    font-size: 13px;
}

.dialogBackground {
    position: absolute;
    top: 0px;
    left: 1px;
    width: 375px;
    height: 105px;
}

.dialogContent {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.dialogBackgroundOverlay {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 15px 15px 0 0;
    background-color: #fff;
}

.dialogMessage {
    position: absolute;
    top: 23px;
    left: 0px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 600;
    display: inline-block;
    width: 376px;
    height: 16px;
}

.cancelButton {
    position: absolute;
    top: 75px;
    left: 0px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 500;
    display: inline-block;
    width: 188px;
    height: 16px;
}

.confirmButton {
    position: absolute;
    top: 75px;
    left: 188px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 500;
    color: #c54966;
    display: inline-block;
    width: 188px;
    height: 16px;
}

.horizontalDivider {
    position: absolute;
    top: 59.5px;
    left: -0.5px;
    border-top: 1px solid rgba(110, 110, 110, 0.44);
    box-sizing: border-box;
    width: 377px;
    height: 1px;
}

.verticalDivider {
    position: absolute;
    top: 59.5px;
    left: 187.5px;
    border-right: 1px solid rgba(110, 110, 110, 0.44);
    box-sizing: border-box;
    width: 1px;
    height: 47px;
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
    font-family: Roboto;
}
</style>
