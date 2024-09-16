<template>
    <div :class="$style.div">
        <img :class="$style.solarwalletOutlineIcon" alt="" src="@/assets/strealwalletIcon.svg" />
        <b :class="$style.b">강철지갑</b>
        <div :class="$style.button">
            <b :class="$style.b1">다음단계</b>
        </div>
        <div :class="$style.label">
            <div :class="$style.div1">약관 전체 동의</div>
            <img :class="$style.containerIcon" alt="" src="@/assets/login/container.svg" />
        </div>
        <div :class="$style.stateLayer">
            <div :class="$style.container" />
            <img :class="$style.checkSmallIcon" alt="" src="@/assets/login/check_small.svg" />
        </div>
        <div :class="$style.stateLayer1">
            <div :class="$style.container" />
            <img :class="$style.checkSmallIcon" alt="" src="@/assets/login/check_small.svg" />
        </div>
        <div :class="$style.stateLayer2">
            <div :class="$style.container" />
            <img :class="$style.checkSmallIcon" alt="" src="@/assets/login/check_small.svg" />
        </div>
        <div :class="$style.div2">필수 동의 항목</div>
        <div :class="$style.link">
            <div :class="$style.div3">[필수] 이용약관</div>
            <img :class="$style.imageIcon" alt="" src="@/assets/login/check_small.svg" />
        </div>
        <div :class="$style.link1">
            <div :class="$style.div3">[필수] 전자금융거래 이용약관</div>
            <img :class="$style.imageIcon1" alt="" src="@/assets/login/check_small.svg" />
        </div>
        <div :class="$style.link2">
            <div :class="$style.div3">[필수] 개인정보 수집동의서</div>
            <img :class="$style.imageIcon2" alt="" src="@/assets/login/check_small.svg" />
        </div>
        <div :class="$style.div6">선택 동의 항목</div>
        <div :class="$style.checkboxesParent">
            <div :class="$style.checkboxes">
                <div :class="$style.stateLayer3">
                    <div :class="$style.container" />
                    <img :class="$style.checkSmallIcon" alt="" src="@/assets/login/check_small.svg" />
                </div>
            </div>
            <div :class="$style.container4">
                <div :class="$style.link3">
                    <div :class="$style.div3">[선택] 개인정보 수집동의서</div>
                    <img :class="$style.imageIcon2" alt="" src="@/assets/login/check_small.svg" />
                </div>
            </div>
        </div>
        <div :class="$style.checkboxesGroup">
            <div :class="$style.checkboxes">
                <div :class="$style.stateLayer3">
                    <div :class="$style.container" />
                    <img :class="$style.checkSmallIcon" alt="" src="@/assets/login/check_small.svg" />
                </div>
            </div>
            <div :class="$style.container6">
                <div :class="$style.link4">
                    <div :class="$style.div3">[선택] 위치기반서비스 이용약관</div>
                    <img :class="$style.imageIcon4" alt="" src="@/assets/login/check_small.svg" />
                </div>
            </div>
        </div>
        <div :class="$style.parent">
            <b :class="$style.b2">서비스 이용약관 전체동의</b>
            <img :class="$style.groupChild" alt="" src="@/assets/login/agreementBox.svg" />
            <img :class="$style.checkIcon" alt="" src="@/assets/login/check.svg" />
        </div>
        <b :class="$style.b3">
            <span>약관 동의</span>
            <span :class="$style.span">가 필요해요.</span>
        </b>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
    name: "Frame"
})</script>
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
    font-size: 16px;
    color: #6e6e6e;
}

.b1 {
    position: absolute;
    top: 14px;
    left: calc(50% - 27.5px);
}

.button {
    position: absolute;
    width: calc(100% - 56px);
    top: 689px;
    right: 28px;
    left: 28px;
    border-radius: 10px;
    background-color: #ccc;
    height: 50px;
    text-align: center;
    color: #fff;
}

.div1 {
    position: absolute;
    top: 1px;
    left: 33px;
    line-height: 25px;
}

.containerIcon {
    position: absolute;
    top: 4px;
    left: 6px;
    border-radius: 2px;
    width: 18px;
    height: 18px;
}

