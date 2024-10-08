<template>
	<!-- 카드 전체를 감싸는 wrapper -->
	<div class="card-wrapper" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
		<!-- 카드들을 루프 돌면서 렌더링 -->
		<div v-for="(ticket, index) in tickets" :key="index" :style="cardStyle(index)"
			@click="isTopCard(index) ? flipCard(ticket.isUsed, ticket) : null" class="card-container">
			<!-- 개별 카드 -->
			<div :class="['card', { 'is-flipped': isFlipped && isTopCard(index) }]">
				<!-- 카드 앞면 -->
				<div class="front">
					<!-- 포스터 이미지 -->
					<img :src="ticket.imageUrl" :alt="'Card Image ' + index" />
					<p :class="ticket.isUsed
							? ['Opacity', 'PosterOpacity_false']
							: ['Opacity', 'PosterOpacity_true']
						"></p>

					<!-- 사용된 카드 표시 -->
					<img v-if="ticket.isUsed" class="usedMark" src="@/assets/ticket/used_image.png" />
				</div>
				<!-- 카드 뒷면 -->
				<div class="back qr_side">
					<!-- 카운트다운 타이머 -->
					<p class="QRCount">
						{{ formattedCountdown }}
						<img class="refresh_cycle" src="@/assets/ticket/refresh_cycle.svg" alt="refresh_cycle SVG"
							@click.stop="cycleResetCountdown" />
					</p>

					<!-- QR 코드 이미지 -->
					<img :src="qrCodeDataUrl" class="QRImg" />
					<!-- QR 코드 만료 메시지 -->
					<div v-if="isQrCodeExpired" class="qr-expired-message">
						<img class="cycle_end_refresh" src="@/assets/ticket/refresh_end_cycle.svg"
							alt="refresh_end_cycle SVG" @click.stop="refreshAfterExpiry" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useTicketStore } from "@/stores/tickets";
import axios from "axios"; // 이 줄을 추가하세요
import { computed, defineComponent, onUnmounted, ref } from "vue";

