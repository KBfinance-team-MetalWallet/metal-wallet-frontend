<template>
    <div :class="$style.weuibackFilledParent">
        <img :class="$style.weuibackFilledIcon" alt="" :src="backIcon" />
        <b :class="$style.b">뒤로가기</b>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import backIcon from '@/assets/mypages/backIcon.svg';

export default defineComponent({
    name: 'Header',
    data() {
        return {
            backIcon,
        };
    },
});
</script>

<style module>
.weuibackFilledIcon {
    position: absolute;
    top: 2px;
    left: 0px;
    width: 11px;
    height: 22px;
    overflow: hidden;
}

.b {
    position: absolute;
    top: 2px;
    left: 18px;
}

.weuibackFilledParent {
    position: absolute;
    top: 12px;
    left: 14px;
    width: 82px;
    height: 22px;
    font-size: 16px;
    color: #6e6e6e;
}
</style>
