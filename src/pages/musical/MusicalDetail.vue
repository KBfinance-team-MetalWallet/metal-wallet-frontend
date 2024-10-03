<template>
    <div :class="$style.div">
        <div :class="$style.groupParent">
            <BackHeader @click="goBack" />
        </div>

        <div :class="$style.wrapper">
            <div :class="$style.content">
                <!-- 포스터 및 뮤지컬 상세 정보 섹션 -->
                <div :class="$style.posterContainer">
                    <img :class="$style.posterImage" alt="" :src="musical?.image || TestImage" />
                    <div :class="$style.overlay">
                        <div :class="$style.details">
                            <b>
                                뮤지컬 &lt;{{ musical?.title }}&gt; - {{ musical?.place }}
                            </b>
                            <div>
                                <img :class="$style.icoutlinePlaceIcon" alt="" :src="PlaceIcon" />
                                <span>{{ musical?.placeDetail }}</span>
                            </div>
                            <div>
                                <img :class="$style.mdicalendarOutlineIcon" alt="" :src="CalendarIcon" />
                                <span>{{ musical?.dates }}</span>
                            </div>
                            <div>
                                <img :class="$style.mingcutetimeLineIcon" alt="" :src="TimeIcon" />
                                <span>{{ musical?.runningTime }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 다른 섹션들 (예: NOTICE, DETAIL, PLACE 등) -->
                <div :class="$style.sectionWrapper">
                    <div :class="$style.sectionItem">
                        <b>NOTICE</b>
                        <img :class="$style.contentImage" alt="" :src="musical?.image || TestImage" />
                    </div>
                </div>
                
                <div :class="$style.sectionWrapper">
                    <div :class="$style.sectionItem">
                        <b>DETAIL</b>
                        <img :class="$style.contentImage" alt="" :src="musical?.image || TestImage" />
                    </div>
                </div>

                <div :class="$style.sectionWrapper">
                    <div :class="$style.sectionItem">
                        <b>PLACE</b>
                        <img :class="$style.contentImage" alt="" :src="musical?.image || TestImage" />
                    </div>
                </div>
            </div>
            <button :class="$style.bookingButton">예매하기</button>
        </div>
        <Footer :class="$style.footer"></Footer> <!-- Footer 수정 -->
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Footer from '@/components/Footer.vue';
import BackHeader from '@/components/BackHeader.vue';
import TestImage from '@/assets/image.png'; // 테스트 이미지
import PlaceIcon from '@/assets/musical/place.svg';
import CalendarIcon from '@/assets/musical/calendar.svg';
import TimeIcon from '@/assets/musical/time.svg';

export default defineComponent({
    components: { Footer, BackHeader },
    data() {
        return {
            musical: null,
            TestImage,
            PlaceIcon,
            CalendarIcon,
            TimeIcon,
        };
    },
    methods: {
        goBack() {
            this.$router.push('/musical');
        },
        async fetchMusical(id) {
            try {
                const response = await fetch(`http://localhost:8080/api/musicals/${id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const { result } = await response.json();
                this.musical = {
                    title: result.title,
                    image: result.posterImageUrl || TestImage, // 이미지가 없으면 TestImage 사용
                    place: result.place,
                    placeDetail: result.placeDetail,
                    dates: `${result.ticketingStartDate} ~ ${result.ticketingEndDate}`,
                    runningTime: `${result.runningTime}분`,
                };
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        },
    },
    mounted() {
        const musicalId = this.$route.params.id; // URL에서 id 가져오기
        this.fetchMusical(musicalId);
    },
});
</script>

<style module>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.groupParent {
    width: 100%;
    padding: 14px;
}

body {
    margin: 0;
    line-height: normal;
    font-family: 'Roboto', sans-serif;
}

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* 상단 정렬 */
    width: 100%;
    background-color: #fafafa;
    overflow: hidden; /* 추가된 스타일 */
    margin-top: 20px;
    position: relative; /* Footer와 버튼을 고정하기 위한 위치 설정 */
    min-height: calc(100vh - 60px); /* Footer의 높이를 고려하여 최소 높이 설정 */
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* 상단 정렬 */
    align-items: center;
    max-height: 632px; /* 최대 높이 설정 */
    overflow-y: auto; /* 스크롤 가능하도록 설정 */
    flex-grow: 1; /* 남은 공간을 채우도록 설정 */
}

.posterContainer {
    position: relative; /* 포스터와 오버레이 상대 위치 */
    width: 300px; /* 고정 너비 */
    height: 433px; /* 고정 높이 */
    display: flex;
    justify-content: center;
    margin-bottom: 20px; /* NOTICE와의 간격을 위한 마진 */
}

.posterImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px; /* 모서리를 둥글게 */
}

.overlay {
    position: absolute; /* 포스터 위에 고정 위치 설정 */
    bottom: 0;
    left: 0;
    width: 100%; /* 부모 요소에 맞춤 */
    height: 40%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4)); /* 그라데이션 효과 */
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 0 0 15px 15px;
}

.details b {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}

.details div {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.details img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

.section {
    display: flex;
    flex-direction: column;
}

.sectionWrapper {
    width: 300px; /* 고정 너비 */
}

.sectionItem {
    display: flex;
    flex-direction: column; /* 아이템을 세로로 정렬 */
    align-items: flex-start; /* 왼쪽 정렬 */
    margin-bottom: 20px; /* 각 항목 간의 간격 */
    width: 100%;
}

.contentImage {
    width: 100%;
}

.sectionItem b {
    margin-bottom: 10px; /* 텍스트와 이미지 사이의 간격 */
    font-size: 18px;
    font-weight: bold; /* 텍스트 굵게 설정 */
    text-align: left;
}

.noticeText {
    font-size: 14px;
    line-height: 1.6;
    color: #333;
}

.bookingButton {
    width: 100%;
    padding: 15px 0;
    background-color: #c54966; /* 버튼 색상 */
    color: white;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 15px 15px 0 0;
    cursor: pointer;
    text-align: center;
    position: absolute; /* 고정 위치 설정 */
    bottom: 68px; /* Footer 바로 위에 위치하도록 설정 */
}

.footer {
    position: absolute; /* 고정 위치 설정 */
    bottom: 0; /* 하단에 위치 */
    width: 100%; /* 전체 너비 설정 */
}
</style>
