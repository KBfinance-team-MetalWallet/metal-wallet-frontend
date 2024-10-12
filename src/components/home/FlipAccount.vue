<template>
	<div>
		<p class="my-account-text">내 지갑</p>

		<!-- QR 코드 표시 영역 -->
		<transition name="slide-up">
			<div
				v-if="selectedCard && qrCodeDataUrl"
				class="qr-overlay"
				@click="closeQrCode"
			>
				<img :src="qrCodeDataUrl" alt="QR Code" class="qr-code" />
			</div>
		</transition>

		<!-- 카드 전체를 감싸는 래퍼 -->
		<div
			class="card-wrapper"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd"
		>
			<!-- 계좌들을 루프 돌면서 렌더링 -->
			<div
				v-for="(account, index) in accounts"
				:key="account.id"
				:style="cardStyle(index)"
				class="card-container"
				@click="handleCardClick(account)"
			>
				<!-- 개별 카드 -->
				<div class="card" :style="{ backgroundColor: account.bankColor }">
					<div class="front">
						<!-- 계좌 정보 -->
						<div class="div3">{{ account.bankName }}</div>
						<div class="div2">${{ account.balance.toLocaleString() }}</div>
						<div class="div1">출금계좌 : {{ account.accountNumber }}</div>
						<img :src="account.bankLogo" alt="Bank Logo" class="imageIcon" />
						<a class="div4" @click.stop="goToPaymentHistory(account.id)"
							>더보기</a
						>
					</div>
				</div>
			</div>
		</div>

		<!-- 페이지 인디케이터 -->
		<div class="componentChild">
			<div
				v-for="(account, index) in accounts"
				:key="account.id"
				:class="['dot', { active: currentAccount === index }]"
			></div>
		</div>
	</div>
</template>

