import { ref, computed } from "vue";
import {defineStore} from "pinia";
import axios from 'axios';
import {LocalKey, LocalStorage} from 'ts-localstorage'
export const userStore = defineStore("userStore",() => {
    interface UserData{
        login: string,
        password: string,
    }

    const login = ref("");
    const password = ref("");
    const email = ref("");



    const csrf = ref("");
    const loginState = ref(false);

    const isLogin = computed(()=>{loginState.value});
    const getCsrf = computed(()=>{csrf.value});
    const config = {
        headers: {
            "X-CSRF-TOKEN": csrf,
        },
    };
    function setLogin(state:boolean){
        loginState.value = state;
    }


    function signIn(data:UserData){
        axios.post("http://localhost:5000/api/login", data).then((response) => {

            const key = new LocalKey("refreshToken", "");
            LocalStorage.setItem(key, response.data.accessToken)
            console.log("csrf -> "+ response.data.accessToken);
        });
    }
    function signOut(){
        axios.post("http://localhost:5000/api/logout").then((response) => {
            csrf.value = response.data;
            console.log("csrf -> "+csrf.value);
        });
    }

    return{ signIn, signOut }

});