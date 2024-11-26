<template>
    <div :class="$style.groupParent">
        <TicketCard v-for="(ticket, index) in tickets" :key="index" :ticket="ticket" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TicketCard from './TicketCard.vue';

export default defineComponent({
    name: 'MainContent',
    components: {
        TicketCard
    },
    props: {
        tickets: {
            type: Array as PropType<Array<{
                id: string;
                cancelUntil: string;
                venue: string;
                time: string;
                seats: string;
                cancelBy: string;
                status: string;
            }>>,
            required: true,
        }
    }
});
</script>

<style module>
.groupParent {
    position: absolute;
    left: -1px;
    width: 376px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-family: Inter;
}
</style>
