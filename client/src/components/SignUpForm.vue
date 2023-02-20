<template>
        <form>
            <div class="d-flex flex-row align-items-center mb-2">

                <div class="form-outline flex-fill mb-0">
                    <input v-model="login" type="text" id="signUpLogin" class="form-control" autocompleted="true">
                    <label class="form-label" for="signUpLogin" style="margin-left: 0;">Логин</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 71.2px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex flex-row align-items-center mb-2">

                <div class="form-outline flex-fill mb-0">
                    <input v-model="email" type="email" id="signUpEmail" class="form-control" autocompleted="true">
                    <label class="form-label" for="signUpEmail" style="margin-left: 0px;">Email</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 68.8px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex flex-row align-items-center mb-2">

                <div class="form-outline flex-fill mb-0">
                    <input v-model="password" type="password" id="signUpPassword" class="form-control" autocompleted="true">
                    <label class="form-label" for="signUpPassword" style="margin-left: 0px;">Пароль</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 64px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex flex-row align-items-center mb-2">

                <div class="form-outline flex-fill mb-0">
                    <input v-model="repPassword" type="password" id="signUpRepPassword" class="form-control" autocompleted="true">
                    <label class="form-label" for="signUpRepPassword" style="margin-left: 0px;">Повторить пароль</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 134.4px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <my-button
                @click="registration"
                >Зарегистрироваться</my-button>
            </div>
        </form>
</template>

<script>
    import MyButton from "@/components/UI/MyButton.vue";
    import {modalStore} from  "@/stores/modalStore";
    import {userStore} from  "@/stores/userStore";
    import {ref} from 'vue'
    export default {
        name: "SignUpForm",
        components: {MyButton},
        setup(){
          const login = ref("");
          const password = ref("");
          const repPassword = ref("")
          const email = ref("");

          const mModalStore = modalStore();
          const mUserStore  = userStore();

          function registration(){
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            let err = false;
            if((password.value.length < 1)||
                (repPassword.value.length < 1)||
                (login.value.length < 1)||
                (email.value.length < 1)){
                   mModalStore.showModal("Заполните все поля");
                   err = true;
            }
            if(repPassword.value !== password.value){
              mModalStore.showModal("Пароли не совпадают");
              err = true;
            }
            if(!reg.test(email.value)){
              mModalStore.showModal("Не корректный Email");
              err = true;
            }
            if(!err){
              const userData = {
                login:login.value,
                password: password.value,
                email: email.value
              }
              mUserStore.regNewUser(userData);
            }

            console.log("login -> "+login.value)
            console.log("pass -> "+password.value)
            console.log("repPass -> "+repPassword.value)
            console.log("email -> "+email.value)
            console.log("======================")

          }

          return{
            login, password, repPassword, email,
            registration,
            mModalStore, mUserStore

          }
        }


    }
</script>

<style scoped>

</style>