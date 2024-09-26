<template>
    <div :class="$style.rectangleParent">
        <div :class="$style.rectangleGroup">
            <img :class="$style.image200Icon" alt="" :src="ticket.image" />
            <div :class="$style.alladdinTheMusical">{{ ticket.title }}</div>
            <div :class="$style.div1">
                <p :class="$style.p">예매번호</p>
                <p :class="$style.p">예매일</p>
                <p :class="$style.p">장소</p>
                <p :class="$style.p">관람일시</p>
                <p :class="$style.p">좌석</p>
                <p :class="$style.p">취소가능일시</p>
                <p :class="$style.p">상태</p>
            </div>
            <div :class="$style.t200098371820231205Container">
                <p :class="$style.p">{{ ticket.id }}</p>
                <p :class="$style.p">{{ ticket.date }}</p>
                <p :class="$style.p">{{ ticket.venue }}</p>
                <p :class="$style.p">{{ ticket.time }}</p>
                <p :class="$style.p">{{ ticket.seats }}</p>
                <p :class="$style.p">{{ ticket.cancelBy }}</p>
                <p :class="$style.p11">{{ ticket.status }}</p>
            </div>
            <div :class="$style.rectangleDiv" />
            <div :class="$style.groupChild1" />
            <div :class="$style.div2">교환 신청</div>
            <div :class="$style.div3">티켓 취소</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'TicketCard',
    props: {
        ticket: {
            type: Object as PropType<{
                id: string;
                date: string;
                venue: string;
                time: string;
                seats: string;
                cancelBy: string;
                status: string;
                image: string;
                title: string;
            }>,
            required: true
        }
    }
});
</script>

<style module>
.image200Icon {
    position: absolute;
    top: 59px;
    left: 26px;
    width: 73.9px;
    height: 91.1px;
    object-fit: cover;
}

.alladdinTheMusical {
    position: absolute;
    top: 9px;
    left: 26px;
    font-size: 13px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 600;
    display: inline-block;
    width: 300px;
    height: 16.1px;
}

.p {
    margin: 0;
}

.div1 {
    position: absolute;
    top: 42px;
    left: 131px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.44);
    display: inline-block;
    width: 59.7px;
    height: 105.3px;
}

.p11 {
    margin: 0;
    color: #c54966;
}

.t200098371820231205Container {
    position: absolute;
    top: 42.99px;
    left: 210.25px;
    letter-spacing: -0.01em;
    line-height: 150%;
    font-weight: 500;
    display: inline-block;
    width: 132.8px;
    height: 105.3px;
}

.rectangleDiv {
    position: absolute;
    top: 164px;
    left: 26px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #c54966;
    box-sizing: border-box;
    width: 150px;
    height: 31px;
}

.groupChild1 {
    position: absolute;
    top: 164px;
    left: 190px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #6e6e6e;
    box-sizing: border-box;
    width: 150px;
    height: 31px;
}

.div2 {
    position: absolute;
    top: 170px;
    left: 74px;
    font-size: 14px;
    font-family: Roboto;
    color: #c54966;
    text-align: center;
}

.div3 {
    position: absolute;
    top: 170px;
    left: 238px;
    font-size: 14px;
    font-family: Roboto;
    text-align: center;
}

.rectangleGroup {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 375px;
    height: 208px;
}

.rectangleParent {
    width: 375px;
    position: relative;
    height: 208px;
}
</style>
