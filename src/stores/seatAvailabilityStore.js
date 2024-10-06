import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useSeatAvailabilityStore = defineStore(
  "seatAvailabilityStore",
  () => {
    const historyList = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchSeatAvailability = async (musicalId, date) => {
      loading.value = true;
      error.value = null;

      try {
        const response = await axios.get(
          `http://localhost:8080/api/musicals/${musicalId}/seats-availability?date=${date}`
        );

        if (response.data.resultCode === 200) {
          historyList.value = response.data.result;
          console.log(historyList);
        } else {
          error.value = "Failed to fetch seat availability";
        }
      } catch (err) {
        error.value = err.message;
        console.error("Error fetching seat availability:", err);
      } finally {
        loading.value = false;
      }
    };

    return {
      historyList,
      loading,
      error,
      fetchSeatAvailability,
    };
  }
);
