import { createRouter, createWebHistory } from "vue-router";

// 로그인 관련 페이지
import LoginAlert from "@/components/login/LoginAlert.vue";
import WelcomeSignup from "@/components/login/WelcomeSignup.vue";
import PasswordInput from "@/pages/login/PasswordInput.vue";
import SignupForm from "@/pages/login/SignupForm.vue";
import TermsAgreement from "@/pages/login/TermsAgreement.vue";
import LoginForm from "../pages/login/LoginForm.vue";

import Home from "@/pages/Home.vue";
import MyPage from "@/pages/mypages/MyPage.vue";
import MyTicketList from "@/pages/mypages/MyTicketList.vue";
import TicketStorage from "@/pages/mypages/TicketStorage.vue";
import Ticket from "@/pages/ticket/Ticket.vue";

import SeatSelectionPage from "@/pages/booking/SeatSelectionPage.vue";
import SessionComplete from "../pages/SessionComplete.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/ticket",
			name: "ticket",
			component: Ticket,
		},

		{
			path: "/login",
			name: "login",
			redirect: "/login/login",
			children: [
				{
					path: "login",
					name: "login",
					component: LoginForm,
				},
				{
					path: "signup",
					name: "signup",
					component: SignupForm,
				},
				{
					path: "password",
					name: "password",
					component: PasswordInput,
				},
				{
					path: "agreement",
					name: "agreement",
					component: TermsAgreement,
				},
				{
					path: "welcome",
					name: "welcome",
					component: WelcomeSignup,
				},
				{
					path: "alert",
					name: "alert",
					component: LoginAlert,
				},
			],
		},
		{
			path: "/mypage",
			name: "MyPage",
			redirect: "/mypage/mypage",
			children: [
				{
					path: "mypage",
					name: "MyPage",
					component: MyPage,
				},
				{
					path: "ticket-storage",
					name: "ticketstorage",
					component: TicketStorage,
				},
				{
					path: "my-ticket-list",
					name: "myticketlist",
					component: MyTicketList,
				},
			],
		},

		{
			path: "/",
			name: "User",
			redirect: "/user",
			children: [
				{
					path: "session-complete",
					name: "SessionComplete",
					component: SessionComplete,
				},
			],
		},
		{
			path: "/booking",
			name: "Booking",
			redirect: "/booking/seats",
			children: [
				{
					path: "seats",
					name: "seats",
					component: SeatSelectionPage,
				},
			],
		},
	],
});

export default router;
