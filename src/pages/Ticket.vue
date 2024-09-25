<template>
	<div :class="$style.div">
		<MainHeader />

		<!-- 포스터 영역 -->
		<div :class="$style.ticketposter">
			<div :class="$style.ticketposterChild" />
			<div :class="$style.ticketposterlayer">
				<!-- SlideCard 컴포넌트에서 updateCurrentCard 이벤트를 수신하여 currentCard 값을 업데이트 -->
				<SlideCard
					:cards="cards"
					:currentCard="currentCard"
					@update:currentCard="updateCurrentCard"
				/>
			</div>
		</div>

		<!-- 현재 뮤지컬 티켓의 상세 정보 표시 -->
		<div :class="$style.r16Container">
			<div :class="$style.MyTicketsInfo">
				<p :class="$style.musicalTitle">
					{{ cards[currentCard].musicalTitle }}
				</p>
				<p :class="$style.showDate">{{ cards[currentCard].date }}</p>
				<p :class="$style.seatInfo">{{ cards[currentCard].seat }}</p>
				<p>Current Card Index: {{ currentCard }}</p>
			</div>
		</div>

		<Footer />
	</div>
</template>

<script lang="js">
	import Footer from "@/components/Footer.vue";
	import MainHeader from "@/components/MainHeader.vue";
	import SlideCard from "@/components/SlideCard.vue";
	import { useTicketStore } from "@/stores/tickets";
	import { defineComponent, onMounted, toRefs } from "vue";

	export default defineComponent({
	  name: "TicketEntry",
	  components: {
	    MainHeader,
	    Footer,
	    SlideCard,
	  },
	  setup() {
	    const ticketStore = useTicketStore();
	    const { cards, currentCard, fetchCards } = toRefs(ticketStore); // Pinia 스토어에서 cards와 currentCard를 반응형으로 가져옴

	    // 컴포넌트가 마운트되면 카드 데이터를 가져옵니다.
	    onMounted(() => {
	      ticketStore.fetchCards(); // 카드 데이터를 API에서 가져옴
	    });

	    // 슬라이드 카드를 업데이트할 때 호출
	    const updateCurrentCard = (newIndex) => {
	      ticketStore.currentCard = newIndex; // Pinia 스토어의 currentCard 값을 업데이트
	    };

	    return {
	      cards,
	      currentCard,
	      updateCurrentCard,
	    };
	  },
	});
</script>

<style module>
	@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");

	.solarwalletOutlineIcon {
		position: absolute;
		top: 11px;
		left: 14px;
		width: 24px;
		height: 24px;
		overflow: hidden;
	}
	.b {
		position: absolute;
		top: 14px;
		left: 43px;
	}
	.ticketposterChild {
		position: absolute;
		top: 326px;
		left: 271px;
		width: 100%;
		height: 9px;
		overflow: hidden;
	}
	.ticketposterlayer {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ticketposter {
		position: absolute;
		top: 106px;
		left: 0px;
		width: 100%;
		overflow: hidden;
	}
	.poster2Icon,
	.usedImg {
		position: absolute;
		left: 50%;
		transform: translate(-50%, -5%);
	}
	.usedImg {
		margin-top: 70px;
	}
	.front {
		z-index: 3;
	}
	.front1 {
		opacity: 0.549;
	}
	.r16Container {
		position: absolute;
		top: 470px;
		width: 100%;
		height: 200px;
		font-size: 20px;
		color: #000;
		text-align: center;
		padding: 20px 30px;
	}
	.div {
		display: flex;
		justify-content: center;
		width: 100%;
		position: relative;
		background-color: #fafafa;
		height: 812px;
		overflow: hidden;
		text-align: left;
		font-size: 16px;
		color: #e0e0e0;
	}
	.MyTicketsInfo {
		border: 2px dotted rgb(255, 81, 0);
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		gap: 5px;
		padding: 20px;
		border-radius: 10px;
	}
	.musicalTitle {
		font-size: 18px;
		font-weight: 700;
		color: #000;
	}
	.showDate {
		font-size: 16px;
		color: #000;
		font-weight: 500;
	}
	.seatInfo {
		font-size: 16px;
		color: #000;
		font-weight: 500;
	}
</style>
