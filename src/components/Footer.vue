<template>
    <div :class="$style.div8">
        <div :class="$style.child" />
        <div :class="$style.groupContainer">
            <div :class="$style.parent">
                <div :class="$style.div9">홈</div>
                <img :class="$style.iconexlineTwoTonehome" alt="" :src="homeIcon" />
            </div>
            <div :class="$style.group">
                <div :class="$style.div10">티켓</div>
                <img :class="$style.iconexlineTwoTonecoupon3" alt="" :src="couponIcon" />
            </div>
            <div :class="$style.container">
                <div :class="$style.div10">마이</div>
                <img :class="$style.iconexlineTwoTonehome" alt="" :src="userIcon" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import homeIcon from '@/assets/Iconex/Line Two Tone/Home.svg';
import couponIcon from '@/assets/Iconex/Line Two Tone/Coupon 3.svg';
import userIcon from '@/assets/Iconex/Line Two Tone/User.svg';

export default defineComponent({
    name: 'Footer',
    data() {
        return {
            homeIcon,
            couponIcon,
            userIcon
        };
    },
});
</script>

<style module>
.div8 {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 375px;
    height: 68px;
    font-size: 13px;
    color: #2b3f6c;
}

.child {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 0%;
    border-radius: 15px 15px 0px 0px;
    background-color: #fff;
}

.div9 {
    position: absolute;
    height: 35%;
    width: 50%;
    top: 65%;
    left: 25%;
    display: inline-block;
}

.iconexlineTwoTonehome {
    position: absolute;
    height: 60%;
    width: 100%;
    top: 0%;
    right: 0%;
    bottom: 40%;
    left: 0%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
}

.parent {
    position: absolute;
    height: 100%;
    width: 8.82%;
    top: 0%;
    right: 91.18%;
    bottom: 0%;
    left: 0%;
    color: #c54966;
}

.div10 {
    position: absolute;
    height: 35%;
    width: 100%;
    top: 65%;
    left: 0%;
    display: inline-block;
}

.iconexlineTwoTonecoupon3 {
    position: absolute;
    height: 60%;
    width: 100%;
    top: 0%;
    right: 0%;
    bottom: 40%;
    left: 0%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    object-fit: cover;
}

.group {
    position: absolute;
    height: 100%;
    width: 9.82%;
    top: 0%;
    right: 45.59%;
    bottom: 0%;
    left: 45.59%;
}

.container {
    position: absolute;
    height: 100%;
    width: 9.82%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 91.18%;
}

.groupContainer {
    position: absolute;
    height: 58.82%;
    width: 72.53%;
    top: 23.53%;
    right: 13.87%;
    bottom: 17.65%;
    left: 13.6%;
}
</style>
