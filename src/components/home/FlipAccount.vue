<template>
	<div>
		<p class="my-account-text">내 지갑</p>

		<!-- QR 코드 표시 영역 -->
		<transition name="slide-up">
			<div v-if="selectedCard && qrCodeDataUrl" class="qr-overlay" @click="closeQrCode">
				<img :src="qrCodeDataUrl" alt="QR Code" class="qr-code" />
			</div>
		</transition>

		<!-- 카드 전체를 감싸는 래퍼 -->

		<div class="card-wrapper" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
			<!-- 계좌들을 루프 돌면서 렌더링 -->
			<div v-for="(account, index) in accounts" :key="account.id" :style="cardStyle(index)"
				@click="handleCardClick(account)" class="card-container">
				<!-- 개별 카드 -->
				<div class="card" :style="{ backgroundColor: account.bankColor }">
					<div class="front">
						<!-- 계좌 정보 -->
						<div class="div3">{{ account.bankName }}</div>
						<div class="div2">{{ account.balance }}</div>
						<div class="div1">출금계좌 : {{ account.accountNumber }}</div>
						<img :src="account.bankLogo" alt="Bank Logo" class="imageIcon" />
						<a class="div4" @click.stop="goToPaymentHistory(account.id)">더보기</a>
					</div>
				</div>
			</div>
		</div>

		<!-- 페이지 인디케이터 -->
		<div class="componentChild">
			<div v-for="(account, index) in accounts" :key="account.id"
				:class="['dot', { active: currentAccount === index }]"></div>
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
		const touchEndX = ref(0);

		// QR 코드 관련 상태
		const selectedCard = ref(null); // 선택된 카드 객체
		const qrCodeDataUrl = ref(""); // QR 코드 이미지 URL

		// 터치 이벤트 핸들러
		const handleTouchStart = (event) => {
			touchStartX.value = event.touches[0].clientX;
		};

		const handleTouchEnd = (event) => {
			touchEndX.value = event.changedTouches[0].clientX;
			const diffX = touchEndX.value - touchStartX.value;
			if (diffX > 50) {
				prevAccount();
			} else if (diffX < -50) {
				nextAccount();
			}
		};

		const prevAccount = () => {
			currentAccount.value =
				(currentAccount.value - 1 + accounts.value.length) %
				accounts.value.length;
		};

		const nextAccount = () => {
			currentAccount.value =
				(currentAccount.value + 1) % accounts.value.length;
		};

		// 카드 스타일 계산 함수
		const cardStyle = (index) => {
			const offset =
				(index - currentAccount.value + accounts.value.length) %
				accounts.value.length;

			const zIndex = accounts.value.length - offset;

			// 각 카드의 위치와 보이는 정도를 부드럽게 조정합니다.
			const translateX = -offset * 30; // 왼쪽으로 30px씩 이동
			const scale = 1 - offset * 0.05; // 카드의 크기를 약간씩 줄임
			const opacity = offset === 0 ? 1 : 0.8; // 맨 앞 카드는 불투명하게, 나머지는 약간 투명하게

			return {
				transform: `translateX(${translateX}px) scale(${scale})`,
				zIndex,
				opacity,
			};
		};

		// 카드 클릭 시 QR 코드 생성 및 표시/숨기기
		const handleCardClick = (account) => {
			if (props.disableCardClick) return;
			if (selectedCard.value && selectedCard.value.id === account.id) {
				// 이미 선택된 카드 클릭 시 QR 코드 숨기기
				selectedCard.value = null;
				qrCodeDataUrl.value = "";
			} else {
				const token = localStorage.getItem("accessToken"); // localStorage에서 accessToken 가져오기
				if (token) {
					// MOCK_TOKEN을 생성합니다. 실제로는 필요한 데이터를 넣으세요.
					const MOCK_TOKEN = `MOCK_TOKEN_${account.id}`;
					// QR 코드 생성 URL
					const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
						MOCK_TOKEN
					)}&size=150x150`;
					qrCodeDataUrl.value = qrUrl;

					// 선택된 카드 설정
					selectedCard.value = account;
				} else {
					alert("로그인이 필요합니다.");
				}
			}
		};

		// QR 코드 오버레이 닫기
		const closeQrCode = () => {
			selectedCard.value = null;
			qrCodeDataUrl.value = "";
		};

		const goToPaymentHistory = (accountId) => {
			const path = `/payment-history/${accountId}`; // 경로 설정
			router.push(path); // Vue Router를 사용하여 이동
		};

		return {
			accounts,
			currentAccount,
			handleTouchStart,
			handleTouchEnd,
			cardStyle,
			handleCardClick,
			selectedCard,
			qrCodeDataUrl,
			closeQrCode,
			goToPaymentHistory
		};
	},
});
</script>
<style scoped>
/* QR 코드 슬라이드 업 애니메이션 */
.slide-up-enter-active {
	animation: slideUp 1s forwards;
	/* 슬라이드 업 애니메이션 실행 */
}

.slide-up-leave-active {
	animation: slideDown 1s forwards;
	/* 슬라이드 다운 애니메이션 실행 */
}

@keyframes slideUp {
	from {
		transform: translateY(-100%);
		/* 시작 위치: 카드 위에서 멀리 떨어짐 */
		opacity: 0;
		/* 투명하게 시작 */
	}

	to {
		transform: translateY(0);
		/* 최종 위치: 원래 자리 */
		opacity: 1;
		/* 완전히 불투명하게 */
	}
}

@keyframes slideDown {
	from {
		transform: translateY(0);
		/* 시작 위치: 원래 자리 */
		opacity: 1;
		/* 불투명하게 시작 */
	}

	to {
		transform: translateY(-100%);
		/* 최종 위치: 카드 위로 이동 */
		opacity: 0;
		/* 투명하게 */
	}
}

.my-account-text {
	position: relative;
	top: 10px;
	/* height: 50px; */
	/* border: 1px solid red; */
	margin: 24px 10px;
	/* z-index: 100; */
	font-weight: bold;
}

/* QR 코드 오버레이 스타일 */
.qr-overlay {
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 150px;
	/* background: rgba(255, 255, 255, 0.95); 반투명 흰색 배경 */
	border-radius: 10px;
	border: 1px dotted #a43758;
	position: absolute;
	/* 부모 요소를 기준으로 절대 위치 */
	/* top: 50%; */
	/* left: 2%; */
	/* transform: translate(-50%, -50%) scale(1); 정확한 중앙 위치 */
	overflow: hidden;
	z-index: 10;
	/* 카드 위에 표시되도록 설정 */
	cursor: pointer;
	/* 클릭 가능 표시 */
}

/* QR 코드 이미지 스타일 */
.qr-code {
	width: 150px;
	height: 150px;
	object-fit: cover;
}

/* 카드 전체를 감싸는 wrapper 스타일 */
.card-wrapper {
	display: flex;
	justify-content: flex-start;
	/* 왼쪽 정렬 */
	align-items: center;
	width: 100%;
	position: relative;
	height: 200px;
	perspective: 1000px;
	/* 3D 효과를 위한 원근감 */
	overflow: hidden;
	/* margin-top: 60px; */
	margin-left: 8px;
}

/* 개별 카드 컨테이너 스타일 */
.card-container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 335px;
	height: 175px;
	transform-style: preserve-3d;
	/* 3D 변환 유지 */
	transition: transform 0.5s ease, opacity 0.5s ease;
	/* 카드 이동 및 투명도 변경에 트랜지션 적용 */
}

/* 카드 스타일 */
.card {
	width: 100%;
	height: 100%;
	position: relative;
	border-radius: 15px;
	/* 카드 모서리 둥글게 */
	overflow: hidden;
	cursor: pointer;
}

/* 카드 앞면 스타일 */
.front {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	/* 뒷면 보이지 않게 */
	top: 0;
	left: 0;
}

/* 계좌 정보 스타일 */
.div1 {
	position: absolute;
	top: 100px;
	left: 22px;
	font-weight: 500;
}

.div2 {
	position: absolute;
	top: 50px;
	left: 22px;
	font-size: 24px;
	font-weight: 500;
	color: #000;
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
}

.div4 {
	top: 141px;
	left: 272px;
}

/* 페이지 인디케이터 스타일 */
.componentChild {
	display: flex;
	justify-content: center;
	margin-top: 10px;
}

.dot {
	border-radius: 50%;
	width: 10px;
	height: 10px;
	background-color: gray;
	margin: 0 5px;
}

.dot.active {
	background-color: red;
}
</style>
