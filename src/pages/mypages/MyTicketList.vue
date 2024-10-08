<template>
    <div :class="$style.div">
        <BackHeader />
        <div :class="$style.ticketContainer">
            <div :class="$style.groupParent">
                <TicketCard v-for="(ticket, index) in tickets" :key="index" :ticket="ticket"
                    @cancel-ticket="openCancelDialog" />
            </div>
            <div ref="loadMore" class="load-more-indicator" style="height: 1px; visibility: hidden;"></div>
            <div v-if="isLoading" class="loading-spinner">로딩 중...</div>
        </div>
        <CancelDialog v-if="isCancelDialogVisible" @confirm="confirmCancel" @close="closeCancelDialog" />
        <Footer />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from "axios";

import BackHeader from '@/components/BackHeader.vue';
import TicketCard from '@/components/mypages/TicketCard.vue';
import Footer from '@/components/Footer.vue';
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
            isCancelDialogVisible: false,
            selectedTicketId: null,
            token: localStorage.getItem("accessToken"),
            nextCursor: null,
            size: 10,
            isLoading: false,
            loadMoreObserver: null,
        };
    },
    computed: {
        tickets() {
            return this.ticketStore.tickets;
        }
    },
    methods: {
        openCancelDialog(ticketId) {
            this.selectedTicketId = ticketId;
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
                await this.fetchTickets(this.nextCursor);
                alert('티켓이 취소되었습니다.');
                this.closeCancelDialog();
            } catch (error) {
                console.error('티켓 취소 중 오류 발생:', error);
            }
        },
        setupObserver() {
            this.loadMoreObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && this.nextCursor && !this.isLoading) {
                        this.fetchTickets(this.nextCursor);
                    }
                });
            });

            this.loadMoreObserver.observe(this.$refs.loadMore);
        },
        cleanupObserver() {
            if (this.loadMoreObserver) {
                this.loadMoreObserver.unobserve(this.$refs.loadMore);
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
        },
        handleScroll(event) {
            const { scrollTop, scrollHeight, clientHeight } = event.target;
            const bottom = scrollHeight - scrollTop <= clientHeight + 1;

            if (bottom && this.nextCursor && !this.isLoading) {
                this.fetchTickets(this.nextCursor);
            }
        },
        async fetchTickets(cursor = null) {
            if (this.isLoading) return;
            this.isLoading = true;
            const newTickets = await this.ticketStore.fetchTickets(cursor);
            this.nextCursor = this.ticketStore.getNextCursor();
            this.isLoading = false;
        },
    },
    mounted() {
        this.fetchTickets();
        this.setupObserver();
    },
    beforeUnmount() {
        this.cleanupObserver();
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

.loading-spinner {
    text-align: center;
    margin: 20px;
}

.load-more-indicator {
    height: 1px;
    /* 최소 높이 설정 */
    visibility: hidden;
    /* 보이지 않게 설정 */
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
