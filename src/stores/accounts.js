import kbLogo from "@/assets/account/kb.png";
import kakaoLogo from "@/assets/account/kakao.png";
import tossLogo from "@/assets/account/toss.png";
import { defineStore } from "pinia";
import axios from "axios";

const logos = {
  kb: kbLogo,
  kakao: kakaoLogo,
  toss: tossLogo,
};

export const useAccountStore = defineStore("account", {
  state: () => ({
    accounts: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchAccounts() {
      this.isLoading = true;
      this.error = null;
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get("http://localhost:8080/api/accounts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.resultCode === 200) {
          this.accounts = response.data.result.map((account) => ({
            ...account,
            isUsed: false,
          }));
        } else {
          this.error = response.data.resultMsg || "Failed to fetch accounts";
        }
      } catch (error) {
        this.error = error;
        console.error("Error fetching accounts:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
