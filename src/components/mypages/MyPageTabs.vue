<template>
  <div :class="$style.groupParent">
    <div :class="$style.parent">
      <b :class="$style.b1">전자지갑</b>
      <b :class="$style.b2">티켓 보관함</b>
    </div>
    <img :class="$style.groupChild" :src="line7Image" alt="Line 7" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import line7Image from '@/assets/mypages/Line 7.svg';

  export default defineComponent({
    name: 'MyPageTabs',
    components: {
    },
    data() {
      return {
        line7Image,
      };
    },
  });
</script>

<style module>
.parent {
    position: absolute;
    top: 0px;
    left: 11px;
    width: 237px;
    height: 19px;
  }
  .groupChild {
    position: absolute;
    top: 25.5px;
    left: 0px;
    max-height: 100%;
    width: 80px;
  }
  .groupParent {
    position: absolute;
    top: 78px;
    left: 59px;
    width: 242px;
    height: 25.5px;
  }
  
  .b2 {
    position: absolute;
    top: 0px;
    left: 153px;
    color: #6e6e6e;
  }
</style>
