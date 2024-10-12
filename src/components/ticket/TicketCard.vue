<template>
	<!-- 카드 전체를 감싸는 wrapper -->
	<div class="card-wrapper" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
		<!-- 카드들을 루프 돌면서 렌더링 -->
		<div v-for="(ticket, index) in tickets" :key="index" :style="cardStyle(index)"
			@click="isTopCard(index) ? flipCard(ticket.ticketStatus, ticket) : null" class="card-container">
			<!-- 개별 카드 -->
			<div :class="['card', { 'is-flipped': isFlipped && isTopCard(index) }]">
				<!-- 카드 앞면 -->
				<div class="front">
					<!-- 포스터 이미지 -->
					<img :src="ticket.posterImageUrl" :alt="'Card Image ' + index" />
					<p
						:class="ticket.ticketStatus == 'CHECKED' ? ['Opacity', 'PosterOpacity_false'] : ['Opacity', 'PosterOpacity_true']">
					</p>

					<!-- 사용된 카드 표시 -->
					<img v-if="ticket.ticketStatus == 'CHECKED'" class="usedMark" src="@/assets/ticket/used_image.png" />
				</div>
				<!-- 카드 뒷면 -->
				<div class="back">
					<!-- 카운트다운 타이머 -->
					<p class="QRCount">
						{{ formattedCountdown }}
					</p>

					<!-- QR 코드 이미지 -->
					<img :src="qrCodeDataUrl" class="QRImg" />
					<!-- QR 코드 만료 메시지 -->
					<div v-if="isQrCodeExpired" class="qr-expired-message">
						<img class="cycle_end_refresh" src="@/assets/ticket/refresh_end_cycle.svg" alt="refresh_end_cycle SVG"
							@click.stop="refreshAfterExpiry" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useTicketStore } from "@/stores/ticketsUse";
import axios from "axios";
import forge from "node-forge";
import { computed, defineComponent, onUnmounted, ref } from "vue";
import QRCode from "qrcode"; // QRCode 라이브러리 임포트

