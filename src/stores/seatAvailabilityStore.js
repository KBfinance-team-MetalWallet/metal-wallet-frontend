import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useSeatAvailabilityStore = defineStore("seatAvailability", () => {
  // 상태 변수들
  const selectedDate = ref(null); // 사용자가 선택한 날짜
  const historyList = ref([]); // 선택한 날짜와 스케줄 ID에 따른 좌석 가용성 데이터
  const availableSeats = ref([]); // 예매 가능한 좌석 데이터 저장
  const loading = ref(false); // 데이터 로딩 상태
  const error = ref(null); // 에러 상태

  // 날짜를 'YYYY-MM-DD' 형식으로 변환하는 유틸리티 함수
  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    if (isNaN(date)) {
      throw new Error("Invalid date format");
    }
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  // 목업 데이터 정의
  const mockData = {
    // ... (목업 데이터 생략)
  };

  // 특정 scheduleId에 해당하는 날짜를 반환하는 함수
  const getDateByScheduleId = (scheduleId) => {
    for (const date in mockData) {
      const schedules = mockData[date];
      const schedule = schedules.find((s) => s.scheduleId === scheduleId);
      if (schedule) {
        return date;
      }
    }
    return null;
  };

  // 특정 scheduleId의 예약된 좌석 코드를 반환하는 함수
  const getBookedSeats = (scheduleId) => {
    for (const date in mockData) {
      const schedules = mockData[date];
      const schedule = schedules.find((s) => s.scheduleId === scheduleId);
      if (schedule) {
        let booked = [];
        schedule.sections.forEach((section) => {
          if (section.bookedSeats) {
            booked = booked.concat(section.bookedSeats);
          }
        });
        return booked;
      }
    }

    if (historyList.value.length > 0) {
      const schedule = historyList.value.find(
        (s) => s.scheduleId === scheduleId
      );
      if (schedule && schedule.sections) {
        let booked = [];
        schedule.sections.forEach((section) => {
          if (section.bookedSeats) {
            booked = booked.concat(section.bookedSeats);
          }
        });
        return booked;
      }
    }

    return [];
  };

  // 좌석 가용성 데이터를 API 호출하여 불러오는 함수
  const fetchSeatAvailability = async (musicalId, date) => {
    selectedDate.value = date;
    loading.value = true;
    error.value = null;

    const dateStr = formatDate(date);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/musicals/${musicalId}/seats-availability?date=${dateStr}`
      );

      if (response.data.resultCode === 200) {
        historyList.value = response.data.result;
      } else {
        throw new Error("Failed to fetch seat availability");
      }
    } catch (apiError) {
      console.warn("seats-availability API 호출 실패, 목업 데이터를 사용합니다:");
      historyList.value = mockData[dateStr] || [];
      error.value = apiError;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 특정 scheduleId에 대해 예매 가능한 좌석 정보를 API로부터 가져오는 함수
   * @param {Number} scheduleId - 스케줄 ID
   * @returns {Array} - 예매 가능한 좌석 목록
   */
  const fetchAvailableSeats = async (scheduleId) => {
    loading.value = true;
    error.value = null;

    try {
      // API 호출
      const response = await axios.get(
        `${API_BASE_URL}/musicals/schedules/${scheduleId}/seats`
      );

      if (response.data.result) {
        availableSeats.value = response.data.result.map((seat) => {
          return {
            // seatId: seat.seatId,
            // seatNo: seat.seatNo,
            // grade: seat.grade,
            seatCode: `${seat.grade}${seat.seatNo},${seat.seatId}`, // 예: "R1,1"
          };
        });
        console.log("Available Seats:", availableSeats.value); // 예매 가능한 좌석 출력
      } else {
        throw new Error("Failed to fetch available seats");
      }
    } catch (apiError) {
      console.error("Available seats API 호출 실패:", apiError);
      error.value = apiError;
    } finally {
      loading.value = false;
    }
  };

  return {
    selectedDate,
    historyList,
    availableSeats, // availableSeats 상태 추가
    loading,
    error,
    fetchSeatAvailability,
    fetchAvailableSeats, // fetchAvailableSeats 메서드 추가
    getBookedSeats,
    getDateByScheduleId,
  };
});
