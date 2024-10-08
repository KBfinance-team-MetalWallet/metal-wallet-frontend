import axios from "axios";
import { defineStore } from "pinia";

export const useTicketStore = defineStore("tickets", {
  state: () => ({
    currentCard: 0, // 현재 선택된 카드의 인덱스
    // TODO: 초기 정적 데이터 (test data)
    tickets: [
      {
        id: 1,
        ticketId: "1L",
        imageUrl: "/src/assets/ticket/PosterImg1.png", // TODO: url 도 수정해야함.
        isUsed: false,
        musicalTitle: "뮤지컬 <접변>-대구",
        date: "2024.01.02(화) 19:30",
        seat: "1층 R석 13열",
      },
      {
        id: 2,
        ticketId: "2L",
        imageUrl: "/src/assets/ticket/PosterImg2.png",
        isUsed: false,
        musicalTitle: "뮤지컬 <홀리 이노센트>-서울",
        date: "2024.02.15(금) 20:00",
        seat: "1층 VIP석 24열",
      },
      {
        id: 3,
        ticketId: "3L",
        imageUrl: "/src/assets/ticket/PosterImg3.png",
        isUsed: false,
        musicalTitle: "뮤지컬 <레미제라블>-인천",
        date: "2024.03.22(토) 18:00",
        seat: "1층 S석 5열",
      },
    ],
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
    // 다음 카드로 이동합니다.
    nextCard() {
      this.currentCard = (this.currentCard + 1) % this.cards.length;
    },
    prevCard() {
      this.currentCard =
        (this.currentCard - 1 + this.cards.length) % this.cards.length;
    },
  },
});
