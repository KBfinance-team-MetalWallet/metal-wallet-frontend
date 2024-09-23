import { createRouter, createWebHistory } from "vue-router";

// 로그인 관련 페이지
import SignupForm from "@/pages/login/SignupForm.vue";
import PasswordInput from "@/pages/login/PasswordInput.vue";
import TermsAgreement from "@/pages/login/TermsAgreement.vue";
import WelcomeSignup from "@/components/login/WelcomeSignup.vue";
import LoginAlert from "@/components/login/LoginAlert.vue";

import MyPage from "@/pages/mypages/MyPage.vue";
import TicketStorage from "@/pages/mypages/TicketStorage.vue";
import MyTicketList from "@/pages/mypages/MyTicketList.vue";

import Admin from "@/pages/admin/Admin.vue";
import Camera from "@/pages/admin/QRCamera.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
		},
		{
			path: "/login",
			name: "login",
			redirect: "/login/signup",
			children: [
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
			path: "/admin",
			name: "Admin",
			redirect: "/admin/admin",
			children: [
				{
					path: "admin",
					name: "Admin",
					component: Admin,
				},
				{
					path: "camera",
					name: "Camera",
					component: Camera,
				},
			],
		},
	],
});

export default router;
