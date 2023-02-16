import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";
import axios from 'axios';
import {LocalKey, LocalStorage} from 'ts-localstorage'
import type {VueCookies} from "vue-cookies";

export const userStore = defineStore("userStore",() => {
    interface UserData{
        login: string,
        password: string,
    }

    axios.defaults.withCredentials = true;

    const login = ref("");
    const password = ref("");
    const email = ref("");
    const accessToken = ref("");


    const csrf = ref("");
    const loginState = ref(false);

    const isLogin = computed(()=>{loginState.value});
    const getCsrf = computed(()=>{csrf.value});
    const config = {
        headers: {
            "X-CSRF-TOKEN": csrf,
        },
    };
    function getAccessToken(){
        return accessToken.value;
    }
    function setLogin(state:boolean){
        loginState.value = state;
    }


    function signIn(data:UserData){
        axios.post("http://localhost:5000/api/login", data).then((response) => {

            const key = new LocalKey("accessToken", "");
            LocalStorage.setItem(key, response.data.accessToken);
            console.log("csrf -> "+ response.data.accessToken);


        });
    }
    function signOut(){
        axios.post("http://localhost:5000/api/logout", {data:0},{ withCredentials: true }).then((response) => {
            csrf.value = response.data;
            console.log("csrf -> "+csrf.value);
        });
    }

    return{ signIn, signOut, getAccessToken}

});