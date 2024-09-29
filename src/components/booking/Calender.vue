<template>
	<div class="calendar-box">
		<div class="calendar-controls">
			<button class="chevron-icon" @click="prevMonth">
				<img
					class="fa-solid fa-chevron-left"
					src="@/assets/booking/arrow-left.png"
					alt="arrow-left"
				/>
			</button>
			<span class="current-year"
				>{{ currentYear }}년 {{ currentMonth + 1 }}월</span
			>
			<button class="chevron-icon" @click="nextMonth">
				<img
					class="fa-solid fa-chevron-right"
					src="@/assets/booking/arrow-right.png"
					alt="arrow-left"
				/>
			</button>
		</div>
		<div class="calendar-grid">
			<!-- 요일 헤더 -->
			<div
				class="calendar-header"
				v-for="(day, index) in weekDays"
				:key="index"
			>
				{{ day }}
			</div>
			<!-- 날짜 렌더링 -->
			<div
				class="calendar-day"
				v-for="day in daysGrid"
				:key="day.date ? day.date.toString() : Math.random()"
			>
				<!-- 날짜 컨텐츠 전체  -->
				<div class="daily-today-contents">
					<div
						@click="selectDate(day.date)"
						:class="{ 'non-current-month': !day.isCurrentMonth }"
					>
						<!-- today 숫자 -->
						<div class="daily-today">
							{{ day.date ? day.date.getDate() : "" }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="today-wrapper-btn">
			<button class="today-btn" @click="setToday">Today</button>
		</div>
	</div>
</template>

<script setup lang="js">

																																																					import moment from "moment";
	import { computed, ref } from "vue";

																																																					// 현재 날짜
																																																					const currentDate = ref(new Date());
																																																					// 선택한 날짜
																																																					const selectedDate = ref(null);
																																																					// 현재 날짜의 연도 반환
																																																					const currentYear = computed(() => currentDate.value.getFullYear());
																																																					// 현재 날짜의 월 반환
																																																					const currentMonth = computed(() => currentDate.value.getMonth());

																																																					const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

																																																					const daysGrid = computed(() => {
																																																						const year = currentYear.value;
																																																						const month = currentMonth.value;
																																																						const date = new Date(year, month, 1);
																																																						const days = [];

																																																						// 이전 달의 날짜 추가
																																																						const prevMonthDays = [];
																																																						const firstDayIndex = date.getDay();
																																																						if (firstDayIndex > 0) {
																																																							const prevMonth = new Date(year, month, 0);
																																																							for (let i = firstDayIndex - 1; i >= 0; i--) {
																																																								const prevDate = new Date(year, month, -i);
																																																								prevMonthDays.push({ date: prevDate, isCurrentMonth: false });
																																																							}
																																																						}

																																																						// 현재 달의 날짜 추가
																																																						while (date.getMonth() === month) {
																																																							days.push({ date: new Date(date), isCurrentMonth: true });
																																																							date.setDate(date.getDate() + 1);
																																																						}

																																																						// 다음 달의 날짜 추가
																																																						const nextMonthDays = [];
																																																						const remainingDays = 7 - ((days.length + prevMonthDays.length) % 7);
																																																						if (remainingDays < 7) {
																																																							for (let i = 1; i <= remainingDays; i++) {
																																																								const nextDate = new Date(year, month + 1, i);
																																																								nextMonthDays.push({ date: nextDate, isCurrentMonth: false });
																																																							}
																																																						}

																																																						return [...prevMonthDays, ...days, ...nextMonthDays];
																																																					});

																																																					const setToday = () => {
																																																						currentDate.value = new Date();
																																																						selectedDate.value = moment(currentDate.value).format("YYYY-MM-DD");
																																																					};

																																																					const selectDate = (date) => {
																																																						selectedDate.value = date;
																																																						const formattedDate = moment(date).format("YYYY-MM-DD");
																																																					};

																																																					const prevMonth = () => {
																																																						currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
																																																					};

																																																					const nextMonth = () => {
																																																						currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
																																																					};
</script>
<style scoped>
	.calendar-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white; /* white */
		padding: 20px auto;
		width: 100%;
	}

	.calendar-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
	}

	.chevron-icon {
		width: 30px;
		height: 30px;
		border: none;
		background-color: white; /* white */
	}

	.fa-solid {
		font-weight: bold;
	}

	.current-year {
		font-weight: bold;
		color: #c54966; /* green -> #C54966 */
		font-size: 24px;
		padding: 0px 20px;
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		width: 100%;
		position: relative;
		text-align: center;
	}

	.calendar-header {
		/* font-weight: bold; */
		color: #727272;
		font-size: 18px;
		width: 100%;
	}

	.daily-today-contents {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* 요일 폰트 크기 조정 */
		font-size: 18px;
		width: 100%;
		height: 100%;
	}

	.calendar-day {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: end;
		/* 요일별 높이 조절 */
		height: 40px;
		width: 100%;
		cursor: pointer;
	}

	.daily-today {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 30px;
		border-radius: 20px;
	}

	.daily-today:hover {
		background-color: #c54966; /* green -> #C54966 */
		box-shadow: 0 0 5px 1px #c54966; /* green -> #C54966 */
	}

	.daily-today:active {
		background-color: #c54966; /* green -> #C54966 */
	}

	.today-btn {
		background-color: #c54966; /* green -> #C54966 */
		border: none;
		border-radius: 10px;
		color: white; /* white */
		padding: 5px 10px;
		margin-top: 10px;
		transition: background-color 0.2s ease;
	}

	.today-btn:hover {
		background-color: #28aa72;
	}

	.today-wrapper-btn {
		text-align: center;
		margin-bottom: 10px;
	}

	.non-current-month {
		color: black; /* dark-gray -> black */
	}
</style>
