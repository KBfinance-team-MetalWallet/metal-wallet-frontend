import axios from "axios";
import { defineStore } from "pinia";

export const useTicketStore = defineStore("tickets", {
  state: () => ({
    currentCard: 0, // 현재 선택된 카드의 인덱스
    // TODO: 초기 정적 데이터 (test data)
    tickets: [],
  }),
  actions: {
    async fetchTickets(cursor = null) {
      try {
        const token = localStorage.getItem("accessToken");

        const url = cursor
          ? `http://localhost:8080/api/tickets?cursor=${cursor}`
          : `http://localhost:8080/api/tickets`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { result } = response.data;
        this.tickets.push(...result.data);
        this.nextCursor = result.nextCursor;
        return result.data;
      } catch (error) {
        console.error("티켓을 불러오는 중 오류 발생:", error);
      }
    },
    getNextCursor() {
      return this.nextCursor; // 다음 커서를 반환
    },
    // 다음 카드로 이동합니다.
    nextCard() {
      this.currentCard = (this.currentCard + 1) % this.cards.length;
    },
    // 이전 카드로 이동합니다.
    prevCard() {
      this.currentCard =
        (this.currentCard - 1 + this.cards.length) % this.cards.length;
    },
  },
});
