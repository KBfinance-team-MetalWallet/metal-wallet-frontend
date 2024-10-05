import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

// 로그인 관련 페이지
import LoginAlert from "@/components/login/LoginAlert.vue";
import WelcomeSignup from "@/components/login/WelcomeSignup.vue";
import PasswordInput from "@/pages/login/PasswordInput.vue";
import Signup from "@/pages/login/Signup.vue";
import SignupForm from "@/pages/login/SignupForm.vue";
import TermsAgreement from "@/pages/login/TermsAgreement.vue";
import LoginForm from "@/pages/login/LoginForm.vue";

import Home from "@/pages/Home.vue";
import MyPage from "@/pages/mypages/MyPage.vue";
import MyTicketList from "@/pages/mypages/MyTicketList.vue";
import Ticket from "@/pages/ticket/Ticket.vue";

import SeatSelectionPage from "@/pages/booking/SeatSelectionPage.vue";
import SessionComplete from "@/pages/SessionComplete.vue";

import VerificationPasswordInput from "@/pages/booking/VerificationPasswordInput.vue";
import PaymentSuccessPage from "@/pages/booking/PaymentSuccessPage.vue";
import PaymentHistory from "@/pages/mypages/PaymentHistory.vue";

import MusicalList from "@/pages/musical/MusicalList.vue";
import MusicalDetail from "@/pages/musical/MusicalDetail.vue";

// 예매 관련 페이지
import BookingDatePage from "@/pages/booking/BookingDatePage.vue";

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
            path: "/mypage/payment-history",
            name: "paymentHistory",
            component: PaymentHistory,
        },
        {
            path: "/booking",
            name: "Booking",
            redirect: "/booking/seats",
            children: [
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
            path: "/booking/seats",
            name: "seats",
            component: SeatSelectionPage,
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
        {
            path: "/musicals",
            name: "Musicals",
            children: [
                {
                    // http://localhost:5173/musicals/1/seats
                    path: ":musical_id(\\d+)",
                    name: "bookingDatePage",
                    component: BookingDatePage,
                },
                {
                    // http://localhost:5173/musicals/1
                    path: ":musical_id(\\d+)/seats",
                    name: "musical-seats",
                    component: SeatSelectionPage,
                }
            ]
        }
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
