<template>
	<div class="slidePosterWrapper">
		<div class="bannerWrapper">
			<div class="slideContainer" :style="slideStyle">
				<img
					v-for="(image, index) in images"
					:key="index"
					:src="image"
					alt="배너 이미지"
					class="bannerImg"
				/>
			</div>
			<div class="bannerNav">
				<p
					v-for="(image, index) in images"
					:key="index"
					:class="{ active: index === currentIndex }"
				></p>
			</div>
		</div>
	</div>
</template>

<script>
	import kbBanner1 from "@/assets/slide/kbBanner1.jpg";
	import kbBanner2 from "@/assets/slide/kbBanner2.jpg";
	import kbBanner3 from "@/assets/slide/kbBanner3.jpg";

	export default {
		name: "SlidePoster",
		data() {
			return {
				currentIndex: 0,
				images: [kbBanner1, kbBanner2, kbBanner3],
				intervalId: null,
			};
		},
		computed: {
			slideStyle() {
				return {
					transform: `translateX(-${this.currentIndex * 100}%)`,
					transition: "transform 0.5s ease-in-out",
					width: `${this.images.length * 100}%`,
				};
			},
		},
		mounted() {
			this.intervalId = setInterval(() => {
				this.currentIndex = (this.currentIndex + 1) % this.images.length;
			}, 3000); // 3초마다 이미지 변경 (1초는 너무 빠를 수 있음)
		},
		beforeUnmount() {
			clearInterval(this.intervalId);
		},
	};
</script>

<style scoped>
	.slidePosterWrapper {
		width: 100%;
		height: 200px; /* 적절한 높이로 설정 */
		overflow: hidden; /* 이미지가 넘치지 않도록 숨김 */
		position: relative;
	}

	.bannerWrapper {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.slideContainer {
		display: flex;
		height: 100%;
		width: 300%; /* 이미지 개수에 따라 조정 */
	}

	.bannerImg {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.bannerNav {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
	}

	.bannerNav > p {
		border-radius: 50%;
		width: 10px;
		height: 10px;
		background-color: rgba(255, 255, 255, 0.5);
		margin: 0 5px;
		cursor: pointer;
	}

	.bannerNav > p.active {
		background-color: rgba(255, 255, 255, 1);
	}
</style>
