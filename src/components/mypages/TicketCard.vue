<template>
    <div :class="$style.rectangleParent">
        <div :class="$style.rectangleGroup">
            <img :class="$style.image200Icon" alt="" :src="ticket.posterImageUrl" />
            <div :class="$style.alladdinTheMusical">{{ ticket.title }}</div>
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
                <p :class="$style.p">{{ ticket.id }}</p>
                <p :class="$style.p">{{ ticket.createdAt }}</p>
                <p :class="$style.p">{{ ticket.place }}</p>
                <p :class="$style.p">{{ ticket.scheduleDate }} {{ ticket.startTime }}</p>
                <p :class="$style.p">{{ ticket.grade }}석 {{ ticket.seatNo }}</p>
                <p :class="$style.p">{{ ticket.cancelUntil }} 까지</p>
                <p :class="$style.p11" :style="{ color: getStatusColor(ticket.ticketStatus) }">
                    {{ getStatusText(ticket.ticketStatus) }}</p>
            </div>
            <!-- <div v-if="ticket.ticketStatus === 'BOOKED' || ticket.ticketStatus === 'EXCHANGE_REQUESTED'"
                :class="[ticket.ticketStatus === 'BOOKED' ? 'bookedColor' : 'exchangeRequestedColor']" /> -->
            <!-- <div v-if="ticket.ticketStatus === 'BOOKED' || ticket.ticketStatus === 'EXCHANGE_REQUESTED'"
                :class="[$style.groupChild1]" /> -->


            <div v-if="ticket.ticketStatus === 'BOOKED'" @click="handleExchangeRequest"
                :class="$style.exchangeRequested">교환 신청</div>
            <div v-if="ticket.ticketStatus === 'EXCHANGE_REQUESTED'" @click="handleExchangeCancel"
                :class="$style.exchangeCancel">
                교환 취소</div>
                <div v-if="ticket.ticketStatus === 'BOOKED' || ticket.ticketStatus === 'EXCHANGE_REQUESTED'"
           :class="$style.ticketCancel"
           @click="handleTicketCancel">
        티켓 취소
      </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TicketCard',
    props: {
        ticket: {
            type: Object,
            required: true,
            default: () => ({
                id: '', // 예매번호
                title: '', // 공연 제목
                createdAt: '', // 예매일
                place: '', // 장소
                scheduleDate: '', // 관람일시
                startTime: '',// 관람시간
                grade: '', // 좌석 등급
                seatNo: '', // 좌석 번호
                cancelUntil: '', // 취소 가능 일시
                ticketStatus: '', // 상태
                musicalImgName: '', // 이미지 URL 또는 경로
            })
        }
    },
    methods: {
        handleTicketCancel() {
            // 티켓 취소 클릭 시 부모에게 이벤트 전달
            this.$emit('cancel-ticket', this.ticket.id); // ticket.id를 전달
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
        getStatusColor(ticketStatus) {
            switch (ticketStatus) {
                case 'BOOKED':
                    return '#28a745';
                case 'CANCELED':
                    return '#dc3545';
                case 'EXCHANGE_REQUESTED':
                    return '#fd7e14';
                case 'CHECKED':
                    return '#6c757d';
                default:
                    return '#000000';
            }
        },
        formatDate(dateArray, formatType) {
            const [year, month, day, hour, minute, second] = dateArray;
            const date = new Date(year, month - 1, day, hour, minute, second);
            const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
            const dayOfWeek = weekDays[date.getDay()];

            let formattedDate = `${year}.${month.toString().padStart(2, '0')}.${day
                .toString()
                .padStart(2, '0')}(${dayOfWeek})`;

            if (formatType === 'YMDHM') {
                formattedDate += ` ${hour.toString().padStart(2, '0')}:${minute
                    .toString()
                    .padStart(2, '0')}`;
            } else if (formatType === 'YMDHMS') {
                formattedDate += ` ${hour.toString().padStart(2, '0')}:${minute
                    .toString()
                    .padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
            }

            return formattedDate;
        },
    },
};
</script>

<style module>
.image200Icon {
    position: absolute;
    top: 35px;
    left: 26px;
    width: 89.9px;
    height: 114.1px;
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

.groupChild1 {
    position: absolute;
    top: 164px;
    left: 190px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #c54966;
    box-sizing: border-box;
    width: 150px;
    height: 31px;
}

:global(.bookedColor) {
    position: absolute;
    top: 164px;
    left: 26px;
    background-color: #fff;
    width: 150px;
    height: 31px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #4CAF50 !important;
}

:global(.exchangeRequestedColor) {
    position: absolute;
    top: 164px;
    left: 26px;
    background-color: #fff;
    width: 150px;
    height: 31px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #fd7e14 !important;
}

/* 교환신청 */
.exchangeRequested {
  position: absolute;
  top: 164px;
  left: 26px;
  width: 150px;
  height: 31px;
  font-size: 14px;
  font-family: "bamin_content";
  font-weight: bold;
  color: #28a745;
  text-align: center;
  background-color: #fff;
  border: 1px solid #28a745;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exchangeRequested:hover {
  background-color: #e8f5e9;  
}

/* 교환 취소 */
.exchangeCancel {
    position: absolute;
    top: 170px;
    left: 74px;
    font-size: 14px;
    font-family: "bamin_content";
    color: #fd7e14;
    text-align: center;
    cursor: pointer;
}

/* 티켓 취소 */
.ticketCancel {
  position: absolute;
  top: 164px;
  left: 190px;
  width: 150px;
  height: 31px;
  font-size: 14px;
  font-family: "bamin_content";
  font-weight: bold;
  text-align: center;
  color: #c54966;
  background-color: #fff;
  border: 1px solid #c54966;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ticketCancel:hover {
  background-color: #ffeef1;  
}
.rectangleGroup {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 208px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    overflow: hidden;
}

.rectangleParent {
    width: 100%;
    position: relative;
    height: 208px;
    margin-bottom: 10px;
}
</style>
