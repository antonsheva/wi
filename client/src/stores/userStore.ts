import {ref, computed} from "vue";
import {defineStore} from "pinia";
import axios from 'axios';
import {LocalKey, LocalStorage} from 'ts-localstorage'

import {modalStore} from "@/stores/ModalStore";

export const userStore = defineStore("userStore",() => {
    interface UserData{
        login: string,
        password: string,
        email:string
    }
    const mModalStore = modalStore();

    axios.defaults.withCredentials = true;
    const accessTokenKey = new LocalKey("accessToken", "-");



    const login = ref("");
    const password = ref("");
    const email = ref("");
    const accessToken = ref("");


    const csrf = ref("");
    const isRegForm = ref(false);
    const isLogin = ref(false);

    const getCsrf = computed(()=>{csrf.value});
    const config = {
        headers: {
            "X-CSRF-TOKEN": csrf,
        },
    };
    function getAccessToken(){
        return accessToken.value;
    }
    function changeRegForm(){
        isRegForm.value = !isRegForm.value;

    }

    function regNewUser(data:UserData){
        axios.post("http://localhost:5000/api/registration", data).then((response) => {
            LocalStorage.setItem(accessTokenKey, response.data.accessToken);
            const resp = response.data;
            console.log("error -> "+ resp.error);
            console.log("status -> "+resp.status)
            console.log("userData -> "+resp.userData)

            if(resp.error == -1){
                mModalStore.showModal(resp.message);
            }else{
                isLogin.value = true;
            }
        })
        .catch((error)=>{
                mModalStore.showModal(error.response.data.message);
        })
    }

    function checkLoginState(){
        console.log("-----getIsLogin------")

        const token = LocalStorage.getItem(accessTokenKey);
        if(token && token.length>10){
            accessToken.value = token;
            isLogin.value = true;
        }
    }

    function signIn(data:UserData){
        axios.post("http://localhost:5000/api/login", data)
            .then((response) => {
            const status = response.status;
            console.log('status -> '+status);

            LocalStorage.setItem(accessTokenKey, response.data.accessToken);
            console.log("accessToken -> "+ response.data.accessToken);
            isLogin.value = true;

            })
            .catch((error)=>{
                mModalStore.showModal(error.response.data.message);
            })
    }
    function signOut(){
        axios.post("http://localhost:5000/api/logout", {data:0},{ withCredentials: true }).then((response) => {
            csrf.value = response.data;
            isLogin.value = false;
            LocalStorage.setItem(accessTokenKey, "-");
        });
    }

    return{ signIn, signOut, isLogin, changeRegForm, isRegForm, checkLoginState, regNewUser}

});