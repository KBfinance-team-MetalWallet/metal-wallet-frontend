<template>
    <div :class="$style.div">
        <MainHeader />
        <div :class="$style.groupParent">
            <div :class="$style.horizontalborderWrapper">
                <div :class="$style.horizontalborder1">
                    <b :class="$style.label">이메일</b>
                    <input v-model="emailPrefix" type="email" :class="$style.input" placeholder="이메일을 입력해주세요."/>
                    <select v-model="selectedEmailDomain" :class="$style.select" @change="updateEmail">
                        <option value="">직접입력</option>
                        <option v-for="emailDomain in predefinedEmails" :key="emailDomain" :value="emailDomain">
                            {{ emailDomain }}
                        </option>
                    </select>
                </div>
            </div>
            <div :class="$style.horizontalborder1">
                <b :class="$style.label">이름</b>
                <input v-model="formData.name" type="text" :class="$style.input1" placeholder="이름을 입력해주세요."/>
            </div>
            <div :class="$style.horizontalborderWrapper">
                <div :class="$style.horizontalborder1">
                    <b :class="$style.label">비밀번호</b>
                    <input v-model="formData.password" type="password" :class="$style.input1" placeholder="비밀번호를 입력해주세요."/>
                </div>
            </div>
            <div :class="$style.horizontalborderWrapper">
                <div :class="$style.horizontalborder1">
                    <b :class="$style.label">비밀번호 확인</b>
                    <input v-model="formData.confirmPassword" type="password" :class="$style.input1" placeholder="비밀번호를 다시 입력해주세요."/>
                </div>
            </div>
            <div :class="$style.horizontalborder2">
                <b :class="$style.label">휴대폰</b>
                <input v-model="formData.phone" type="tel" :class="$style.input" placeholder="010 1234 5678"/>
                <div :class="$style.button">
                    <div :class="$style.div3">인증번호받기</div>
                </div>
            </div>
            <div :class="$style.horizontalborder1">
                <b :class="$style.label">인증 번호</b>
                <input v-model="formData.verificationCode" :class="$style.input1" placeholder="인증 번호를 입력해주세요."/>
            </div>
        </div>
        <div :class="$style.smsParent">
            <div :class="$style.sms">SMS, 이메일로 상품 및 이벤트 정보를 받겠습니다. (선택)</div>
            <div :class="$style.stateLayer">
                <div :class="$style.container2" />
                <img :class="$style.checkSmallIcon" alt="" src="@/assets/login/check_small.svg" />
            </div>
        </div>
        <div :class="$style.div5">
            <p :class="$style.p">만 14세 미만 회원은 법정대리인(부모님) 동의를 받은 경우</p>
            <p :class="$style.p">만 회원가입이 가능합니다.</p>
        </div>
        <div :class="$style.button1" :style="{ backgroundColor: isFormValid ? '#C54966' : '#CCCCCC'}" :disabled="!isFormValid" @click="handleRegister">
            <b :class="$style.b1">가입완료</b>
        </div>
        <div :class="$style.parent">
            <div :class="$style.div6">
                <div :class="$style.div7">14세 미만입니다.</div>
            </div>
            <div :class="$style.stateLayer">
                <div :class="$style.container2" />
                <img :class="$style.checkSmallIcon" alt="" src="@/assets/login/check_small.svg" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios';
import MainHeader from '../../components/MainHeader.vue';
import {useUserStore} from '../../stores/userStore';


