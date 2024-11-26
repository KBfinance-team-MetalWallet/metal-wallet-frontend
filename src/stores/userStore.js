import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        name: '',
        password: '',
        email: '',
        phone: '',
        pinNumber: '',
    }),
    actions: {
        setUserData(name, password, email, phone) {
            this.name = name;
            this.password = password;
            this.email = email;
            this.phone = phone;
        },
        setPinNumber(pin) {
            this.pinNumber = pin;
        }
    },
});
