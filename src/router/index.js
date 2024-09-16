import { createRouter, createWebHistory } from "vue-router";

// 로그인 관련 페이지
import SignupForm from "@/components/login/SignupForm.vue";
import PasswordInput from "@/components/login/PasswordInput.vue";
import TermsAgreement from "@/components/login/TermsAgreement.vue";
import WelcomeSignup from "@/components/login/WelcomeSignup.vue";
import LoginAlert from "@/components/login/LoginAlert.vue";

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
  ],
});

export default router;
