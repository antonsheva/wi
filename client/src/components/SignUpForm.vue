<template>
        <form>
            <div class="d-flex flex-row align-items-center mb-2">

                <div class="form-outline flex-fill mb-0">
                    <input v-model="login" type="text" id="form3Example1c" class="form-control" autocompleted="">
                    <label class="form-label" for="form3Example1c" style="margin-left: 0px;">Логин</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 71.2px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex flex-row align-items-center mb-2">

                <div class="form-outline flex-fill mb-0">
                    <input v-model="email" type="email" id="form3Example3c" class="form-control">
                    <label class="form-label" for="form3Example3c" style="margin-left: 0px;">Email</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 68.8px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex flex-row align-items-center mb-2">

                <div class="form-outline flex-fill mb-0">
                    <input v-model="password" type="password" id="form3Example4c" class="form-control">
                    <label class="form-label" for="form3Example4c" style="margin-left: 0px;">Пароль</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 64px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex flex-row align-items-center mb-2">

                <div class="form-outline flex-fill mb-0">
                    <input v-model="repPassword" type="password" id="form3Example4cd" class="form-control">
                    <label class="form-label" for="form3Example4cd" style="margin-left: 0px;">Повторить пароль</label>
                    <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 134.4px;"></div><div class="form-notch-trailing"></div></div></div>
            </div>

            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <my-button>Зарегистрироваться</my-button>
            </div>

        </form>
</template>

<script>
    import MyButton from "@/components/UI/MyButton.vue";
    import {ref} from 'vue'
    export default {
        name: "SignUpForm",
        components: {MyButton},
        setup(){
          const login = ref("");
          const password = ref("");
          const repPassword = ref("")
          const email = ref("");

          function registration(){
            if(password !== password){

            }
          }

          return{
            login, password, repPassword, email
          }
        }


    }
</script>

<style scoped>

</style>