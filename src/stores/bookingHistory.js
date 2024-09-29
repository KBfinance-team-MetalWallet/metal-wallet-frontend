import { defineStore } from "pinia";

export const useHistoryStore = defineStore("history", {
	state: () => ({
		historyList: [
			{
				date: "2024-09-15",
				time: "오후 8:00",
				participants: "유승현, 홍기범, 강찬",
				seats: [
					{ type: "R석", number: "54석" },
					{ type: "S석", number: "51석" },
				],
				type: "income",
				amount: 50000,
				details: "뮤지컬 예매 수익",
			},
			{
				date: "2024-09-15",
				time: "오후 4:00",
				participants: "박규원, 김지온, 유태율",
				seats: [
					{ type: "R석", number: "20석" },
					{ type: "S석", number: "0석" },
				],
				type: "outcome",
				amount: 20000,
				details: "뮤지컬 예매 비용",
			},
			// 추가적인 샘플 데이터
		],
		selectedDate: null,
	}),
	actions: {
		getHistoryByDate(date) {
			// 특정 날짜의 히스토리를 가져오는 로직
			// 예: API 호출 후 historyList를 업데이트
			console.log(`History fetched for date: ${date}`);
			// 실제 API 호출 시, historyList를 업데이트하는 로직 추가
		},
	},
});
