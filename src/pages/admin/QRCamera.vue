<template>
  <div :class="$style.androidLarge2">
    <video :class="$style.bgVisorVideo" ref="videoElement" autoplay playsinline></video>
    <canvas ref="canvasElement" style="display:none;"></canvas>

    <div :class="$style.bgVisor" />
    <div :class="$style.visorAreIcon" />
    <img :class="$style.vectorStrokeIcon" alt="" src="@/assets/admin/CancelIcon.svg" />
    <img :class="$style.vectorStrokeIcon1" alt="" src="@/assets/admin/CancelIcon.svg" />
    <img :class="$style.cameraStroke90" alt="" src="@/assets/admin/CameraStroke.svg" />
    <img :class="$style.cameraStroke180" alt="" src="@/assets/admin/CameraStroke.svg" />
    <img :class="$style.cameraStroke270" alt="" src="@/assets/admin/CameraStroke.svg" />
    <img :class="$style.cameraStroke360" alt="" src="@/assets/admin/CameraStroke.svg" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import jsQR from 'jsqr';

export default defineComponent({
  name: 'CameraComponent',
  setup() {
    const videoElement = ref<HTMLVideoElement | null>(null);
    const canvasElement = ref<HTMLCanvasElement | null>(null);
    const canvasContext = ref<CanvasRenderingContext2D | null>(null);

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });

        if (videoElement.value) {
          videoElement.value.srcObject = stream;
          videoElement.value.play();

          // 비디오 메타데이터가 로드되면 캔버스 크기를 설정하고 QR 코드 스캔을 시작합니다.
          videoElement.value.addEventListener('loadedmetadata', () => {
            if (canvasElement.value) {
              canvasElement.value.width = videoElement.value!.videoWidth;
              canvasElement.value.height = videoElement.value!.videoHeight;
            }
            scanQRCode(); // QR 코드 스캔 시작
          });
        }
      } catch (err) {
        if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          console.error("요청된 장치를 찾을 수 없습니다.");
        } else if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          console.error("카메라/마이크 접근 권한이 거부되었습니다.");
        } else {
          console.error("getUserMedia 오류:", err);
        }
      }
    };

    const scanQRCode = () => {
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
          }
        }
      }

      // 계속해서 QR 코드를 읽기 위한 반복 호출
      requestAnimationFrame(scanQRCode);
    };

    // 컴포넌트가 마운트될 때 startCamera 호출
    onMounted(() => {
      startCamera();
    });

    return {
      videoElement,
      canvasElement,
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
  top: 5.67%;
  right: 87.47%;
  bottom: 91.63%;
  left: 6.67%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}

.vectorStrokeIcon1 {
  position: absolute;
  height: 2.71%;
  width: 5.87%;
  top: 5.67%;
  right: 87.47%;
  bottom: 91.63%;
  left: 6.67%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  transform: rotate(90deg);
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