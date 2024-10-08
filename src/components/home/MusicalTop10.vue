<template>
	<div :class="$style.musicalranking">
		<b :class="$style.title">뮤지컬 TOP 10</b>
		<div :class="$style.poster1Parent">
			<div
				v-for="(musical, index) in musicals"
				:key="index"
				:class="$style.poster1"
			>
				<router-link :to="`/musical/${musical.id}`" :class="$style.div10">
					<img
						:class="$style.posterimageIcon"
						:src="musical.imageUrl"
						:alt="musical.title"
					/>
					<div :class="$style.details">
						<div :class="$style.rank">{{ musical.rank }}</div>
						<b :class="$style.musicaltitle">{{ musical.title }}</b>
					</div>
				</router-link>
			</div>
		</div>
		<router-link to="/musical" :class="$style.div11">더보기 &gt;</router-link>
	</div>
</template>

<script>
	import { useMusicalsStore } from "@/stores/musicals.js";
	import { computed, defineComponent, onMounted } from "vue";

	export default defineComponent({
		name: "MusicalTop10",
		setup() {
			const musicalStore = useMusicalsStore();
			const musicals = computed(() => musicalStore.musicals);

			onMounted(async () => {
				await musicalStore.fetchMusicals();
			});

			return {
				musicals,
			};
		},
	});
</script>

<style module>
	@import url("https://fonts.googleapis.com/css2?family=Readex+Pro:wght@500;700&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Abel:wght@400&display=swap");

	.musicalranking {
		position: relative;
		margin-top: 20px;
		padding: 0 14px;
	}

	.div10 {
		width: 100%;
		display: flex;
		justify-content: end;
		color: #c54966;
		text-decoration: none;
	}
	.div11 {
		position: relative;
		bottom: 50px;
		right: 10px;
		width: 100%;
		display: flex;
		justify-content: end;
		color: #c54966;
		text-decoration: none;
		font-size: 12px !important;
		font-weight: bold;
	}
	.poster1Parent {
		display: flex;
		overflow-x: auto;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
		margin-top: 10px;
		padding-bottom: 10px;
	}

	.poster1 {
		flex: 0 0 auto;
		margin-right: 10px;
		width: 182.5px;
		position: relative;
		height: 299.9px;
	}

	.posterimageIcon {
		width: 100%;
		height: auto;
		object-fit: cover;
		border-radius: 12px;
	}

	.details {
		display: flex;
		justify-content: space-between;
		position: absolute;
		bottom: 0px;
		width: 100%;
		padding: 10px;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		border-radius: 0px 0px 12px 12px;
	}

	.musicaltitle {
		margin-top: 10px;
		font-size: 14px;
	}

	.rank {
		font-size: 40px;
	}

	.title {
		font-size: 16px;
		color: #c54966;
	}

	/* 스크롤바 숨기기 */
	.poster1Parent::-webkit-scrollbar {
		display: none;
	}
</style>
