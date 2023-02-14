<template>
        <form>
            <div class="d-flex flex-row align-items-center mb-2">
                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="text" id="form3Example2c" class="form-control"
                        v-model="login">
                    <label class="form-label" for="form3Example3c" style="margin-left: 0px;">Логин</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 68.8px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex flex-row align-items-center mb-2">
                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <input type="password" id="form3Example4c" class="form-control"
                        v-model="password">
                    <label class="form-label" for="form3Example4c" style="margin-left: 0px;">Пароль</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 64px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <my-button
                    @click="loginUser">Войти</my-button>
            </div>
        </form>
</template>


<script>
    import MyButton from "@/components/UI/MyButton.vue";
    import { ref } from 'vue'
    import {userStore} from "@/stores/userStore";


    export default {
        name: "LoginForm",
        components: {MyButton},
        props: {

        },
        setup(props){
          const mStore   = userStore();
          const login    = ref("");
          const password =ref("");

          const loginUser = () => {
            const userData = {
              login: login.value,
              password: password.value
            };
             mStore.signIn(userData);
            console.log(userData);
          }

          return {
            login,
            password,
            loginUser
          }
        },
    }
</script>

<style scoped>

</style>