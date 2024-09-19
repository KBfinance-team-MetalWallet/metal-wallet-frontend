<template>
    <div :class="$style.div">
        <BackHeader />
        <MainContent :tickets="tickets" />
        <Footer />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BackHeader from '@/components/BackHeader.vue';
import MainContent from '@/components/mypages/MainContent.vue';
import Footer from '@/components/Footer.vue';
import image200 from '@/assets/mypages/image 200.png'; // 이미지 파일 import

export default defineComponent({
    name: 'MyTicketList',
    components: {
        BackHeader,
        MainContent,
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
            ]
        };
    }
});
</script>

<style module>
body {
    margin: 0;
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
