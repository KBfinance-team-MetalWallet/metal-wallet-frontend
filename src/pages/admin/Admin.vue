<template>
  <div :class="$style.div">
    <MainHeader />

    <div :class="$style.horizontalborder">
      <b :class="$style.label">Key : </b>
      <div :class="$style.input">
        <input v-model="musicalId" :class="$style.id" type="text" placeholder="입장할 뮤지컬 ID를 입력하세요." />
      </div>
    </div>
    <div :class="$style.button" @click="goToCameraPage">
      <b :class="$style.b1">카메라</b>
    </div>
    <AdminFooter />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import MainHeader from '../../components/MainHeader.vue';
import AdminFooter from '../../components/admin/AdminFooter.vue';


export default defineComponent({
  name: "Admin",
  components: {
    MainHeader,
    AdminFooter,
  },
  setup() {
    const router = useRouter();
    const musicalId = ref('');

    const goToCameraPage = () => {
      router.push('/admin/checkticket');  // /admin/camera 경로로 라우팅
    };

    return {
      goToCameraPage,
      musicalId,
    };
  },
});
</script>
<style module>
body {
  margin: 0;
  line-height: normal;
}

.label {
  position: absolute;
  top: 10px;
  left: 5px;
  line-height: 30px;
}

.id {
  position: absolute;
  top: 0px;
  left: 0px;
  line-height: 30px;
  display: flex;
  align-items: center;
  width: 286px;
  font-size: 14.18px;
  color: #000;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

.input {
  position: absolute;
  width: calc(100% - 64px);
  top: 3px;
  right: 12px;
  left: 52px;
  height: 43px;
  overflow: hidden;
}

.horizontalborder {
  position: absolute;
  top: 303px;
  left: 13px;
  border-bottom: 1px solid #000;
  box-sizing: border-box;
  width: 350px;
  height: 51px;
  font-size: 14.18px;
  color: #000;
}

.b {
  position: absolute;
  top: 14px;
  left: 43px;
}

.b1 {
  position: absolute;
  top: 15.5px;
  left: calc(50% - 21px);
}

.button {
  position: absolute;
  width: calc(100% - 25px);
  top: 381px;
  right: 12px;
  left: 13px;
  border-radius: 10px;
  background-color: #c54966;
  height: 50px;
  text-align: center;
  font-size: 15px;
  color: #fff;
}

.div {
  width: 100%;
  position: relative;
  background-color: #fafafa;
  height: 812px;
  overflow: hidden;
  text-align: left;
  font-size: 16px;
  color: #6e6e6e;
}

.horizontalborder {
  position: absolute;
  top: 303px;
  left: 13px;
  border-bottom: 1px solid #000;
  box-sizing: border-box;
  width: 350px;
  height: 51px;
  font-size: 14.18px;
  color: #000;
}

.id {
  width: 286px;
  position: relative;
  font-size: 14.18px;
  line-height: 30px;
  display: flex;
  color: #000;
  text-align: left;
  align-items: center;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}
</style>