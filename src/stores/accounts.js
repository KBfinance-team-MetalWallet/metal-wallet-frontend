// accounts.js
import BankLogo2 from "@/assets/account/kakao.png";
import BankLogo1 from "@/assets/account/kb.png";
import BankLogo3 from "@/assets/account/toss.png";
import { defineStore } from "pinia";
// 추가적인 로고가 있다면 계속 임포트

export const useAccountStore = defineStore("account", {
	state: () => ({
		accounts: [
			{
				id: 1, // 고유 ID 추가
				number: "420220-01-123456",
				balance: "$23,345.43",
				bankName: "국민은행",
				bankLogo: BankLogo1,
				color: "#f9c505", // 카드 색상 추가
				isUsed: false, // 사용 여부 표시
			},
			{
				id: 2,
				number: "981234-01-123456",
				balance: "$23,345.43",
				bankName: "현대카드",
				bankLogo: BankLogo2,
				color: "#d7f905",
				isUsed: false,
			},
			{
				id: 3,
				number: "111111-01-123456",
				balance: "$23,345.43",
				bankName: "토스",
				bankLogo: BankLogo3,
				color: "#05f9a0",
				isUsed: false,
			},
			// 추가 계좌가 있다면 계속 추가
		],
	}),
});
