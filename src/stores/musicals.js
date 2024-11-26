// stores/musicals.js

import axios from "axios";
import { defineStore } from "pinia";

export const useMusicalsStore = defineStore("musicals", {
	state: () => ({
		musicals: [],
	}),
	actions: {
		async fetchMusicals() {
			try {
				const response = await axios.get(
					"http://localhost:8080/api/musicals?size=10"
				);
				const apiData = response.data.result.data;

				// API에서 받은 데이터를 스토어 구조에 맞게 매핑합니다.
				this.musicals = apiData.map((item) => ({
					id: item.id,
					title: item.title,
					rank: item.ranking,
					imageUrl: item.posterImageUrl,
					// 필요한 다른 속성들도 추가 가능합니다.
					place: item.place,
					placeDetail: item.placeDetail,
					ticketingStartDate: item.ticketingStartDate,
					ticketingEndDate: item.ticketingEndDate,
				}));

				// 콘솔에 데이터를 출력합니다.
				console.log(this.musicals);
			} catch (error) {
				console.error("뮤지컬 데이터를 가져오는 중 오류 발생:", error);
			}
		},
	},
});