export default defineComponent({
	name: "TicketCard",
	props: {
		tickets: {
			type: Array,
			default: () => [],
		},
		currentCard: {
			type: Number,
			default: 0,
		},
	},
	emits: ["update:currentCard"],

	setup(props) {
		const ticketStore = useTicketStore();
		const touchStartX = ref(0);
		const touchEndX = ref(0);
		const isFlipped = ref(false);
		const qrCodeDataUrl = ref("");
		const isQrCodeExpired = ref(false);
		let canReset = ref(true);
		const countdown = ref(0);
		let timer = null;
		const currentTicket = ref(null);
		const expirationTime = ref(0);

		const formattedCountdown = computed(() => {
			const minutes = String(Math.floor(countdown.value / 60)).padStart(2, "0");
			const seconds = String(countdown.value % 60).padStart(2, "0");
			return `${minutes}:${seconds}`;
		});

		const startCountdown = () => {
			if (timer) return;
			isQrCodeExpired.value = false;
			timer = setInterval(() => {
				const currentTime = Math.floor(Date.now() / 1000);
				countdown.value = expirationTime.value - currentTime;
				if (countdown.value <= 0) {
					clearInterval(timer);
					timer = null;
					invalidateQrCode();
					fetchQrToken(currentTicket.value);
				}
			}, 1000);
		};

		const invalidateQrCode = () => {
			isQrCodeExpired.value = true;
		};

		const handleTouchStart = (event) => {
			touchStartX.value = event.touches[0].clientX;
		};

		const handleTouchEnd = (event) => {
			touchEndX.value = event.changedTouches[0].clientX;
			const diffX = touchEndX.value - touchStartX.value;
			if (diffX > 50) {
				ticketStore.prevCard();
				isFlipped.value = false;
				clearCountdown();
				qrCodeDataUrl.value = "";
				isQrCodeExpired.value = false;
			} else if (diffX < -50) {
				ticketStore.nextCard();
				isFlipped.value = false;
				clearCountdown();
				qrCodeDataUrl.value = "";
				isQrCodeExpired.value = false;
			}
		};

		const flipCard = async (ticketStatus, ticket) => {
			if (!canReset.value || ticketStatus == "CHECKED") return;
			isFlipped.value = !isFlipped.value;

			if (isFlipped.value) {
				currentTicket.value = ticket;
				await fetchQrToken(ticket);
				startCountdown();
			} else {
				clearCountdown();
				isQrCodeExpired.value = false;
				setTimeout(() => {
					qrCodeDataUrl.value = "";
				}, 3000);
			}

			canReset.value = false;
			setTimeout(() => {
				canReset.value = true;
			}, 2000);
		};

		const fetchQrToken = async (ticket) => {
			try {
				const token = localStorage.getItem("accessToken");
				if (!token) {
					console.error("JWT 토큰이 없습니다.");
					return;
				}

				const { id: ticketId, ticketStatus } = ticket;
				const deviceInfo = "temp";

				const response = await axios.post(
					`http://localhost:8080/api/tickets/encrypt/${ticketId}`,
					{
						deviceId: deviceInfo
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const { publicKey, seconds } = response.data;

				// 만료 시간 설정
				expirationTime.value = seconds;

				// 필요한 데이터만 포함하는 ticketInfo 객체 구성
				const ticketInfo = {
					ticketInfo: {
						deviceId: "temp", // 실제 사용 시 적절한 값으로 변경 필요
						ticketId: ticketId,
						ticketStatus: ticketStatus,
					},
				};

				// ticketInfo를 암호화
				const encryptedTicketInfo = await encryptRSA(publicKey, ticketInfo);

				updateQRCode(encryptedTicketInfo);
			} catch (error) {
				handleError(error);
			}
		};

		const encryptRSA = async (publicKeyBase64, ticketInfo) => {
			// ticketInfo 객체를 JSON 문자열로 변환
			const plaintext = JSON.stringify(ticketInfo);

			// base64로 인코딩된 공개 키를 디코딩
			const publicKeyDer = forge.util.decode64(publicKeyBase64);
			const publicKeyAsn1 = forge.asn1.fromDer(publicKeyDer);
			const publicKey = forge.pki.publicKeyFromAsn1(publicKeyAsn1);

			// RSA-OAEP 및 SHA-256을 사용하여 암호화
			const encrypted = publicKey.encrypt(plaintext, "RSA-OAEP", {
				md: forge.md.sha256.create(),
				mgf1: {
					md: forge.md.sha256.create(),
				},
			});

			// 암호화된 데이터를 base64로 인코딩
			const base64Encrypted = forge.util.encode64(encrypted);

			return base64Encrypted;
		};

		// QR 코드 생성 및 표시 함수
		const updateQRCode = async (base64Encrypted) => {
			try {
				const url = await QRCode.toDataURL(base64Encrypted, {
					errorCorrectionLevel: "H",
				});
				qrCodeDataUrl.value = url;
			} catch (err) {
				console.error(err);
			}
		};

		const handleError = (error) => {
			console.error("QR 토큰 발급 중 오류 발생:", error.message);
			console.error("상세 오류 정보:", error.response ? error.response.data : error);
			throw new Error("QR 토큰 발급에 실패했습니다.");
		};

		const clearCountdown = () => {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
			countdown.value = 0;
		};

		const refreshAfterExpiry = async () => {
			if (!canReset.value) return;
			try {
				const topCard = ticketStore.tickets[ticketStore.currentCard];
				if (!topCard) {
					console.error("현재 카드 정보가 유효하지 않습니다.");
					return;
				}
				currentTicket.value = topCard;
				await fetchQrToken(topCard);
				clearCountdown();
				startCountdown();
				isQrCodeExpired.value = false;
			} catch (error) {
				console.error("새 QR 토큰 발급 중 오류 발생:", error);
			}
			canReset.value = false;
			setTimeout(() => {
				canReset.value = true;
			}, 2000);
		};

		const isTopCard = (index) => {
			const offset =
				(index - ticketStore.currentCard + ticketStore.tickets.length) %
				ticketStore.tickets.length;
			return offset === 2;
		};

		const cardStyle = (index) => {
			const offset =
				(index - ticketStore.currentCard + ticketStore.tickets.length) %
				ticketStore.tickets.length;
			const zIndex = 5 - Math.abs(offset - 2);
			const opacity = 1 - 0.2 * Math.abs(offset - 2);
			const transform = `translateX(${(offset - 2) * 50}px) scale(${1 - 0.1 * Math.abs(offset - 2)
				})`;
			return { zIndex, opacity, transform };
		};

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
			qrCodeDataUrl,
			isQrCodeExpired,
			refreshAfterExpiry,
		};
	},
});
</script>

<style scoped>
:focus {
	outline: none;
}

/* 카드 전체를 감싸는 wrapper 스타일 */
.card-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	position: relative;
	height: 350px;
	perspective: 1000px;
	overflow: hidden;
	cursor: pointer;
}

