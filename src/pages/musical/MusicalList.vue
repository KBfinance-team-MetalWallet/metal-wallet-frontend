<template>
  <div :class="$style.div">
    <div :class="$style.groupParent">
      <BackHeader @click="goBack" />
    </div>

    <!-- Container for all Frames -->
    <div :class="$style.framesContainer" @scroll="handleScroll">
      <div v-for="musical in musicals" :key="musical.id" class="frame-item">
        <Frame
          :posterImage="musical.posterImageUrl"
          :title="musical.title"
          :place="musical.place"
          :placeDetail="musical.placeDetail"
          :dates="`${musical.ticketingStartDate} ~ ${musical.ticketingEndDate}`"
          @click="redirectToDetail(musical.id)"
        />
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Frame from "@/components/musical/MusicalFrame.vue";
import Footer from "@/components/Footer.vue";
import BackHeader from "@/components/BackHeader.vue";
import TestImage from "@/assets/image.png";

export default defineComponent({
  components: { Frame, Footer, BackHeader },
  data() {
    return {
      musicals: [],
      nextCursor: null,
      size: 4,
      isLoading: false,
      TestImage, // 기본 이미지 설정
    };
  },
  methods: {
    async fetchMusicals(cursor = null) {
      if (this.isLoading) return;
      this.isLoading = true;
      const url = cursor
        ? `${API_BASE_URL}/musicals?cursor=${cursor}&size=${this.size}`
        : `${API_BASE_URL}/musicals?size=${this.size}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        // musicals 배열에 각 뮤지컬 데이터 추가
        this.musicals.push(
          ...data.result.data.map((musical) => ({
            id: musical.id,
            title: musical.title,
            place: musical.place,
            placeDetail: musical.placeDetail,
            ticketingStartDate: musical.ticketingStartDate,
            ticketingEndDate: musical.ticketingEndDate,
            posterImageUrl: musical.posterImageUrl || this.TestImage, // posterImgUrl 또는 기본 이미지
          }))
        );

        // nextCursor 업데이트
        this.nextCursor = data.result.nextCursor;

        // 더 이상 데이터가 없을 경우
        if (!this.nextCursor) {
          console.log("No more items to load");
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        this.isLoading = false;
      }
    },
    redirectToDetail(id) {
      this.$router.push(`/musical/${id}`);
    },
    goBack() {
      this.$router.push("/");
    },
    handleScroll(event) {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      const bottom = scrollHeight - scrollTop <= clientHeight + 1; // 약간의 부동 소수점 오류를 감안
      if (bottom && this.nextCursor && !this.isLoading) {
        this.fetchMusicals(this.nextCursor);
      }
    },
  },
  mounted() {
    this.fetchMusicals();
  },
});
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

body {
  margin: 0;
  line-height: normal;
  font-family: "Roboto", sans-serif;
}

.backHeader {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
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

.framesContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  position: absolute;
  top: 40px;
  bottom: 80px;
  overflow-y: auto; /* Enable vertical scrolling */
}

.frame-item {
  flex: 0 1 300px; /* Adjust width as needed */
}
</style>
