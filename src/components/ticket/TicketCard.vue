<template>
	<!-- wrapper -->
	<div
		class="card-wrapper"
		@touchstart="handleTouchStart"
		@touchend="handleTouchEnd"
	>
		<!-- 카드 루프 -->
		<div
			v-for="(card, index) in cards"
			:key="index"
			:style="cardStyle(index)"
			@click="isTopCard(index) ? flipCard(card.isUsed) : null"
			class="card-container"
		>
			<!-- 개별 카드 -->
			<div :class="['card', { 'is-flipped': isFlipped && isTopCard(index) }]">
				<!-- 앞면 -->
				<div class="front">
					<!-- 포스터 이미지 -->
					<!-- TODO: 투명도를 주면 뒤 포스터가 보임 / :style="{ opacity: card.isUsed ? 0.7 : 1 }" -->

					<img :src="card.imageUrl" :alt="'Card Image ' + index" />
					<!-- 사용했다면 USED 이미지 생성 -->
					<img
						v-if="card.isUsed"
						class="usedMark"
						src="@/assets/ticket/used_image.png"
					/>
				</div>
				<!-- 뒷면 -->
				<div class="back qr-side">
					<!-- 카운트다운 타이머 -->
					<p class="QRCount">
						{{ formattedCountdown }}
						<img
							class="refresh_cycle"
							src="@/assets/ticket/refresh_cycle.svg"
							alt="refresh_cycle SVG"
						/>
					</p>

					<!-- QR-Frame -->
					<img
						src="@/assets/qr/QRFrame.png"
						:alt="'QR Frame ' + index"
						class="QRFrameImg"
					/>
					<!-- QR 코드가 없을 때 만료 메시지 표시 -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useTicketStore } from "@/stores/tickets";
	import { computed, defineComponent, onUnmounted, ref } from "vue";

	export default defineComponent({
		name: "TicketCard",
		props: {
			cards: Array, // 부모 컴포넌트에서 전달된 카드 배열
			currentCard: Number, // 부모 컴포넌트에서 전달된 현재 카드
		},
		emits: ["update:currentCard"], // 부모에게 currentCard 업데이트 이벤트 방출

		setup() {
			const ticketStore = useTicketStore();
			const touchStartX = ref(0);
			const touchEndX = ref(0);
			const isFlipped = ref(false);

			// 카운트다운 타이머 변수
			const countdown = ref(40); // Countdown starts from 40 seconds
			let timer = null; // To store the interval ID

			// 카운트다운 시간 형식 변경mm:ss
			const formattedCountdown = computed(() => {
				const minutes = String(Math.floor(countdown.value / 60)).padStart(
					2,
					"0"
				);
				const seconds = String(countdown.value % 60).padStart(2, "0");
				return `${minutes}:${seconds}`;
			});

			// 카운트다운 종료 시 로컬 스토리지에서 QR 토큰 삭제 및 QR 코드 무효화
			const startCountdown = () => {
				// 중복 타이머 실행 방지
				if (timer) return;

				timer = setInterval(() => {
					if (countdown.value > 0) {
						countdown.value--;
					} else {
						clearInterval(timer);
						timer = null;
					}
				}, 1000);
			};

			// Clear the countdown timer
			const clearCountdown = () => {
				if (timer) {
					clearInterval(timer);
					timer = null;
				}
				countdown.value = 40; // Reset countdown
			};

			// 카드 이동 로직
			const handleTouchStart = (event) => {
				touchStartX.value = event.touches[0].clientX;
			};

			// 카드 이동 시 카운트다운 초기화
			const handleTouchEnd = (event) => {
				touchEndX.value = event.changedTouches[0].clientX;
				const diffX = touchEndX.value - touchStartX.value;
				if (diffX > 50) {
					ticketStore.prevCard();
					isFlipped.value = false;
					clearCountdown();
				} else if (diffX < -50) {
					ticketStore.nextCard();
					isFlipped.value = false;
					clearCountdown();
				}
			};

			// 카드 회전 로직 (flip)
			const flipCard = (isUsed) => {
				if (isUsed) return;
				isFlipped.value = !isFlipped.value;

				if (isFlipped.value) {
					startCountdown();
				} else {
					clearCountdown();
				}
			};

			// 현재 가장 위에 있는 카드인지 확인하는 함수
			const isTopCard = (index) => {
				const offset =
					(index - ticketStore.currentCard + ticketStore.cards.length) %
					ticketStore.cards.length;
				return offset === 2; // offset이 2인 카드가 z-index가 가장 높음
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

			// Clean up when component is unmounted
			onUnmounted(() => {
				clearCountdown();
			});

			return {
				handleTouchStart,
				handleTouchEnd,
				flipCard,
				cardStyle,
				isFlipped,
				ticketStore,
				isTopCard,
				formattedCountdown,
			};
		},
	});
</script>

<style scoped>
	.card-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		position: relative;
		padding-left: 70px;
		height: 350px;
		perspective: 1000px;
		overflow: hidden;
		cursor: pointer;
	}

	.card-container {
		position: absolute;
		width: 200px;
		height: 300px;
		transform-style: preserve-3d;
		transition: all 0.5s ease;
	}

	.card {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transition: transform 0.8s;
	}

	.card.is-flipped {
		transform: rotateY(180deg);
	}

	.front {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.back {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		top: 0;
		left: 0;
		z-index: 1;
		transform: rotateY(180deg);
	}

	/* usedImg */
	.usedMark {
		position: absolute;
		left: 0;
		color: white;
		height: 100%;
		padding: 5px;
		border-radius: 20px;
		object-fit: cover;
	}

	/* 카운트다운 스타일 */
	.QRCount {
		position: absolute;
		top: 8%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		color: black;
		font-size: 24px;
		font-weight: bold;
	}
	.refresh_cycle {
		position: absolute;
		left: 80px;
		top: 10px;
		width: 20px;
	}
	.QRImg {
		position: absolute;
		left: 0;
	}

	.qr-side {
	}

	.QRFrameImg {
		border: 1px dotted grey;
		width: 100%;
	}

	img {
		width: 100%;
		height: auto;
		border-radius: 24px;
	}
</style>
