import axios from "axios";
import { defineStore } from "pinia";

export const useTicketStore = defineStore("tickets", {
	state: () => ({
		currentCard: 0,
		nextCursor: null,
		tickets: [],
	}),
	actions: {
		async fetchTickets() {
			try {
				const token = localStorage.getItem("accessToken");

				const url = `http://localhost:8080/api/tickets`;
				const response = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const { result } = response.data;
				this.tickets = result.data; // tickets 배열을 최신화
				this.nextCursor = result.nextCursor;
				return result.data;
			} catch (error) {
				console.error("티켓을 불러오는 중 오류 발생:", error);
			}
		},

		nextCard() {
			if (!this.tickets || this.tickets.length === 0) {
				console.error("tickets 배열이 비어 있습니다.");
				return;
			}
			this.currentCard = (this.currentCard + 1) % this.tickets.length;
			console.log(this.currentCard);
		},
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
