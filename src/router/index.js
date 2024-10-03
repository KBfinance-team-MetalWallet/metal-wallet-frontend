import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

// 로그인 관련 페이지
import LoginAlert from "@/components/login/LoginAlert.vue";
import WelcomeSignup from "@/components/login/WelcomeSignup.vue";
import PasswordInput from "@/pages/login/PasswordInput.vue";
import Signup from "@/pages/login/Signup.vue";
import SignupForm from "@/pages/login/SignupForm.vue";
import TermsAgreement from "@/pages/login/TermsAgreement.vue";
import LoginForm from "../pages/login/LoginForm.vue";

import Home from "@/pages/Home.vue";
import MyPage from "@/pages/mypages/MyPage.vue";
import MyTicketList from "@/pages/mypages/MyTicketList.vue";
import Ticket from "@/pages/ticket/Ticket.vue";

import SeatSelectionPage from "@/pages/booking/SeatSelectionPage.vue";
import SessionComplete from "../pages/SessionComplete.vue";
import VerificationPasswordInput from "../pages/booking/VerificationPasswordInput.vue";
import PaymentSuccessPage from "../pages/booking/PaymentSuccessPage.vue";

import MusicalList from "@/pages/musical/MusicalList.vue";
import MusicalDetail from "@/pages/musical/MusicalDetail.vue";

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
      component: LoginForm,
    },
    {
      path: "/signup", // 회원가입 경로
      name: "signup",
      component: Signup, // 회원가입 화면
      children: [
        {
          path: "",
          name: "signupForm",
          component: SignupForm,
        },
        {
          path: "password", // /signup/password
          name: "password",
          component: PasswordInput, // 비밀번호 입력 화면
        },
        {
          path: "agreement", // /signup/agreement
          name: "agreement",
          component: TermsAgreement, // 약관 동의 화면
        },
        {
          path: "welcome", // /signup/welcome
          name: "welcome",
          component: WelcomeSignup, // 환영 페이지
        },
        {
          path: "alert", // /signup/alert
          name: "alert",
          component: LoginAlert, // 로그인 알림 페이지
        },
      ],
    },
    {
      path: "/mypage",
      name: "MyPage",
      component: MyPage,
    },
    {
      path: "/my-ticket-list",
      name: "myticketlist",
      component: MyTicketList,
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
        {
          path: "password",
          name: "password",
          component: VerificationPasswordInput,
        },
        {
          path: "payment-success",
          name: "payment-success",
          component: PaymentSuccessPage,
        },
      ],
    },
    {
      path: "/musical",
      name: "MusicalList",
      component: MusicalList,
    },
	{
		path: "/musical/:id",
		name: "MusicalDetail",
		component: MusicalDetail,
		props: true
	}
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/signup"];
  const authRequired = !publicPages.some((page) => to.path.startsWith(page));
  const token = localStorage.getItem("accessToken");

  if (authRequired && !token) {
    alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;