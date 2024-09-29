<template>
	<div class="special-component">
		<span>{{ formattedIncome }}</span>
		<span>{{ formattedOutcome }}</span>
		<span v-if="hasMemo">Memo</span>
	</div>
</template>

<script>
	export default {
		name: "SpecialComponent",
		props: {
			date: String,
			formattedIncome: String,
			formattedOutcome: String,
			hasMemo: Boolean,
		},
	};
</script>

<style scoped>
	.special-component {
		display: flex;
		gap: 5px;
		font-size: 12px;
	}
</style>
