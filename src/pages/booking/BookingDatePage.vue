<template>
  <div :class="$style.div">
    <BackHeader @click="goBack" />
    <div :class="$style.groupParent">
      <Calender :musicalId="musicalId" @dateSelected="onDateSelected" />
      <div
        v-if="seatAvailabilityStore.historyList.length"
        :class="$style.groupContainer"
      >
        <ShowTimeInfo
          v-for="(history, index) in seatAvailabilityStore.historyList"
          :key="`${history.time}-${history.actorNames.join(',')}-${index}`"
          :time="history.time"
          :names="history.actorNames"
          :rSeats="
            parseInt(
              history.sections.find((section) => section.section === 'R')
                ?.availableSeats || 0
            )
          "
          :sSeats="
            parseInt(
              history.sections.find((section) => section.section === 'S')
                ?.availableSeats || 0
            )
          "
          :aSeats="
            parseInt(
              history.sections.find((section) => section.section === 'A')
                ?.availableSeats || 0
            )
          "
          :musicalId="musicalId"
        />
      </div>
      <div v-if="seatAvailabilityStore.error" class="error-message">
        {{ seatAvailabilityStore.error }}
        <!-- 에러 메시지 출력 -->
      </div>
    </div>
  </div>
</template>

<script lang="js">
import BackHeader from "@/components/BackHeader.vue";
import Calender from "@/components/booking/Calender.vue";
import ShowTimeInfo from "@/components/booking/ShowTimeInfo.vue";
import { useMusicalDatesStore } from "@/stores/musicalDatesStore";
import { useSeatAvailabilityStore } from "@/stores/seatAvailabilityStore";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    components: {
        BackHeader,
        Calender,
        ShowTimeInfo,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const musicalId = Number(route.params.musical_id);

        const seatAvailabilityStore = useSeatAvailabilityStore();
        const musicalDatesStore = useMusicalDatesStore();

        const onDateSelected = (selectedDate) => {
            console.log('Selected Date:', selectedDate);
			// 뮤지컬 날짜 선택 후 일정 불러오기
			seatAvailabilityStore.fetchSeatAvailability(musicalId, selectedDate);
        };

        const goBack = () => {
            router.push(`/musical/${musicalId}`);
        };

        onMounted(() => {
            // 초기 로딩 시 뮤지컬 날짜를 가져오는 메소드 호출
            musicalDatesStore.fetchMusicalDates(musicalId);
        });

        return {
            seatAvailabilityStore,
            musicalId,
            onDateSelected,
            goBack, // goBack 함수 반환
        };
    },
};
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
  font-family: Roboto;
}
.groupParent {
  position: absolute;
  top: 68px;
  left: 16px;
  width: 374px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  text-align: center;
  font-size: 25px;
  color: #22222b;
}
.groupContainer {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
  text-align: left;
  font-size: 19px;
  color: #c54966;
}
.error-message {
  color: red; /* 에러 메시지 스타일 */
}
</style>
