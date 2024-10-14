<template>
    <div :class="$style.div">
        <MainHeader />
        <div :class="$style.groupParent">
            <div :class="$style.horizontalborderWrapper">
                <div :class="$style.horizontalborder1">
                    <b :class="$style.label">이메일</b>
                    <input v-model="emailPrefix" type="email" :class="$style.input" placeholder="이메일을 입력해주세요." />
                    <select v-model="selectedEmailDomain" :class="$style.select" @change="updateEmail">
                        <option value="">직접입력</option>
                        <option v-for="emailDomain in predefinedEmails" :key="emailDomain" :value="emailDomain">
                            {{ emailDomain }}
                        </option>
                    </select>
                </div>
            </div>
            <div :class="$style.horizontalborderWrapper">
                <div :class="$style.horizontalborder1">
                    <b :class="$style.label">비밀번호</b>
                    <input v-model="formData.password" type="password" :class="$style.input1"
                        placeholder="비밀번호를 입력해주세요." />
                </div>
                <div :class="$style.signupButton" @click="goToSignup">
                    <b>회원가입&nbsp;&gt;</b>
                </div>
            </div>
        </div>
        <div :class="$style.button1" :style="{ backgroundColor: isFormValid ? '#C54966' : '#CCCCCC' }"
            :disabled="!isFormValid" @click="login">
            <b :class="$style.b1">로그인</b>
        </div>
    </div>
</template>
<script lang="js">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import MainHeader from '../../components/MainHeader.vue';
import axios from 'axios';

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
                password: ''
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
            if (this.selectedEmailDomain) {
                this.formData.email = `${this.emailPrefix}${this.selectedEmailDomain}`;
            } else {
                this.formData.email = this.emailPrefix;
            }
        },
        async login() {
            if (!this.isFormValid) {
                alert('이메일과 비밀번호를 입력해주세요.');
                return;
            }
            try {
                // const response = await axios.post(`${API_BASE_URL}/members/login`, this.formData);
                const response = await axios.post(`https://jsonplaceholder.typicode.com/todos/1`, this.formData);
                console.log('Login successful:', response.data);

                if (response.data.accessToken) {
                    localStorage.setItem('accessToken', response.data.accessToken);
                    this.router.push({ name: 'home' });
                } else {
                    console.error('Access token not found in response');
                }
            } catch (error) {
                //TODO: vue error는 response가 없어서 수정해야함
                console.error('Error login member:', error.response.data);
            }
        },
        goToSignup() {
            this.router.push('/signup');
        }
    },
    computed: {
        isFormValid() {
            return (
                this.formData.email &&
                this.formData.password
            );
        }
    },
    setup() {
        const router = useRouter();

        return {
            router,
        };
    }
})
</script>
<style module>
.signupButton {
    position: relative;
    top: 20%;
    text-align: right;
    color: #3498db;
    cursor: pointer;
}

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
    font-family: "bamin_title";
    color: #C54966;

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
    opacity: 1;
    font-family: "bamin_content";
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
    opacity: 1;
    font-family: "bamin_content";
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.button1 {
    position: fixed;
    width: 350px;
    height: 68px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 10px;
    background-color: #ccc;
    height: 50px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    margin-top: 160px;
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
    height: 100vh;
    position: relative;
    background-color: #fafafa;
    overflow: hidden;
    text-align: left;
    font-size: 16px;
    color: #000;
    font-family: "bamin_title";
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
    font-family: "bamin_content";
}
</style>