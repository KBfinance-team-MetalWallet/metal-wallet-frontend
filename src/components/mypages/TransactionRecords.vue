<!-- src/components/TransactionRecords.vue -->
<template>
  <div :class="$style.transactionsFrame">
    <div v-for="(transaction, index) in transactions" :key="transaction.transactionId" :class="$style.transactionRow">
      <div :class="$style.transactionItem">{{ formatDate(transaction.createdAt) }}</div>
      <div :class="$style.transactionItemTitle">{{ transaction.vendor }}</div>
      <div :class="$style.transactionAmountBalance">
        <div :class="$style.transactionAmount">{{ formatAmount(transaction.amount, transaction.transactionType) }}</div>
        <div :class="$style.transactionBalance">{{ formatCurrency(transaction.currentBalance) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: "TransactionRecords",
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    },
    formatAmount(amount, transactionType) {
      const sign = transactionType === 'WITHDRAWAL' ? '-' : '';
      return `${sign}${amount.toLocaleString()}원`;
    },
    formatCurrency(amount) {
      return `${amount.toLocaleString()}원`;
    },
  },
};
</script>

<style module>
.transactionsFrame {
  width: 85%;
  position: relative;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 15px;
  background-color: white;
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
  font-size: 16px;
  color: black;
}

.transactionAmount {
  font-size: 16px;
  color: #4f6af6;
}

.transactionBalance {
  font-size: 12px;
  color: #aaa;
}
</style>
