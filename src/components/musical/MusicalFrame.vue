<template>
  <div :class="$style.groupParent">
    <div :class="$style.wrapper">
      <div :class="$style.div">
        <div :class="$style.div">
          <img :class="$style.icon" alt="포스터" :src="posterImage" />
          <div :class="$style.div1">
            <p :class="$style.p">
              <span>
                <span :class="$style.span">뮤지컬 &lt;{{ title }}&gt; - </span>
              </span>
            </p>
            <p :class="$style.p">
              <span>
                <span :class="$style.span">{{ place }}</span>
              </span>
            </p>
            <p :class="$style.p2">
              <span>
                <span>{{ placeDetail }}</span>
              </span>
            </p>
            <p :class="$style.p3">
              <span>
                <span>{{ dates }}</span>
              </span>
            </p>
          </div>
        </div>
        <div :class="$style.rectangleParent">
          <div :class="$style.componentChild"></div>
          <b :class="$style.b">바로 예매</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import posterImage from "@/assets/image.png";

export default defineComponent({
  name: "Frame",
  props: {
    posterImage: {
      type: String,
      default: posterImage,
    },
    title: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    placeDetail: {
      type: String,
      required: true,
    },
    dates: {
      type: String,
      required: true,
    },
  },
});
</script>

<style module>
.icon {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 116.8px;
  height: 184px;
  object-fit: cover;
}

.span {
  font-weight: 600;
}
.p {
  margin-block-start: 0;
  margin-block-end: 7px;
}
.p2 {
  margin-block-start: 0;
  margin-block-end: 7px;
  font-size: 12px;
}
.p3 {
  margin: 0;
  color: #9c9c9c;
  font-size: 12px;
}
.div1 {
  position: absolute;
  top: 0px;
  left: 154px;
}
.componentChild {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  border-radius: 13px;
  background-color: #c54966;
}
.b {
  position: absolute;
  top: 13.43%;
  left: 23.88%;
}
.rectangleParent {
  position: absolute;
  top: 120px;
  left: 206px;
  width: 91px;
  height: 28px;
  text-align: center;
  font-size: 13px;
  color: #fff;
  font-family: Roboto;
}
.div {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 310px;
  height: 184px;
}
.wrapper {
  width: 310px;
  position: relative;
  height: 184px;
}
.groupParent {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-size: 14px;
  color: #000;
  font-family: Inter;
}
</style>
