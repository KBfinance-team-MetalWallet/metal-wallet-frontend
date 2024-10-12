<template>
  <div :class="$style.div">
    <MainHeader />
    <div :class="$style.inner">
      <div :class="$style.wrapper">
        <div v-for="(ticket, index) in tickets" :key="index" :class="$style.ticketItem">
          <div :class="$style.rectangleParent">
            <div :class="$style.groupChild"></div>
            <img :class="$style.image200Icon" :alt="ticket.title" :src="ticket.posterImage" />
            <div :class="$style.alladdinTheMusical">{{ ticket.title }}</div>
            <div :class="$style.parent">
              <div :class="$style.div3">
                <p :class="$style.p">예매번호</p>
                <p :class="$style.p">예매일</p>
                <p :class="$style.p">장소</p>
                <p :class="$style.p">관람일시</p>
                <p :class="$style.p">좌석</p>
                <p :class="$style.p">상태</p>
              </div>
              <div :class="$style.t200098371820231205Container">
                <p :class="$style.p">{{ ticket.ticketNumber }}</p>
                <p :class="$style.p">{{ ticket.bookingDate }}</p>
                <p :class="$style.p">{{ ticket.venue }}</p>
                <p :class="$style.p">{{ ticket.performanceDate }}</p>
                <p :class="$style.p">{{ ticket.seat }}</p>
                <p :class="$style.p9">{{ ticket.status }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AdminFooter />
    <b :class="$style.title">QR 체크인 목록</b>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import posterImage from '@/assets/admin/image 200.png';
import MainHeader from '@/components/MainHeader.vue';
import AdminFooter from '@/components/admin/AdminFooter.vue';

export default defineComponent({
  name: "AdminTicketList",
  components: {
    MainHeader,
    AdminFooter,
  },
  data() {
    return {
      tickets: [
        {
          posterImage: posterImage,
          title: "뮤지컬 <알라딘> 한국 초연 (ALLADDIN The Musical) - 1매",
          ticketNumber: "T2000983718",
          bookingDate: "2023.12.05",
          venue: "계명아트센터",
          performanceDate: "2024.01.02(화) 19:30",
          seat: "R석 11열 6, R석 11열 7",
          status: "사용완료3"
        },
        {
          posterImage: posterImage,
          title: "뮤지컬 <알라딘> 한국 초연 (ALLADDIN The Musical) - 1매",
          ticketNumber: "T2000983718",
          bookingDate: "2023.12.05",
          venue: "계명아트센터",
          performanceDate: "2024.01.02(화) 19:30",
          seat: "R석 11열 6, R석 11열 7",
          status: "사용완료3"
        },

        // 여기에 추가적인 티켓 정보를 넣을 수 있음
      ]
    };
  },
});
</script>


<style module>
.div {
  width: 100%;
  position: relative;
  background-color: #fafafa;
  height: 812px;
  overflow: hidden;
  text-align: left;
  font-size: 16px;
  color: #6e6e6e;

}

.inner {
  width: 100%;
  font-size: 13px;
  color: #000;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-top: 88px;
  /* 기존의 top 위치 조정 */
}

.ticketItem {
  width: 375px;
  margin-bottom: 20px;
  /* 티켓 간 간격 */
}

.rectangleParent {
  width: 100%;
  background-color: #fff;
  position: relative;
  padding: 20px;
  /* 내용물에 대한 패딩 */
  box-sizing: border-box;
}

.groupChild {
  display: none;
  /* 불필요한 경우 숨김 */
}

.image200Icon {
  width: 73.9px;
  height: 91.1px;
  object-fit: cover;
  float: left;
  /* 이미지와 제목을 나란히 배치 */
  margin-right: 20px;
}

.alladdinTheMusical {
  font-weight: 600;
  line-height: 1.5;
}

.parent {
  display: flex;
  margin-top: 20px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.44);
}

.div3 {
  width: 60px;
}

.t200098371820231205Container {
  flex-grow: 1;
  color: #000;
}

.p {
  margin: 0;
  line-height: 1.5;
}

.p9 {
  margin: 0;
  color: #c54966;
}

.title {
  position: absolute;
  top: 63px;
  left: 14px;
  color: #c54966;
}
</style>