<template>
	<div
		class="card-container"
		@touchstart="handleTouchStart"
		@touchend="handleTouchEnd"
	>
		<div
			v-for="(card, index) in cards"
			:key="index"
			:class="['card', { 'used-card': card.isUsed }]"
			:style="cardStyle(index)"
		>
			<!-- 포스터 이미지 -->
			<img :src="card.imageUrl" :alt="'Card Image ' + index" />

			<!-- card.isUsed에 따라 USED 이미지 표시 / 조건부 렌더링 -->
			<img
				v-if="card.isUsed"
				class="usedMark"
				src="@/assets/ticket/used_image.png"
			/>
		</div>
	</div>
</template>

<script>
	import { useTicketStore } from "@/stores/tickets";
	import { defineComponent, ref } from "vue";

	export default defineComponent({
		name: "CardSlider",
		props: {
			cards: Array, // 부모 컴포넌트에서 전달된 카드 배열
			currentCard: Number, // 부모 컴포넌트에서 전달된 현재 카드
		},
		emits: ["update:currentCard"], // 부모에게 currentCard 업데이트 이벤트 방출

		setup() {
			const ticketStore = useTicketStore();
			const touchStartX = ref(0);
			const touchEndX = ref(0);

			// 카드 이동 로직
			const handleTouchStart = (event) => {
				touchStartX.value = event.touches[0].clientX;
			};

			const handleTouchEnd = (event) => {
				touchEndX.value = event.changedTouches[0].clientX;
				const diffX = touchEndX.value - touchStartX.value;
				if (diffX > 50) {
					ticketStore.prevCard();
				} else if (diffX < -50) {
					ticketStore.nextCard();
				}
			};

			const cardStyle = (index) => {
				const offset =
					(index - ticketStore.currentCard + ticketStore.cards.length) %
					ticketStore.cards.length;
				const zIndex = 5 - Math.abs(offset - 2);
				const opacity = 1 - 0.2 * Math.abs(offset - 2);
				const transform = `translateX(${(offset - 2) * 50}px) scale(${
					1 - 0.1 * Math.abs(offset - 2)
				})`;
				return { zIndex, opacity, transform };
			};

			return { handleTouchStart, handleTouchEnd, cardStyle };
		},
	});
</script>

<style scoped>
	/** 포스터 크기 조절  */
	.card-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		position: relative;
		padding-left: 70px; /** 왼쪽 화면에서 떼어내기 */
		height: 350px;
		perspective: 500px;
		overflow: hidden;
	}

	.card {
		/* border: 1px solid red; */
		position: absolute;
		width: 200px;
		height: 300px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.5s ease;
		/* transform-style: preserve-3d; */
	}
	/*  포스터 밑 used_Img 크기 조절  */
	.usedMark {
		position: absolute;
		/* top: 0; */
		/* right: 0; */
		/* background-color: rgba(255, 0, 0, 0.7); 사용 표시는 빨간색 반투명 배경 */
		color: white;
		height: 200px;
		padding: 5px;
		border-radius: 5px;
		object-fit: cover;
	}

	img {
		width: 100%;
		height: auto;
		border-radius: 24px;
		/* box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
			rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
			rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
			rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
			rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
			rgba(0, 0, 0, 0.09) 0px 32px 16px; */
	}
</style>
