<template>
  <div :class="$style.androidLarge2">
    <video :class="$style.bgVisorVideo" ref="videoElement" autoplay playsinline></video>
    <canvas ref="canvasElement" style="display:none;"></canvas>

    <div :class="$style.bgVisor" />
    <div :class="$style.visorAreIcon" />
    <img :class="$style.vectorStrokeIcon" alt="" src="@/assets/admin/CancelIcon.svg" @click="goToAdminPage" />
    <img :class="$style.cameraStroke90" alt="" src="@/assets/admin/CameraStroke.svg" />
    <img :class="$style.cameraStroke180" alt="" src="@/assets/admin/CameraStroke.svg" />
    <img :class="$style.cameraStroke270" alt="" src="@/assets/admin/CameraStroke.svg" />
    <img :class="$style.cameraStroke360" alt="" src="@/assets/admin/CameraStroke.svg" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import jsQR from 'jsqr';
import axios from 'axios';

export default defineComponent({
  name: 'CameraComponent',
  setup() {
    const videoElement = ref<HTMLVideoElement | null>(null);
    const canvasElement = ref<HTMLCanvasElement | null>(null);
    const canvasContext = ref<CanvasRenderingContext2D | null>(null);

    const router = useRouter();
    const scanning = ref(true); // 스캔 제어용 플래그

    // 카메라 시작 함수
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });

        if (videoElement.value) {
          videoElement.value.srcObject = stream;
          videoElement.value.play();

          videoElement.value.addEventListener('loadedmetadata', () => {
            if (canvasElement.value) {
              canvasElement.value.width = videoElement.value!.videoWidth;
              canvasElement.value.height = videoElement.value!.videoHeight;
            }
            scanQRCode(); // QR 코드 스캔 시작
          });
        }
      } catch (err: any) {
        if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          console.error("요청된 장치를 찾을 수 없습니다.");
        } else if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          console.error("카메라 접근이 거부되었습니다.");
        } else {
          console.error("getUserMedia 에러:", err);
        }
      }
    };

    // QR 코드 스캔 함수
    const scanQRCode = () => {
      if (!scanning.value) return;

      if (videoElement.value && canvasElement.value) {
        if (!canvasContext.value) {
          canvasContext.value = canvasElement.value.getContext('2d');
        }

        if (canvasContext.value) {
          canvasContext.value.drawImage(videoElement.value, 0, 0, canvasElement.value.width, canvasElement.value.height);

          const imageData = canvasContext.value.getImageData(0, 0, canvasElement.value.width, canvasElement.value.height);

          const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

          if (qrCode) {
            console.log("QR 코드 데이터:", qrCode.data);
            sendScannedData(qrCode.data);
            // 응답을 받을 때까지 스캔을 일시 중지
            scanning.value = false;
          }
        }
      }

      requestAnimationFrame(scanQRCode); // 재귀 호출로 지속적인 스캔
    };

    // 스캔된 QR 코드 데이터를 서버로 전송하는 함수
    const sendScannedData = async (scannedData: string) => {
      try {
        const response = await axios.post('/api/qr/scan', { scannedData });
        console.log('서버 응답:', response.data);

        if (response.data.valid) {
          // 티켓이 유효하면 다음 페이지로 이동
          router.push("/next-page"); // 원하는 경로로 대체하세요
        } else {
          alert("유효하지 않은 티켓입니다. 다시 시도해주세요.");
          scanning.value = true; // 스캔 재개
        }
      } catch (error) {
        console.error('서버 요청 중 오류 발생:', error);
        alert('서버와의 통신 중 문제가 발생했습니다. 다시 시도해주세요.');
        scanning.value = true; // 오류 발생 시 스캔 재개
      }
    };

    // 관리자 페이지로 이동하는 함수
    const goToAdminPage = () => {
      router.push("/admin/admin");
    };

    onMounted(() => {
      startCamera(); // 카메라 시작
    });

    onUnmounted(() => {
      // 스캔 중지
      scanning.value = false;

      // 비디오 스트림 중지
      if (videoElement.value && videoElement.value.srcObject) {
        const stream = videoElement.value.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    });

    return {
      videoElement,
      canvasElement,
      goToAdminPage,
    };
  },
});
</script>


<style module>
.bgVisor {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.05);
  width: 375px;
  height: 812px;
}

.bgVisorVideo {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.visorAreIcon {
  position: absolute;
  top: 272px;
  left: 47px;
  border-radius: 20px;
  width: 281px;
  height: 267px;
}

.vectorStrokeIcon {
  position: absolute;
  height: 2.71%;
  width: 5.87%;
  top: 38px;
  left: 22px;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}

.cameraStroke90 {
  position: absolute;
  top: 269.5px;
  left: 285.5px;
  width: 45px;
  height: 45px;
  transform: rotate(180deg);
}

.cameraStroke180 {
  position: absolute;
  top: 269.5px;
  left: 44.5px;
  width: 45px;
  height: 45px;
  object-fit: contain;
  transform: rotate(90deg);
}

.cameraStroke270 {
  position: absolute;
  top: 496.5px;
  left: 285.5px;
  width: 45px;
  height: 45px;
  object-fit: contain;
  transform: rotate(270deg);
}

.cameraStroke360 {
  position: absolute;
  top: 496.5px;
  left: 44.5px;
  width: 45px;
  height: 45px;
  object-fit: contain;
  transform: rotate(360deg);
}

.androidLarge2 {
  width: 100%;
  position: relative;
  background-color: #fff;
  height: 812px;
  overflow: hidden;
}
</style>