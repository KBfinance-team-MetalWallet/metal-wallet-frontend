<template>
  <div :class="$style.container">
    <MainHeader class="main-header" />
    <div :class="$style.content">
      <div :class="$style.inner">
        <b :class="$style.pageName">결제 내역</b>
      </div>
      <div :class="$style.child" />

      <!-- 계좌 정보 카드 -->
      <div :class="$style.rectangleIcon">
        <div :class="$style.balanceAndImage">
          <div class="account-info">
            <b :class="$style.kb">{{ accountName }}</b>
            <div :class="$style.div1">{{ accountNumber }}</div>
          </div>

          <!-- 금액 및 이미지 -->
          <img :class="$style.image141Icon" alt="" src="@/assets/mypages/kbImage.png" />
        </div>
        <b :class="$style.balance">{{ formatCurrency(currentBalance) }}</b>

        <!-- 이체하기 버튼 -->
        <div :class="$style.button">
          <div :class="$style.buttonText">이체하기</div>
        </div>
      </div>

      <!-- 거래 내역 리스트 컴포넌트 -->
      <TransactionRecords :transactions="transactions" />
    </div>
    <!-- Footer -->
    <Footer class="footer" />
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import axios from 'axios';
import MainHeader from '../../components/MainHeader.vue';
import Footer from '../../components/Footer.vue';
import TransactionRecords from '../../components/mypages/TransactionRecords.vue';

export default defineComponent({
  name: "Frame",
  components: {
    MainHeader,
    Footer,
    TransactionRecords,
  },
  data() {
    return {
      transactions: [], // 거래 내역
      accountId: 8, // 현재 선택된 계좌 ID
      accountName: "", // 계좌 이름
      accountNumber: "", // 계좌 번호
      currentBalance: 0, // 현재 잔액
    };
  },
  mounted() {
    this.fetchAccountDetails(); // 계좌 상세 정보 가져오기
    this.fetchTransactionRecords(); // 거래 내역 가져오기
  },
  methods: {
    // 단일 계좌 상세 정보 가져오기
    async fetchAccountDetails() {
      const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTcyODAyNTA0OCwicm9sZSI6IlVTRVIifQ.VkHPsFkYvpWDAbySASPa52usMr1CyhZJLmR7C75niRIQxKz_hrv8bDnlXsu7ltmkOg48whrt5rmjmyupX-576w";
      try {
        const response = await axios.get(`http://localhost:8080/api/accounts/${this.accountId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const account = response.data.result;
        // 응답 결과를 데이터에 반영
        this.accountName = account.bankName; // 계좌 이름
        this.accountNumber = account.accountNumber; // 계좌 번호
        this.currentBalance = account.balance; // 잔액
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    },

    // 특정 계좌의 거래 내역 가져오기
    async fetchTransactionRecords() {
      const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTcyODAyNTA0OCwicm9sZSI6IlVTRVIifQ.VkHPsFkYvpWDAbySASPa52usMr1CyhZJLmR7C75niRIQxKz_hrv8bDnlXsu7ltmkOg48whrt5rmjmyupX-576w";
      try {
        const response = await axios.get(`http://localhost:8080/api/accounts/${this.accountId}/transaction-records`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.transactions = response.data.result.data.map(transaction => ({
          transactionId: transaction.transactionId,
          vendor: transaction.vendor,
          amount: transaction.amount,
          transactionType: transaction.transactionType,
          currentBalance: transaction.currentBalance,
          createdAt: transaction.createdAt,
        }));
      } catch (error) {
        console.error("Error fetching transaction records:", error);
      }
    },

    // 금액 형식 지정
    formatCurrency(amount) {
      return `${amount.toLocaleString()}원`;
    },
  },
});
</script>

<style module>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #f3f3f3;
}

.main-header {
  width: 100%;
  height: 60px;
}

.content {
  flex: 1;
  width: 100%;
  padding-top: 60px;
  overflow: auto;
  padding-bottom: 70px;
}

.inner {
  text-align: center;
  width: 100%;
}

.pageName {
  font-size: 16px;
  color: #6e6e6e;
  font-weight: bold;
  font-family: Roboto;
}

.kb {
  font-size: 14px;
  font-family: Roboto;
  font-weight: bold;
  color: black;
}

.div1 {
  margin-top: 3px;
  font-size: 13px;
  font-family: Roboto;
  color: black;
  margin-bottom: 10px;
}

.rectangleIcon {
  width: 85%;
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 15px;
  padding: 25px;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.balanceAndImage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
}

.balance {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.image141Icon {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.button {
  margin-top: 10px;
  border-radius: 5px;
  background-color: #999;
  width: 100%;
  height: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  color: #333;
}
</style>
