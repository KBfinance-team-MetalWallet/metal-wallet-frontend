import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/Home.vue";
import MyPage from "@/components/mypages/MyPage.vue";
import TicketStorage from "@/components/mypages/TicketStorage.vue";
import MyTicketList from "@/components/mypages/MyTicketList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/mypage",
      name: "MyPage",
      component: MyPage,
    },
    {
      path: "/ticket-storage",
      name: "TicketStorage",
      component: TicketStorage,
    },
    {
      path: "/my-ticket-list",
      name: "MyTicketList",
      component: MyTicketList,
    },
  ],
});

export default router;
