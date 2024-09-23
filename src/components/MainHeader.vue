<template>
    <Icon icon="solar:wallet-outline" :class="$style.solarwalletOutlineIcon" />
    <b :class="$style.b">강철지갑</b>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';

export default defineComponent({
  name: 'BackHeader',
  components: {
      Icon
  },
  data() {
      return {
      };
  },
});
</script>

<style module>
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
    color: #6e6e6e;
  }
</style>