export default defineComponent({
    name: "SignupForm",
    components: {
        MainHeader,
    },
    data() {
        return {
            emailPrefix: '',
            selectedEmailDomain: '',
            formData: {
                email: '',
                password: '',
                confirmPassword: '',
                name: '',
                phone: '',
                verificationCode: ''
            },
            predefinedEmails: [
                '@gmail.com',
                '@naver.com',
                '@daum.net'
            ]
        }
    },
    watch: {
        emailPrefix() {
            this.updateEmail();
        },
        selectedEmailDomain() {
            this.updateEmail();
        }
    },
    methods: {
        updateEmail() {
            if(this.selectedEmailDomain) {
                this.formData.email = `${this.emailPrefix}${this.selectedEmailDomain}`;
            } else {
                this.formData.email = this.emailPrefix;
            }
        },
        async handleRegister() {
            if(this.formData.password !== this.formData.confirmPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            if(!this.isFormValid) {
                alert('양식을 완전히 작성해야 가입할 수 있습니다.');
                return;
            }

            // Pinia에 데이터 저장
            const userStore = useUserStore();
            userStore.setUserData(this.formData.name, this.formData.password, this.formData.email, this.formData.phone);

            // PasswordInput.vue로 리디렉션
            this.$router.push('/login/password');
        }
    },
    computed: {
        isFormValid() {
            return (
                this.formData.email &&
                this.formData.name &&
                this.formData.password &&
                this.formData.confirmPassword &&
                this.formData.password === this.formData.confirmPassword &&
                this.formData.phone &&
                this.formData.verificationCode
            );
        }
    }
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
    color: #6e6e6e;
}

.label {
    position: absolute;
    top: 10px;
    left: 5px;
    line-height: 30px;
}

.div1 {
    position: absolute;
    top: 10px;
    left: 239px;
    line-height: 30px;
    color: #666;
}

.icon {
    position: absolute;
    height: 9.8%;
    width: 2.86%;
    top: 45.1%;
    right: 1.71%;
    bottom: 45.1%;
    left: 95.43%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
}

.horizontalborder {
    position: absolute;
    top: 0px;
    left: 0px;
    border-bottom: 1px solid #000;
    box-sizing: border-box;
    width: 350px;
    height: 51px;
}

.horizontalborderWrapper {
    width: 350px;
    position: relative;
    height: 51px;
}

.horizontalborder1 {
    align-self: stretch;
    position: relative;
    border-bottom: 1px solid #000;
    box-sizing: border-box;
    height: 51px;
    font-size: 14.18px;
}

.div2 {
    position: absolute;
    top: 0px;
    left: 0px;
}

.container {
    position: absolute;
    width: calc(100% - 35px);
    top: 6px;
    right: 25px;
    left: 10px;
    height: 18px;
    overflow: hidden;
}

.input {
    position: absolute;
    width: calc(100% - 240px);
    top: 10px;
    right: 127px;
    left: 113px;
    height: 30px;
    overflow: hidden;
    font-size: 14px;
    color: #000;
    background-color: transparent;
    border: none;
    outline: none;
}
.input::placeholder {
    font-size: 12px;
    color: #999;
    opacity: 1; /* 투명도 */
}

.div3 {
    position: absolute;
    top: 7px;
    left: 14px;
}

.button {
    position: absolute;
    top: 10px;
    left: 245px;
    border-radius: 6px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-sizing: border-box;
    width: 100px;
    height: 30px;
    text-align: center;
    font-size: 13px;
}

.horizontalborder2 {
    align-self: stretch;
    position: relative;
    border-bottom: 1px solid #000;
    box-sizing: border-box;
    height: 51px;
}

.container1 {
    position: absolute;
    top: 6px;
    right: 0px;
    width: 166.1px;
    height: 18px;
    overflow: hidden;
}

.input1 {
    position: absolute;
    width: calc(100% - 123px);
    top: 10px;
    right: 10px;
    left: 113px;
    height: 30px;
    overflow: hidden;
    font-size: 14px;
    color: #000;
    background-color: transparent;
    border: none;
    outline: none;
}

.input1::placeholder {
    font-size: 12px;
    color: #999;
    opacity: 1; /* 투명도 */
}

.groupParent {
    position: absolute;
    top: 76px;
    left: 12px;
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    font-size: 14.06px;
}

.sms {
    position: absolute;
    top: 10px;
    left: 39px;
    line-height: 20px;
}

.container2 {
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
    top: 0px;
    left: 0px;
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 11px;
}

.smsParent {
    position: absolute;
    top: 530px;
    left: 6px;
    width: 329px;
    height: 40px;
    font-size: 12.39px;
}

.p {
    margin: 0;
}

.div5 {
    position: absolute;
    top: 622px;
    left: 12px;
    font-size: 14.18px;
    line-height: 22px;
}

.b1 {
    position: absolute;
    top: 15.5px;
    left: calc(50% - 28px);
}

.button1 {
    position: absolute;
    width: calc(100% - 25px);
    top: 689px;
    right: 13px;
    left: 12px;
    border-radius: 10px;
    background-color: #ccc;
    height: 50px;
    text-align: center;
    font-size: 15px;
    color: #fff;
}

.div7 {
    position: absolute;
    top: 3px;
    left: 33px;
    line-height: 20px;
}

.div6 {
    position: absolute;
    height: 60%;
    top: 20%;
    bottom: 20%;
    left: 6px;
    width: 120.8px;
}

.parent {
    position: absolute;
    height: 4.93%;
    top: 69.95%;
    bottom: 25.12%;
    left: 6px;
    width: 126.8px;
    font-size: 12.29px;
}

.div {
    width: 100%;
    position: relative;
    background-color: #fafafa;
    height: 812px;
    overflow: hidden;
    text-align: left;
    font-size: 16px;
    color: #000;
    font-family: Roboto;
}

.select {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 30px;
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    outline: none;
    font-size: 15px;
}
</style>