export default defineComponent({
	name: "TicketCard",
	props: {
		tickets: Array, // 부모 컴포넌트에서 전달된 카드 배열
		currentCard: Number, // 부모 컴포넌트에서 전달된 현재 카드 인덱스
	},
	emits: ["update:currentCard"], // 부모에게 currentCard 업데이트 이벤트 방출

	setup(props) {
		const ticketStore = useTicketStore();
		const tickets = props.tickets; // props에서 tickets 가져옴
		const currentCard = props.currentCard; // 필요 시 사용
		const touchStartX = ref(0);
		const touchEndX = ref(0);
		const isFlipped = ref(false);
		const qrCodeDataUrl = ref(""); // QR 코드의 데이터 URL을 저장
		const isQrCodeExpired = ref(false); // QR 코드 만료 상태
		let canReset = ref(true); // 2초간 재호출을 막는 플래그
		const responseDataSecond = ref(0);
		console.log(responseDataSecond.value);
		// 카운트다운 타이머 변수
		const tokenDuration = responseDataSecond.value; // 토큰의 유효 기간 (40초)
		const countdown = ref(tokenDuration); // 카운트다운 시작 시간 (40초)
		let timer = null; // 타이머 ID 저장 변수

		// 카운트다운 시간을 mm:ss 형식으로 변환하는 계산 속성
		const formattedCountdown = computed(() => {
			const minutes = String(Math.floor(countdown.value / 60)).padStart(
				2,
				"0"
			);
			const seconds = String(countdown.value % 60).padStart(2, "0");
			return `${minutes}:${seconds}`;
		});

		// 카운트다운 타이머 시작 함수
		const startCountdown = () => {
			// 이미 타이머가 실행 중이면 중복 실행 방지
			if (timer) return;

			isQrCodeExpired.value = false; // 타이머 시작 시 QR 코드 유효화

			timer = setInterval(() => {
				if (countdown.value > 0) {
					countdown.value--;
				} else {
					clearInterval(timer);
					timer = null;
					clearQrToken(); // QR 토큰 삭제
					invalidateQrCode(); // QR 코드 무효화 처리
				}
			}, 1000);
		};

		// 카운트다운 타이머 초기화 함수
		const clearCountdown = () => {
			if (!canReset.value) return; // 2초 안에 호출 방지

			if (timer) {
				clearInterval(timer);
				timer = null;
			}
			countdown.value = tokenDuration; // 카운트다운 시간 초기화
			// isQrCodeExpired.value = false; // 필요 시 초기화

			canReset.value = false; // 호출 방지 설정
			setTimeout(() => {
				canReset.value = true; // 2초 후 다시 호출 가능
			}, 2000); // 2초 동안 다시 클릭할 수 없게 함
		};

		const cycleResetCountdown = () => {
			if (!canReset.value) return; // 2초 안에 호출 방지
			if (!localStorage.getItem("qrToken")) {
				return; // QR 토큰이 없으면 타이머를 리셋하지 않음
			}

			clearCountdown(); // 기존 타이머 초기화
			countdown.value = responseDataSecond.value;
			startCountdown(); // 타이머 재시작
			// QR 토큰은 유지되므로 추가 작업은 필요 없습니다.
			canReset.value = false; // 호출 방지 설정
			setTimeout(() => {
				canReset.value = true; // 2초 후 다시 호출 가능
			}, 2000);
		};

		// QR 토큰 삭제 함수
		const clearQrToken = () => {
			localStorage.removeItem("qrToken");
		};

		// QR 코드 무효화 함수
		const invalidateQrCode = () => {
			isQrCodeExpired.value = true; // QR 코드 만료 상태로 변경
			// QR 코드 이미지는 유지되고, 투명도는 스타일에서 제어
		};

		// 터치 시작 시 X 좌표 저장
		const handleTouchStart = (event) => {
			touchStartX.value = event.touches[0].clientX;
		};

		// 터치 종료 시 카드 이동 처리 및 타이머, 토큰 초기화
		const handleTouchEnd = (event) => {
			touchEndX.value = event.changedTouches[0].clientX;
			const diffX = touchEndX.value - touchStartX.value;
			if (diffX > 50) {
				ticketStore.prevCard();
				isFlipped.value = false;
				clearCountdown();
				clearQrToken(); // QR 토큰 삭제
				qrCodeDataUrl.value = ""; // QR 코드 이미지 제거
				isQrCodeExpired.value = false; // 만료 상태 초기화
			} else if (diffX < -50) {
				ticketStore.nextCard();
				isFlipped.value = false;
				clearCountdown();
				clearQrToken(); // QR 토큰 삭제
				qrCodeDataUrl.value = ""; // QR 코드 이미지 제거
				isQrCodeExpired.value = false; // 만료 상태 초기화
			}
		};

		// 카드 뒤집기 함수
		const flipCard = async (isUsed, ticket) => {
			if (!canReset.value) return;

			if (isUsed) return;
			isFlipped.value = !isFlipped.value;

			if (isFlipped.value) {
				await fetchQrToken(ticket); // ticket 객체를 전달하여 티켓 ID 사용
				startCountdown();
			} else {
				clearCountdown();
				clearQrToken();
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

		// QR 토큰 받아오는 함수
		const fetchQrToken = async (ticket) => {
			try {
				console.log("featchQrToken 함수 시작");
				if (!ticket || !ticket.id) {
					console.error("ticket 정보가 유효하지 않습니다: ", ticket);
					return; // ticket 정보가 유효하지 않으면 함수 종료
				}

				const ticketId = ticket.id; // 티켓 ID를 ticket 객체에서 가져옴
				const token = localStorage.getItem("accessToken"); // JWT 토큰 가져오기
				if (!token) {
					console.error("JWT 토큰이 없습니다.");
					return; // 토큰이 없으면 함수 종료
				}

				console.log(token, "token 가져오기 성공");

				const response = await axios.post(
					`http://localhost:8080/api/tickets/${ticketId}/qr`,
					{},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				console.log("서버 응답 받음:", response.data);

				const { qrBytes, token: qrToken, second } = response.data;
				responseDataSecond.value = second;

				// qrBytes (byte array)를 Uint8Array로 변환
				const byteArray = new Uint8Array(qrBytes);
				const blob = new Blob([byteArray], { type: "image/png" });
				const url = URL.createObjectURL(blob);
				console.log("QR Code Data URL:", qrCodeDataUrl.value);

				// QR 코드 데이터 URL 업데이트
				qrCodeDataUrl.value = `data:image/png;base64,${qrBytes}`;
				console.log("QR 코드 URL 업데이트 완료", qrCodeDataUrl.value);

				// 로컬 스토리지에 QR 토큰 저장
				localStorage.setItem("qrToken", qrToken);
				countdown.value = second;
			} catch (error) {
				console.error("QR 토큰 발급 중 오류 발생:", error.message);
				console.error(
					"상세 오류 정보:",
					error.response ? error.response.data : error
				);
				throw new Error("QR 토큰 발급에 실패했습니다.");
			}
		};

		// QR 코드 업데이트 함수
		const updateQrCode = (qrToken) => {
			// QR 코드를 생성하는 로직 구현
			// 실제로는 QR 코드 생성 라이브러리를 사용하여 데이터 URL을 생성해야 합니다.

			// 여기서는 목업 처리를 위해 임의의 이미지 URL을 사용합니다.
			qrCodeDataUrl.value = `https://api.qrserver.com/v1/create-qr-code/?data=${qrToken}&size=150x150`;

			// 실제 QR 코드 생성 예시 (qrcode 라이브러리 사용 시):
			// import QRCode from 'qrcode';
			// QRCode.toDataURL(qrToken).then(url => {
			//   qrCodeDataUrl.value = url;
			// });
		};

		const refreshAfterExpiry = async () => {
			console.log("QR 코드 만료 후 새로운 QR 토큰 요청 시도");

			// 2초 안에 다시 클릭할 수 없도록 제어
			if (!canReset.value) {
				console.log("2초 내 재시도 방지: 호출 차단");
				return;
			}

			// 새로운 QR 토큰 발급
			try {
				console.log("현재 카드 인덱스:", ticketStore.currentCard); // 현재 카드 인덱스 로그
				const topCard = tickets[ticketStore.currentCard]; // 현재 카드 가져오기
				console.log("현재 카드 정보:", topCard); // topCard 정보 로그

				// topCard가 제대로 설정되지 않았다면 문제 발생 지점
				if (!topCard) {
					console.error("topCard 정보가 유효하지 않습니다.");
					return;
				}

				await fetchQrToken(topCard); // 새로운 QR 토큰 발급 및 UI 업데이트
				console.log("새로운 QR 토큰 발급 성공");
			} catch (error) {
				console.error("새로운 QR 토큰 발급 오류:", error);
				return; // 에러 발생 시 함수 종료
			}

			// 타이머 초기화 및 재시작
			clearCountdown(); // 기존 타이머 초기화
			countdown.value = responseDataSecond.value;
			startCountdown(); // 타이머 재시작
			isQrCodeExpired.value = false; // 만료 상태 해제
			console.log("타이머 재시작 및 QR 코드 만료 상태 해제");

			// 클릭 방지를 위한 플래그 설정
			canReset.value = false;
			setTimeout(() => {
				canReset.value = true; // 2초 후 다시 클릭할 수 있게 함
			}, 2000);
		};

		// 현재 가장 위에 있는 카드인지 확인하는 함수
		const isTopCard = (index) => {
			const offset =
				(index - ticketStore.currentCard + ticketStore.tickets.length) %
				ticketStore.tickets.length;
			return offset === 2; // offset이 2인 카드가 z-index가 가장 높음
		};

		// 카드의 스타일을 동적으로 계산하는 함수
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

		// 컴포넌트 언마운트 시 타이머 및 토큰 정리
		onUnmounted(() => {
			clearCountdown();
			clearQrToken();
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
			cycleResetCountdown,
			isQrCodeExpired, // 추가된 상태 반환
			refreshAfterExpiry, // 추가된 함수 반환
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
	padding-left: 70px;
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
	/* z-index: 2; */
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
	transform: rotateY(180deg);
	background-color: white;
	border: 1px dotted grey;
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