<script>
	import { useAccountStore } from "@/stores/accounts.js";
	import { computed, defineComponent, ref } from "vue";
	import { useRouter } from "vue-router";

	export default defineComponent({
		name: "FlipAccount",
		props: {
			disableCardClick: {
				type: Boolean,
				default: false,
			},
		},
		setup(props) {
			const router = useRouter();
			const accountStore = useAccountStore();
			const accounts = computed(() => accountStore.accounts);
			const currentAccount = ref(0);
			const touchStartX = ref(0);
			const isDragging = ref(false);
			const dragOffsetX = ref(0);

			const selectedCard = ref(null);
			const qrCodeDataUrl = ref("");

			const handleTouchStart = (event) => {
				touchStartX.value = event.touches[0].clientX;
				isDragging.value = true;
			};

			const handleTouchMove = (event) => {
				if (!isDragging.value) return;
				const currentX = event.touches[0].clientX;
				dragOffsetX.value = currentX - touchStartX.value;
			};

			const handleTouchEnd = () => {
				if (!isDragging.value) return;
				isDragging.value = false;

				const threshold = 100;
				if (dragOffsetX.value > threshold && currentAccount.value > 0) {
					prevAccount();
				} else if (
					dragOffsetX.value < -threshold &&
					currentAccount.value < accounts.value.length - 1
				) {
					nextAccount();
				}

				dragOffsetX.value = 0;
			};

			const prevAccount = () => {
				if (currentAccount.value > 0) {
					currentAccount.value -= 1;
				}
			};

			const nextAccount = () => {
				if (currentAccount.value < accounts.value.length - 1) {
					currentAccount.value += 1;
				}
			};

			const cardStyle = (index) => {
				const currentIndex = currentAccount.value;
				let offset = index - currentIndex;

				if (offset < -1 || offset > 1) {
					offset = offset < -1 ? -2 : 2;
				}

				let transformX = 0;
				let zIndex = 1;

				const cardWidth = 330;

				if (offset === 0) {
					transformX = dragOffsetX.value;
					zIndex = 3;
				} else if (offset === -1) {
					transformX = -cardWidth + dragOffsetX.value;
					zIndex = 2;
				} else if (offset === 1) {
					transformX = cardWidth + dragOffsetX.value;
					zIndex = 2;
				} else {
					transformX = offset < 0 ? -cardWidth * 2 : cardWidth * 2;
					zIndex = 1;
				}

				return {
					transform: `translateX(${transformX}px)`,
					transition: isDragging.value ? "none" : "transform 0.3s ease",
					position: "absolute",
					top: "0",
					left: "0",
					zIndex,
					width: `${cardWidth}px`,
					height: "175px",
					pointerEvents: offset === 0 ? "auto" : "none",
				};
			};

			const handleCardClick = (account) => {
				if (props.disableCardClick) return;
				if (selectedCard.value && selectedCard.value.id === account.id) {
					selectedCard.value = null;
					qrCodeDataUrl.value = "";
				} else {
					const token = localStorage.getItem("accessToken");
					if (token) {
						const MOCK_TOKEN = `MOCK_TOKEN_${account.id}`;
						const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
							MOCK_TOKEN
						)}&size=150x150`;
						qrCodeDataUrl.value = qrUrl;

						selectedCard.value = account;
					} else {
						alert("로그인이 필요합니다.");
					}
				}
			};

			const closeQrCode = () => {
				selectedCard.value = null;
				qrCodeDataUrl.value = "";
			};

			const goToPaymentHistory = (accountId) => {
				const path = `/payment-history/${accountId}`;
				router.push(path);
			};

			return {
				accounts,
				currentAccount,
				handleTouchStart,
				handleTouchMove,
				handleTouchEnd,
				cardStyle,
				handleCardClick,
				selectedCard,
				qrCodeDataUrl,
				closeQrCode,
				goToPaymentHistory,
			};
		},
	});
</script>

<style scoped>
	.slide-up-enter-active {
		animation: slideUp 0.3s forwards;
	}

	.slide-up-leave-active {
		animation: slideDown 0.3s forwards;
	}

	@keyframes slideUp {
		from {
			transform: translateY(-100%);
			opacity: 0;
		}

		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes slideDown {
		from {
			transform: translateY(0);
			opacity: 1;
		}

		to {
			transform: translateY(-100%);
			opacity: 0;
		}
	}

	.my-account-text {
		position: relative;
		top: 12px;
		margin: 12px 10px;
		font-weight: bold;
	}

	.qr-overlay {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(5px);
		position: fixed;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: 100;
		cursor: pointer;
	}

	.qr-code {
		width: 150px;
		height: 150px;
		object-fit: cover;
		border-radius: 10px;
	}

	.card-wrapper {
		width: 330px;
		height: 175px;
		position: relative;
		overflow: hidden;
		margin: 0 auto;
	}

	.card-container {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 330px;
		height: 175px;
		transform-style: preserve-3d;
		transition: transform 0.5s ease;
		will-change: transform;
	}

	.card {
		width: 100%;
		height: 100%;
		position: relative;
		border-radius: 15px;
		overflow: hidden;
		cursor: pointer;
	}

	.front {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		top: 0;
		left: 0;
	}

	.div1 {
		position: absolute;
		top: 100px;
		left: 22px;
		font-weight: 500;
		font-family: "bamin_title";
	}

	.div2 {
		position: absolute;
		top: 50px;
		left: 22px;
		font-size: 24px;
		font-weight: 500;
		color: #000;
		font-family: "bamin_title";
	}

	.imageIcon {
		position: absolute;
		top: 19px;
		left: 239px;
		width: 72px;
		height: 72px;
		object-fit: cover;
	}

	.div3 {
		position: absolute;
		top: 19px;
		left: 22px;
		font-weight: 500;
		font-family: "bamin_title";
	}

	.div4 {
		position: absolute;
		top: 141px;
		left: 272px;
	}

	.componentChild {
		position: absolute;
		bottom: 20px;
		left: 40%;
		display: flex;
		justify-content: center;
		margin-top: 10px;
		z-index: 20;
	}

	.dot {
		width: 10px;
		height: 6px;
		background-color: gray;
		margin: 0 5px;
	}

	.dot.active {
		background-color: black;
	}
</style>
