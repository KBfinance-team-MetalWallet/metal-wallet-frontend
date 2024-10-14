import axios from "axios";
import { defineStore } from "pinia";

export const ticketListStore = defineStore("ticketList", {
  state: () => ({
    nextCursor: null,
    tickets: [],
  }),
  actions: {
    async fetchTickets(cursor = null, reset = false) {
      try {
        const token = localStorage.getItem("accessToken");

        const url = cursor
          ? `${API_BASE_URL}/tickets?cursor=${cursor}`
          : `${API_BASE_URL}/tickets`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { result } = response.data;

        if (reset) {
          this.tickets = [];
        }

        this.tickets.push(...result.data);
        this.nextCursor = result.nextCursor;
        return result.data;
      } catch (error) {
        console.error("티켓을 불러오는 중 오류 발생:", error);
      }
    },
    getNextCursor() {
      return this.nextCursor;
    },
  },
});
