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
        `${API_BASE_URL}/musicals/${id}/dates`
      );

      scheduleDates.value = response.data.result.scheduleDate.map(
        (date) => new Date(date)
      );
    } catch (err) {
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
