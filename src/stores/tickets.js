import axios from "axios";
import { defineStore } from "pinia";

export const useTicketStore = defineStore("tickets", {
	state: () => ({
		currentCard: 0, // 현재 선택된 카드의 인덱스
		// TODO: 초기 정적 데이터 (test data)
		cards: [
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
		// API에서 뮤지컬 정보를 비동기적으로 가져옵니다.
		async fetchCards() {
			try {
				// TODO: API 수정 필요
				const response = await axios.get("https://api.example.com/musicals");
				this.cards = response.data.map((item) => ({
					imageUrl: item.imageUrl,
					isUsed: item.isUsed,
					musicalTitle: item.musicalTitle,
					date: item.date,
					seat: item.seat,
				}));
			} catch (error) {
				console.error("Failed to fetch cards:", error);
			}
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
