import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMusicalDatesStore = defineStore("musicalDatesStore", () => {
	const musicalId = ref(null);
	const scheduleDates = ref([]);
	const loading = ref(false);
	const error = ref(null);

	const fetchMusicalDates = async (id) => {
		musicalId.value = id;
		loading.value = true;
		error.value = null;

		try {
			const response = await axios.get(
				`http://localhost:8080/api/musicals/${id}/dates`
			);

			// API에서 받은 데이터를 Date 객체로 변환 후 저장
			scheduleDates.value = response.data.scheduleDate.map(
				(date) => new Date(date)
			);
		} catch (err) {
			// 에러 처리
			error.value = err;
			console.error("musicalDatesStore에서 axios 오류 발생:", err);
		} finally {
			loading.value = false;
		}
	};

	return {
		musicalId,
		scheduleDates,
		loading,
		error,
		fetchMusicalDates,
	};
});
