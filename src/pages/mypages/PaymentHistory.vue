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
            <b :class="$style.kb">KB나라사랑우대통장</b>
            <div :class="$style.div1">123-4444-5555</div>
          </div>

          <!-- 금액 및 이미지 -->
          <img :class="$style.image141Icon" alt="" src="@/assets/mypages/kbImage.png" />
        </div>
        <b :class="$style.balance">5,212,500원</b>

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
import TransactionRecords from '../../components/mypages/TransactionRecords.vue'; // 추가

export default defineComponent({
  name: "Frame",
  components: {
    MainHeader,
    Footer,
    TransactionRecords, // 등록
  },
  data() {
    return {
      transactions: [],
      accountId: 8,
    };
  },
  mounted() {
    this.fetchTransactionRecords();
  },
  methods: {
    async fetchTransactionRecords() {
      const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTcyODAyNTA0OCwicm9sZSI6IlVTRVIifQ.VkHPsFkYvpWDAbySASPa52usMr1CyhZJLmR7C75niRIQxKz_hrv8bDnlXsu7ltmkOg48whrt5rmjmyupX-576w";
      try {
        const response = await axios.get(`http://localhost:8080/api/accounts/${this.accountId}/transaction-records`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.transactions = response.data.result.data.map(transaction => ({
          transactionId: transaction.transactionId,
          vendor: transaction.vendor,
          amount: transaction.amount,
          transactionType: transaction.transactionType,
          currentBalance: transaction.currentBalance,
          createdAt: transaction.createdAt
        }));
      } catch (error) {
        console.error("Error fetching transaction records:", error);
      }
    },
  }
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

.transactionsFrame {
  width: 85%;
  position: relative;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 15px;
  padding: 15px;
}

.transactionRow {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.transactionItem,
.transactionItemTitle {
  text-align: left;
  font-size: 16px;
  color: #fff;
}

.transactionAmount {
  font-size: 16px;
  color: #4f6af6;
}

.transactionBalance {
  font-size: 12px;
  color: #aaa;
}

/* Footer 하단 고정 */
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #222;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
