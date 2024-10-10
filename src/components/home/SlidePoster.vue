<template>
	<div
		class="slidePosterWrapper"
		@mouseenter="pauseSlide"
		@mouseleave="startSlide"
	>
		<div class="bannerWrapper">
			<div class="slideContainer" :style="slideStyle">
				<div
					class="slide"
					v-for="(image, index) in images"
					:key="index"
					:style="{ width: `${100 / images.length}%` }"
				>
					<img :src="image" alt="배너 이미지" class="bannerImg" />
				</div>
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
					transform: `translateX(-${
						this.currentIndex * (100 / this.images.length)
					}%)`,
					transition: "transform 0.5s ease-in-out",
					width: `${this.images.length * 100}%`,
				};
			},
		},
		methods: {
			nextSlide() {
				this.currentIndex = (this.currentIndex + 1) % this.images.length;
			},
			pauseSlide() {
				clearInterval(this.intervalId);
			},
			startSlide() {
				this.intervalId = setInterval(() => {
					this.nextSlide();
				}, 2000);
			},
		},
		mounted() {
			this.startSlide();
		},
		beforeUnmount() {
			clearInterval(this.intervalId);
		},
	};
</script>
<style scoped>
	* {
		box-sizing: border-box;
	}

	.slidePosterWrapper {
		width: 100%;
		height: 200px;
		overflow: hidden;
		position: relative;
		margin-bottom: 150px;
	}

	.bannerWrapper {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.slideContainer {
		display: flex;
		flex-wrap: nowrap;
		height: 100%;
		transition: transform 3s ease-in-out;
	}

	.slide {
		flex: 0% 10% 0%;
		height: 100%;
	}

	.bannerImg {
		width: 375px;
		height: 100%;
		display: block;
		object-fit: cover;
	}

	@media (max-width: 812px) {
		.slidePosterWrapper {
			height: 130px;
		}
	}
</style>
