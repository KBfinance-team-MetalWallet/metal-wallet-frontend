import { createRouter, createWebHistory } from "vue-router";

// 로그인 관련 페이지
import LoginAlert from "@/components/login/LoginAlert.vue";
import WelcomeSignup from "@/components/login/WelcomeSignup.vue";
import LoginForm from "@/pages/login/LoginForm.vue";
import PasswordInput from "@/pages/login/PasswordInput.vue";
import Signup from "@/pages/login/Signup.vue";
import SignupForm from "@/pages/login/SignupForm.vue";
import TermsAgreement from "@/pages/login/TermsAgreement.vue";

import Home from "@/pages/Home.vue";
import Ticket from "@/pages/ticket/Ticket.vue";

// 마이페이지 관련
import MyPage from "@/pages/mypages/MyPage.vue";
import MyTicketList from "@/pages/mypages/MyTicketList.vue";
import PaymentHistory from "@/pages/mypages/PaymentHistory.vue";

import MusicalDetail from "@/pages/musical/MusicalDetail.vue";
import MusicalList from "@/pages/musical/MusicalList.vue";

// 예매 관련 페이지
import BookingDatePage from "@/pages/booking/BookingDatePage.vue";
import PaymentSuccessPage from "@/pages/booking/PaymentSuccessPage.vue";
import SeatSelectionPage from "@/pages/booking/SeatSelectionPage.vue";
import VerificationPasswordInput from "@/pages/booking/VerificationPasswordInput.vue";

import { isTokenExpired } from "@/utils/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 충돌 해결
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
          name: "login-password",
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
      path: "/payment-history",
      name: "paymentHistory",
      component: PaymentHistory,
    },
    {
      path: "/booking",
      name: "booking",
      children: [
        {
          // /booking/{musicalId}/dates
          path: ":musical_id(\\d+)/dates",
          name: "bookingDatePage",
          component: BookingDatePage,
        },
        {
          // /booking/{musicalId}/{scheduleId}/seats
          path: ":musicalId/:scheduleId/seats",
          name: "seats",
          component: SeatSelectionPage,
          props: (route) => ({
            musicalId: route.params.musicalId,
            scheduleId: route.params.scheduleId,
          }),
        },
        {
          path: "password",
          name: "password",
          component: VerificationPasswordInput,
          props: (route) => ({
            seats: route.params.seats, // 좌석 정보를 params로 전달
          }),
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
      props: true,
    },
  ],
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/signup", "/musical"];
  const authRequired = !publicPages.some((page) => to.path.startsWith(page));
  const token = localStorage.getItem("accessToken");

  if (authRequired && (!token || isTokenExpired(token))) {
    localStorage.removeItem("accessToken");
    alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
