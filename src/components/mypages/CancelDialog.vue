<template>
    <div :class="$style.cancelDialog">
        <div :class="$style.dialogBackground">
            <div :class="$style.dialogContent">
                <div :class="$style.dialogBackgroundOverlay" />
            </div>
        </div>
        <div :class="$style.dialogMessage">티켓을 취소하시겠습니까?</div>
        <div :class="$style.cancelButton" @click="$emit('close')">돌아가기</div>
        <div :class="$style.confirmButton" @click="$emit('confirm')">취소하기</div>
        <div :class="$style.horizontalDivider" />
        <div :class="$style.verticalDivider" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CancelDialog',
    data() {
        return {
        };
    },
});
</script>

<style module>
.cancelDialog {
    position: fixed;
    bottom:66px;
    left: 50%;
	transform: translateX(-50%);
    width: 374px;
    height: 106px;
    text-align: center;
    font-size: 13px;
}

.dialogBackground {
    position: absolute;
    top: 0px;
    left: 1px;
    width: 375px;
    height: 105px;
}

.dialogContent {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    
}

.dialogBackgroundOverlay {
    position: absolute;
    height: 100%;
    width: 372px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 15px 15px 0 0;
    background-color: #f5cdcd;
}

.dialogMessage {
    position: absolute;
    top: 23px;
    left: 0px;
    letter-spacing: -0.01em;
    font-weight: 600;
    display: inline-block;
    width: 376px;
    height: 16px;
    font-size: 16px;
    font-family: "bamin_content";
    display: flex;
    align-items: center;
    justify-content: center;
}

.cancelButton {
    position: absolute;
    top: 75px;
    left: 0px;
    letter-spacing: -0.01em;
    font-weight: bold;
    display: inline-block;
    width: 188px;
    height: 16px;
    cursor: pointer;
    font-family: "bamin_content";
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.confirmButton {
    position: absolute;
    top: 75px;
    left: 188px;
    letter-spacing: -0.01em;  
    font-weight: bold;
    color: #c54966;
    display: inline-block;
    width: 188px;
    height: 16px;
    cursor: pointer;
    font-family: "bamin_content";
    font-size: 16px;
    display: flex;
     align-items: center;
    justify-content: center;
}

.horizontalDivider {
    position: absolute;
    top: 59.5px;
    left: 0.5px;
    border-top: 1px solid rgba(110, 110, 110, 0.44);
    box-sizing: border-box;
    width: 372px;
    height: 1px;
}

.verticalDivider {
    position: absolute;
    top: 59.5px;
    left: 187.5px;
    border-right: 1px solid rgba(110, 110, 110, 0.44);
    box-sizing: border-box;
    width: 1px;
    height: 47px;
}
</style>
