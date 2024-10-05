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
			<span class="current-year">
				{{ currentYear }}년 {{ currentMonth + 1 }}월
			</span>
			<button class="chevron-icon" @click="nextMonth">
				<img
					class="fa-solid fa-chevron-right"
					src="@/assets/booking/arrow-right.png"
					alt="arrow-right"
				/>
			</button>
		</div>
		<div v-if="musicalDatesStore.loading" class="loading">로딩 중...</div>
		<div v-else class="calendar-grid">
			<div
				class="calendar-header"
				v-for="(day, index) in weekDays"
				:key="index"
			>
				{{ day }}
			</div>
			<div
				class="calendar-day"
				v-for="(day, index) in daysGrid"
				:key="day.date ? formatDate(day.date) : `no-date-${index}`"
			>
				<div class="daily-today-contents">
					<div
						@click="handleDateClick(day.date)"
						:class="{
							'non-current-month': !day.isCurrentMonth,
							disabled: isDateDisabled(day.date),
						}"
					>
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
	import { useMusicalDatesStore } from "@/stores/musicalDatesStore";
	import { computed, onMounted, ref } from "vue";

	const emit = defineEmits(['dateSelected']);
	const musicalDatesStore = useMusicalDatesStore();

	const currentDate = ref(new Date());
	const selectedDate = ref(null);

	const currentYear = computed(() => currentDate.value.getFullYear());
	const currentMonth = computed(() => currentDate.value.getMonth());

	const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = (`0${date.getMonth() + 1}`).slice(-2);
		const day = (`0${date.getDate()}`).slice(-2);
		return `${year}-${month}-${day}`;
	};

	const daysGrid = computed(() => {
		const year = currentYear.value;
		const month = currentMonth.value;
		const date = new Date(year, month, 1);
		const days = [];

		const prevMonthDays = [];
		const firstDayIndex = date.getDay();
		if (firstDayIndex > 0) {
			for (let i = firstDayIndex - 1; i >= 0; i--) {
				const prevDate = new Date(year, month, -i);
				prevMonthDays.push({ date: prevDate, isCurrentMonth: false });
			}
		}

		while (date.getMonth() === month) {
			days.push({ date: new Date(date), isCurrentMonth: true });
			date.setDate(date.getDate() + 1);
		}

		const nextMonthDays = [];
		const totalDays = prevMonthDays.length + days.length;
		const remainingDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
		if (remainingDays > 0) {
			for (let i = 1; i <= remainingDays; i++) {
				const nextDate = new Date(year, month + 1, i);
				nextMonthDays.push({ date: nextDate, isCurrentMonth: false });
			}
		}

		return [...prevMonthDays, ...days, ...nextMonthDays];
	});

	const setToday = () => {
		currentDate.value = new Date();
		selectedDate.value = currentDate.value;
		emit('dateSelected', selectedDate.value);
	};

	const selectDate = (date) => {
		selectedDate.value = date;
		emit('dateSelected', date);
	};

	const handleDateClick = (date) => {
		if (!isDateDisabled(date)) {
			selectDate(date);
		} else {
			alert('해당 날짜는 선택할 수 없습니다.');
		}
	};

	const isDateDisabled = (date) => {
		if (!date) return true;
		const formattedDate = formatDate(date);
		return !musicalDatesStore.scheduleDates.some(
			(d) => formatDate(d) === formattedDate
		);
	};

	const prevMonth = () => {
		currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
		musicalDatesStore.fetchMusicalDates(musicalDatesStore.musicalId);
	};

	const nextMonth = () => {
		currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
		musicalDatesStore.fetchMusicalDates(musicalDatesStore.musicalId);
	};

	onMounted(async () => {
		setToday();
		if (musicalDatesStore.musicalId) {
			await musicalDatesStore.fetchMusicalDates(musicalDatesStore.musicalId);
		} else {
			musicalDatesStore.fetchMusicalDates(1);
		}
	});
</script>

<style scoped>
	.calendar-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
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
		background-color: white;
	}

	.current-year {
		font-weight: bold;
		color: #c54966;
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
		color: #727272;
		font-size: 18px;
		width: 100%;
	}

	.daily-today-contents {
		display: flex;
		flex-direction: column;
		align-items: center;
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
		background-color: #c54966;
		box-shadow: 0 0 5px 1px #c54966;
	}

	.daily-today:active {
		background-color: #c54966;
	}

	.today-btn {
		background-color: #c54966;
		border: none;
		border-radius: 10px;
		color: white;
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
		color: #ccc;
	}

	.disabled {
		cursor: not-allowed;
		color: #c0c0c0;
		pointer-events: none;
	}

	.loading {
		font-size: 18px;
		color: #c54966;
		margin: 20px 0;
	}
</style>
