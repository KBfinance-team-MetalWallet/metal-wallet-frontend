import axios from "axios";
import { defineStore } from "pinia";

export const useTicketStore = defineStore("tickets", {
	state: () => ({
		currentCard: 0, // 현재 선택된 카드의 인덱스
		tickets: [], // 티켓 데이터 배열
	}),
	actions: {
		async fetchTickets() {
			try {
				const token = localStorage.getItem("accessToken");

				const response = await axios.get("http://localhost:8080/api/tickets", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				this.tickets = response.data.result.content.map((ticket) => ({
					id: ticket.id,
					title: ticket.title,
					ticketStatus: ticket.ticketStatus,
					createdAt: ticket.createdAt,
					validUntil: ticket.validUntil,
					cancelUntil: ticket.cancelUntil,
					place: ticket.place,
					scheduleDate: ticket.scheduleDate,
					startTime: ticket.startTime,
					posterImageUrl: ticket.posterImageUrl,
					grade: ticket.grade,
					seatNo: ticket.seatNo,
				}));
			} catch (error) {
				console.error("티켓을 불러오는 중 오류 발생:", error);
			}
		},
		// 다음 카드로 이동합니다.
		nextCard() {
			if (!this.tickets || this.tickets.length === 0) {
				console.error("tickets 배열이 비어 있습니다.");
				return;
			}
			this.currentCard = (this.currentCard + 1) % this.tickets.length;
			console.log(this.currentCard);
		},
		// 이전 카드로 이동합니다.
		prevCard() {
			if (!this.tickets || this.tickets.length === 0) {
				console.error("tickets 배열이 비어 있습니다.");
				return;
			}
			this.currentCard =
				(this.currentCard - 1 + this.tickets.length) % this.tickets.length;
		},
	},
});
