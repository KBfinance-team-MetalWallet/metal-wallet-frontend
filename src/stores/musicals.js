import {
	default as PosterImg1,
	default as PosterImg10,
	default as PosterImg4,
	default as PosterImg7,
} from "@/assets/poster/PosterImg1.png";
import {
	default as PosterImg2,
	default as PosterImg5,
	default as PosterImg8,
} from "@/assets/poster/PosterImg2.png";
import {
	default as PosterImg3,
	default as PosterImg6,
	default as PosterImg9,
} from "@/assets/poster/PosterImg3.png";
import { defineStore } from "pinia";

export const useMusicalsStore = defineStore("musicals", {
	state: () => ({
		musicals: [
			{
				title: "킹키부츠",
				rank: 1,
				imageUrl: PosterImg1,
			},
			{
				title: "홍련",
				rank: 2,
				imageUrl: PosterImg2,
			},
			{
				title: "뮤지컬 3",
				rank: 3,
				imageUrl: PosterImg3,
			},
			{
				title: "뮤지컬 4",
				rank: 4,
				imageUrl: PosterImg4,
			},
			{
				title: "뮤지컬 5",
				rank: 5,
				imageUrl: PosterImg5,
			},
			{
				title: "뮤지컬 6",
				rank: 6,
				imageUrl: PosterImg6,
			},
			{
				title: "뮤지컬 7",
				rank: 7,
				imageUrl: PosterImg7,
			},
			{
				title: "뮤지컬 8",
				rank: 8,
				imageUrl: PosterImg8,
			},
			{
				title: "뮤지컬 9",
				rank: 9,
				imageUrl: PosterImg9,
			},
			{
				title: "뮤지컬 10",
				rank: 10,
				imageUrl: PosterImg10,
			},
		],
	}),
});
