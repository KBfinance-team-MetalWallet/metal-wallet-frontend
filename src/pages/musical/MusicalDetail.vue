<template>
	<div :class="$style.div">
		<div :class="$style.groupParent">
			<BackHeader @click="goBack" />
		</div>

		<div :class="$style.wrapper">
			<!-- Navbar for navigation -->
			<div :class="$style.navbar">
				<p :class="$style.noticeNav" @click="scrollToSection('notice')">
					NOTICE
				</p>
				<p :class="$style.detailNav" @click="scrollToSection('detail')">
					DETAIL
				</p>
			</div>

			<!-- Content section with poster and musical details -->
			<div :class="$style.content">
				<div :class="$style.posterContainer">
					<img
						:class="$style.posterImage"
						alt=""
						:src="musical?.posterImage || TestImage"
					/>
					<div :class="$style.overlay">
						<div :class="$style.details">
							<b>
								뮤지컬 &lt;{{ musical?.title }}&gt; - {{ musical?.place }}
							</b>
							<div>
								<img
									:class="$style.icoutlinePlaceIcon"
									alt=""
									:src="PlaceIcon"
								/>
								<span>{{ musical?.placeDetail }}</span>
							</div>
							<div>
								<img
									:class="$style.mdicalendarOutlineIcon"
									alt=""
									:src="CalendarIcon"
								/>
								<span>{{ musical?.dates }}</span>
							</div>
							<div>
								<img
									:class="$style.mingcutetimeLineIcon"
									alt=""
									:src="TimeIcon"
								/>
								<span>{{ musical?.runningTime }}</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Section for NOTICE, DETAIL, PLACE with refs for navigation -->
				<div :class="$style.sectionWrapper" ref="notice">
					<div :class="$style.sectionItem">
						<b :class="$style.musicalNav">NOTICE</b>
						<img
							:class="$style.contentImage"
							alt=""
							:src="musical?.noticeImage || TestImage"
						/>
					</div>
				</div>

				<div :class="$style.sectionWrapper" ref="detail">
					<div :class="$style.sectionItem">
						<b :class="$style.musicalNav">DETAIL</b>
						<img
							:class="$style.contentImage"
							alt=""
							:src="musical?.detailImage || TestImage"
						/>
					</div>
				</div>

				<!-- Additional PLACE section for further details -->
				<div :class="$style.sectionWrapper">
					<div :class="$style.sectionItem">
						<b :class="$style.musicalNav">PLACE</b>
						<img
							:class="$style.contentImage"
							alt=""
							:src="musical?.placeImage || TestImage"
						/>
					</div>
				</div>
			</div>

			<!-- Booking button -->
			<button :class="$style.bookingButton" @click="redirectToBooking">
				예매하기
			</button>
		</div>

		<!-- Footer -->
		<Footer :class="$style.footer"></Footer>
	</div>
</template>

<script>
	import TestImage from "@/assets/image.png";
	import CalendarIcon from "@/assets/musical/calendar.svg";
	import PlaceIcon from "@/assets/musical/place.svg";
	import TimeIcon from "@/assets/musical/time.svg";
	import BackHeader from "@/components/BackHeader.vue";
	import Footer from "@/components/Footer.vue";
	import { defineComponent } from "vue";

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
				this.$router.push("/musical");
			},
			redirectToBooking() {
				const id = this.$route.params.id;
				this.$router.push(`/booking/${id}/dates`);
			},
			async fetchMusical(id) {
				try {
					const response = await fetch(
						`http://localhost:8080/api/musicals/${id}`
					);
					if (!response.ok) throw new Error("Network response was not ok");
					const { result } = await response.json();
					this.musical = {
						title: result.title,
						place: result.place,
						placeDetail: result.placeDetail,
						dates: `${result.ticketingStartDate} ~ ${result.ticketingEndDate}`,
						runningTime: `${result.runningTime}분`,
						posterImage: result.posterImageUrl || TestImage,
						noticeImage: result.noticeImageUrl || TestImage,
						detailImage: result.detailImageUrl || TestImage,
						placeImage: result.placeImageUrl || TestImage,
					};
				} catch (error) {
					console.error("Failed to fetch data", error);
				}
			},
			scrollToSection(section) {
				const sectionElement = this.$refs[section];
				if (sectionElement) {
					sectionElement.scrollIntoView({ behavior: "smooth" });
				}
			},
		},
		mounted() {
			const musicalId = this.$route.params.id;
			this.fetchMusical(musicalId);
		},
	});
</script>

<style module>
	@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

	.groupParent {
		width: 100%;
		height: 50px;
		padding: 14px;
		/* border: 1px solid blue; */
		background-color: #fafafa;
	}

	body {
		margin: 0;
		line-height: normal;
		font-family: "Roboto", sans-serif;
	}
	.navbar {
		display: flex;
		justify-content: center;
		width: 300px;
		margin-bottom: 10px;
	}

	.navbar > p {
		font-weight: bold;
		width: 100%;
		text-align: center;
		cursor: pointer;
		padding: 10px;
		transition: all 0.3s ease;
	}

	.noticeNav {
		color: grey;
	}

	.detailNav {
		color: grey;
	}

	.active {
		color: white; /* 활성화된 버튼의 텍스트 색상 */
		background-color: grey; /* 활성화된 버튼의 배경색 */
		border-radius: 15px; /* 둥근 모서리 */
		transition: all 0.3s ease; /* 부드러운 전환 */
	}

	.navbar > p:hover:not(.active) {
		background-color: lightgray;
		color: black;
	}

	.div {
		width: 100%;
		position: relative;
		background-color: #fafafa;
		min-height: 100vh;
		text-align: left;
		font-size: 16px;
		color: #c54966;
		font-family: Roboto;
	}
	.wrapper {
		/* border: 1px solid red; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start; /* 상단 정렬 */
		width: 100%;
		height: 100%;
		background-color: #fafafa;
		overflow: hidden; /* 추가된 스타일 */
		/* margin-top: 20px; */
		padding-top: 20px;
		position: relative; /* Footer와 버튼을 고정하기 위한 위치 설정 */
		/** Footer의 높이를 고려하여 최소 높이 설정 */
		min-height: calc(100vh - 60px);
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
	.musicalNav {
		width: 100%;
		color: #333;
	}
	.overlay {
		position: absolute; /* 포스터 위에 고정 위치 설정 */
		bottom: 0;
		left: 0;
		width: 100%; /* 부모 요소에 맞춤 */
		height: 40%;
		/* 그라데이션 효과 */
		background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4));
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
		/* margin-bottom: 20px; 각 항목 간의 간격 */
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
		bottom: 58px; /* Footer 바로 위에 위치하도록 설정 */
	}

	.footer {
		position: absolute; /* 고정 위치 설정 */
		bottom: 0; /* 하단에 위치 */
		width: 100%; /* 전체 너비 설정 */
	}
</style>