.label {
    position: absolute;
    height: 3.08%;
    top: 29.56%;
    bottom: 67.36%;
    left: 32px;
    width: 135px;
    font-size: 17px;
    color: #000;
}

.container {
    width: 18px;
    position: relative;
    border-radius: 2px;
    background-color: #65558f;
    height: 18px;
    z-index: 0;
}

.checkSmallIcon {
    width: 24px;
    position: absolute;
    margin: 0 !important;
    top: calc(50% - 12px);
    left: calc(50% - 12px);
    height: 24px;
    z-index: 1;
}

.stateLayer {
    position: absolute;
    top: 311px;
    left: 26px;
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 11px;
}

.stateLayer1 {
    position: absolute;
    top: 348px;
    left: 26px;
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 11px;
}

.stateLayer2 {
    position: absolute;
    top: 385px;
    left: 26px;
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 11px;
}

.div2 {
    position: absolute;
    top: 288px;
    left: 37px;
    line-height: 22px;
    color: #000;
}

.div3 {
    position: absolute;
    top: 0px;
    left: 0px;
    line-height: 20px;
}

.imageIcon {
    position: absolute;
    height: 75%;
    top: 12.5%;
    right: 0.02px;
    bottom: 12.5%;
    max-height: 100%;
    width: 15px;
    object-fit: cover;
}

.link {
    position: absolute;
    top: 321px;
    left: 70px;
    width: 111.8px;
    height: 20px;
}

.imageIcon1 {
    position: absolute;
    height: 75%;
    top: 12.5%;
    right: -0.03px;
    bottom: 12.5%;
    max-height: 100%;
    width: 15px;
    object-fit: cover;
}

.link1 {
    position: absolute;
    top: 358px;
    left: 70px;
    width: 193.3px;
    height: 20px;
}

.imageIcon2 {
    position: absolute;
    height: 75%;
    top: 12.5%;
    right: 0.04px;
    bottom: 12.5%;
    max-height: 100%;
    width: 15px;
    object-fit: cover;
}

.link2 {
    position: absolute;
    top: 395px;
    left: 70px;
    width: 180.4px;
    height: 20px;
}

.div6 {
    position: absolute;
    top: 449px;
    left: 37px;
    line-height: 22px;
    color: #000;
}

.stateLayer3 {
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 11px;
    position: relative;
}

.checkboxes {
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4px;
}

.link3 {
    position: absolute;
    top: 1px;
    left: 0px;
    width: 180.4px;
    height: 20px;
}

.container4 {
    position: absolute;
    width: calc(100% - 48px);
    top: 13px;
    right: 0px;
    left: 48px;
    height: 20px;
    overflow: hidden;
}

.checkboxesParent {
    position: absolute;
    top: 468px;
    left: 22px;
    width: 324px;
    height: 48px;
}

.imageIcon4 {
    position: absolute;
    height: 75%;
    top: 12.5%;
    right: 0px;
    bottom: 12.5%;
    max-height: 100%;
    width: 15px;
    object-fit: cover;
}

.link4 {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 206.3px;
    height: 20px;
}

.container6 {
    position: absolute;
    width: calc(100% - 48px);
    top: 14px;
    right: 0px;
    left: 48px;
    height: 20px;
    overflow: hidden;
}

.checkboxesGroup {
    position: absolute;
    top: 505px;
    left: 22px;
    width: 324px;
    height: 48px;
}

.b2 {
    position: absolute;
    top: 18px;
    left: 96px;
}

.groupChild {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 10px;
    width: 316px;
    height: 50px;
}

.checkIcon {
    position: absolute;
    top: 10px;
    left: 73px;
    width: 23px;
    height: 30px;
}

.parent {
    position: absolute;
    top: 158px;
    left: 30px;
    width: 316px;
    height: 50px;
    font-size: 14px;
    color: #c4c4c4;
}

.span {
    color: #6e6e6e;
}

.b3 {
    position: absolute;
    top: 107px;
    right: 119px;
    font-size: 24px;
    color: #c54966;
}

.div {
    width: 100%;
    position: relative;
    background-color: #fafafa;
    height: 812px;
    overflow: hidden;
    text-align: left;
    font-size: 15px;
    color: #666;
    font-family: Roboto;
}
</style>