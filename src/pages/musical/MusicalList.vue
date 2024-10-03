<template>
    <div :class="$style.div">
        <div :class="$style.groupParent">
            <BackHeader @click="goBack"/>
        </div>
        
        <!-- Container for all Frames -->
        <div :class="$style.framesContainer" @scroll="handleScroll">
            <div v-for="musical in musicals" :key="musical.id" class="frame-item">
                <Frame
                    :posterImage="TestImage"
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
import { defineComponent } from 'vue';
import Frame from '@/components/musical/MusicalFrame.vue';
import Footer from '@/components/Footer.vue';
import BackHeader from '@/components/BackHeader.vue';
import TestImage from '@/assets/image.png';

export default defineComponent({
    components: { Frame, Footer, BackHeader },
    data() {
        return {
            musicals: [],
            nextCursor: null,
            size: 3,
            isLoading: false, // To prevent multiple fetch requests
            TestImage: TestImage, // TestImage를 data 속성으로 추가
        };
    },
    methods: {
        async fetchMusicals(cursor = null) {
            if (this.isLoading) return; // Prevent multiple simultaneous requests
            this.isLoading = true;

            const url = cursor 
                ? `http://localhost:8080/api/musicals?cursor=${cursor}&size=${this.size}`
                : `http://localhost:8080/api/musicals?size=${this.size}`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                this.musicals.push(...data.result.data);
                this.nextCursor = data.result.nextCursor;

                if (!this.nextCursor) {
                    console.log('No more items to load');
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
            this.$router.push('/');
        },
        handleScroll(event) {
            const { scrollTop, scrollHeight, clientHeight } = event.target;
            const bottom = scrollHeight === scrollTop + clientHeight;
            if (bottom && this.nextCursor) {
                this.fetchMusicals(this.nextCursor);
            }
        }
    },
    mounted() {
        this.fetchMusicals(); // Fetch initial data
    }
});
</script>

<style module>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
    margin: 0;
    line-height: normal;
    font-family: 'Roboto', sans-serif;
}

.backHeader {
    position: fixed;
    top: 0; /* Header를 고정 */
    width: 100%;
    z-index: 1000; /* 다른 요소들 위에 위치하도록 */
}

.footer {
    position: fixed;
    bottom: 0; /* Footer를 고정 */
    width: 100%;
    z-index: 1000; /* 다른 요소들 위에 위치하도록 */
}

.div {
    width: 100%;
    height: 100vh; /* 전체 화면 높이 설정 */
    position: relative;
    background-color: #fafafa;
    overflow: hidden; /* 전체 스크롤 불가 */
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
    position: absolute; /* Positioning absolute to make scrolling work */
    top: 50px; /* BackHeader의 높이를 고려한 위치 */
    bottom: 80px; /* Footer의 높이를 고려한 위치 */
    overflow-y: auto; /* 수직 스크롤 가능 */
}

.frame-item {
    flex: 0 1 300px;
}
</style>
