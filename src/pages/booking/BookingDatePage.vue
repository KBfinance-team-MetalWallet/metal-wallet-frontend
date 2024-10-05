<template>
	<div :class="$style.div">
		<BackHeader />
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
		</div>
		<MainHeader />
	</div>
</template>

<script lang="js">
		import BackHeader from "@/components/BackHeader.vue";
	import Calender from "@/components/booking/Calender.vue";
	import ShowTimeInfo from "@/components/booking/ShowTimeInfo.vue";
	import MainHeader from "@/components/MainHeader.vue";
	import { useMusicalDatesStore } from "@/stores/musicalDatesStore";
	import { useSeatAvailabilityStore } from "@/stores/seatAvailabilityStore";
	import { onMounted } from "vue";
	import { useRoute } from "vue-router";

		export default {
			components: {
				BackHeader,
				Calender,
				ShowTimeInfo,
				MainHeader,
			},
			setup() {
				// URL에서 musical_id 추출
				const route = useRoute();
				const musicalId = route.params.musical_id;

				const seatAvailabilityStore = useSeatAvailabilityStore();
				const musicalDatesStore = useMusicalDatesStore();

				// 날짜가 선택되었을 때 실행되는 함수
				const onDateSelected = (selectedDate) => {
					seatAvailabilityStore.fetchSeatAvailability(musicalId, selectedDate);
					musicalDatesStore.fetchMusicalDates(musicalId);
				};

				// 컴포넌트가 마운트되었을 때 API 호출
				onMounted(() => {
					musicalDatesStore.fetchMusicalDates(musicalId);
				});

				return {
					seatAvailabilityStore,
					musicalId,
					onDateSelected,
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
</style>
