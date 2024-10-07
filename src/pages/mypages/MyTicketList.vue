<template>
    <div :class="$style.div">
        <BackHeader />
        <!-- 티켓 리스트 부분에 스크롤을 추가 -->
        <div :class="$style.ticketContainer">
            <div :class="$style.groupParent">
                <TicketCard v-for="(ticket, index) in tickets" :key="index" :ticket="ticket"
                    :status="getStatusText(ticket.ticketStatus)" />
            </div>
            <div ref="loadMoreTrigger" class="load-more-trigger"></div>
        </div>
        <CancelDialog v-if="isCancelDialogVisible" />
        <Footer />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from "axios";

import BackHeader from '@/components/BackHeader.vue';
import TicketCard from '@/components/mypages/TicketCard.vue';
import Footer from '@/components/Footer.vue';
import image200 from '@/assets/mypages/image 200.png'; // 이미지 파일 import
import CancelDialog from '../../components/mypages/CancelDialog.vue';

import { useTicketStore } from "@/stores/tickets.js";

export default defineComponent({
    name: 'MyTicketList',
    components: {
        BackHeader,
        TicketCard,
        CancelDialog,
        Footer
    },
    data() {
        return {
            ticketStore: useTicketStore(),
            tickets: [
                {
                    id: 'T200098371820231205',
                    title: '뮤지컬 <알라딘> 한국 초연 (ALLADDIN The Musical)',
                    createdAt: '2023.12.05',
                    venue: '계명아트센터',
                    scheduleDate: '2024.01.02(화)',
                    startTime: '19:30',
                    grade: 'R석',
                    seatNo: '0',
                    cancelUntil: '2024.01.01(월) 17:00 까지',
                    ticketStatus: '예매완료',
                    musicalImgName: image200,
                    posterImageUrl: ''
                },
                {
                    id: 'T200098371820231204',
                    title: '뮤지컬 <알라딘> 한국 초연 (ALLADDIN The Musical)',
                    createdAt: '2023.12.03',
                    venue: '계명아트센터',
                    scheduleDate: '2024.01.02(화)',
                    startTime: '19:30',
                    grade: 'R석',
                    seatNo: '0',
                    cancelUntil: '2024.01.01(월) 17:00',
                    ticketStatus: '교환신청',
                    musicalImgName: image200,
                    posterImageUrl: ''
                },
                {
                    id: 'T200098371820231203',
                    title: '뮤지컬 <알라딘> 한국 초연 (ALLADDIN The Musical)',
                    createdAt: '2023.12.04',
                    venue: '계명아트센터',
                    scheduleDate: '2024.01.02(화)',
                    startTime: '19:30',
                    grade: 'R석',
                    seatNo: '0',
                    cancelUntil: '2024.01.01(월) 17:00 까지',
                    ticketStatus: '취소됨',
                    musicalImgName: image200,
                    posterImageUrl: ''
                },
                {
                    id: 'T200098371820231203',
                    title: '뮤지컬 <알라딘> 한국 초연 (ALLADDIN The Musical)',
                    createdAt: '2023.12.04',
                    venue: '계명아트센터',
                    scheduleDate: '2024.01.02(화)',
                    startTime: '19:30',
                    grade: 'R석',
                    seatNo: '0',
                    cancelUntil: '2024.01.01(월) 17:00 까지',
                    ticketStatus: '취소됨',
                    musicalImgName: image200,
                    posterImageUrl: ''
                },
            ],
            isCancelDialogVisible: false,
            token: localStorage.getItem("accessToken"),
            visibleTickets: [],        // 화면에 보이는 티켓 데이터
            currentPage: 0,           // 현재 페이지 번호
            ticketsPerPage: 3,        // 페이지당 티켓 수
        };
    },
    computed: {
        tickets() {
            return this.ticketStore.tickets;
        },
    },
    methods: {
        // async fetchTickets() {
        //     try {
        //         const response = await axios.get('http://localhost:8080/api/tickets', {
        //             headers: {
        //                 Authorization: `Bearer ${this.token}`,
        //             },
        //         });
        //         console.log(response.data.result)
        //         this.tickets = response.data.result.content;
        //         this.loadMoreTickets(); // 초기 티켓 로드
        //     } catch (error) {
        //         console.error('티켓을 불러오는 중 오류 발생:', error);
        //     }
        // },
        loadMoreTickets() {
            const start = this.currentPage * this.ticketsPerPage;
            const end = start + this.ticketsPerPage;
            const newTickets = this.tickets.slice(start, end);

            if (newTickets.length > 0) {
                this.visibleTickets = [...this.visibleTickets, ...newTickets];
                this.currentPage++;
            }
        },
        openCancelDialog() {
            this.isCancelDialogVisible = true;
        },
        closeCancelDialog() {
            this.isCancelDialogVisible = false;
        },
        async confirmCancel() {
            try {
                const response = await axios.delete(`http://localhost:8080/api/tickets/${this.selectedTicketId}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });

                alert('티켓이 취소되었습니다.');

                // await this.fetchTickets();
                await this.ticketStore.fetchTickets();
                this.closeCancelDialog();
            } catch (error) {
                console.error('티켓 취소 중 오류 발생:', error);
            }
        },
        getStatusText(ticketStatus) {
            switch (ticketStatus) {
                case 'BOOKED':
                    return '예매완료';
                case 'CANCELED':
                    return '취소됨';
                case 'EXCHANGE_REQUESTED':
                    return '교환신청';
                case 'CHECKED':
                    return '사용됨';
                default:
                    return '알 수 없음';
            }
        }
    },
    mounted() {
        // mounted가 호출된 후 $refs가 완전히 준비되었는지 확인
        this.$nextTick(() => {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    this.loadMoreTickets();
                }
            });

            const loadMoreTrigger = this.$refs.loadMoreTrigger;
            if (loadMoreTrigger) {
                observer.observe(loadMoreTrigger);
            } else {
                console.error('loadMoreTrigger element가 존재하지 않습니다.');
            }
        });
        this.ticketStore.fetchTickets();
        // this.fetchTickets(); // 컴포넌트가 마운트될 때 티켓 데이터 가져오기
    },
});
</script>

<style module>
body {
    margin: 0;
}

/* 티켓 리스트에 스크롤을 적용하기 위한 컨테이너 */
.ticketContainer {
    height: 706px;
    overflow: auto;
    padding: 10px;
    top: 37px;
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