/* 개별 카드 컨테이너 스타일 */
.card-container {
	position: absolute;
	width: 200px;
	height: 300px;
	transform-style: preserve-3d;
	transition: all 0.5s ease;
}

/* 카드 스타일 */
.card {
	width: 100%;
	height: 100%;
	position: relative;
	transform-style: preserve-3d;
	transition: transform 0.8s;
}

/* 카드가 뒤집혔을 때의 스타일 */
.card.is-flipped {
	transform: rotateY(180deg);
}

/* 카드 앞면 스타일 */
.front {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	top: 0;
	left: 0;
}

@keyframes rotBGimg {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}

/* 카드 뒷면 스타일 */
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
	overflow: hidden;
	transform: rotateY(180deg);
	background-color: white;
	border-radius: 24px;
}

.back::before {
	content: '';
	position: absolute;
	width: 150px;
	background-image: linear-gradient(180deg, rgb(255, 157, 157), rgb(255, 152, 152));
	height: 130%;
	animation: rotBGimg 3s linear infinite;
	transition: all 0.2s linear;
}

.back::after {
	content: '';
	position: absolute;
	background: white;
	;
	inset: 5px;
	border-radius: 24px;
}


/* 사용된 카드 표시 스타일 */
.usedMark {
	position: absolute;
	left: 0;
	/* color: red; */
	height: 100%;
	padding: 5px;
	border-radius: 20px;
	object-fit: cover;
	/* z-index: 10; */
}

/* 카운트다운 스타일 */
.QRCount {
	position: absolute;
	top: 16%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 2;
	color: black;
	font-size: 24px;
	font-weight: bold;
}

.Opacity {
	position: absolute;
	width: 200px;
	height: 317px;
	bottom: -17px;
	border-radius: 24px;
	/* border: 1px solid red; */
}

.PosterOpacity_false {
	background-color: black;
	opacity: 0.7;
}

.PosterOpacity_true {
	display: none;
	opacity: 0.7;
	z-index: 3;
	/* background-color: red; */
}

/* 리프레시 아이콘 스타일 */
.refresh_cycle {
	position: absolute;
	left: 80px;
	top: 10px;
	width: 20px;
}

.cycle_end_refresh {
	position: absolute;
	bottom: -70px;
	right: -52px;
	width: 100px;
	z-index: 3;
}

/* QR 코드 이미지 스타일 */
.QRImg {
	position: absolute;
	z-index: 2;
	width: 150px;
	height: 150px;
	margin-top: 50px;
	/* border: 1px solid red; */
	border-radius: 0px;
}

/* QR 코드 만료 메시지 스타일 */
.qr-expired-message {
	position: absolute;
	/* 스타일 조정 필요 시 추가 */
}

/* 이미지 스타일 */
img {
	width: 100%;
	height: auto;
	border-radius: 24px;
}
</style>