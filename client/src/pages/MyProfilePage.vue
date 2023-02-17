<template>
  <div v-if="mStore.isLogin">
    <profile-page></profile-page>
  </div>
  <div v-else class="my_h-100">
    <div>
      <p class="text-center h3 fw-bold mb-3 mt-3 text-secondary">{{ title }}</p>
      <sign-up-form v-if="mStore.isRegForm"></sign-up-form>
      <login-form v-else></login-form>
      <a @click="changeRegForm" class="mt-5 text-secondary">{{ pageLink }}</a><br />
      <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
        <span><tg-icon></tg-icon></span>
        <span><google-icon></google-icon></span>
        <span><vk-icon></vk-icon></span>
        <span><mailru-icon></mailru-icon></span>
        <span><ya-icon></ya-icon></span>
      </div>
    </div>
  </div>
</template>

<script>
import SignUpForm from "@/components/SignUpForm.vue";
import LoginForm from "@/components/LoginForm.vue";
import ProfilePage from "@/components/ProfilePage.vue"
import TgIcon from '@/components/icons/TgIcon.vue'
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import VkIcon from "@/components/icons/VkIcon.vue";
import MailruIcon from "@/components/icons/MailruIcon.vue";
import YaIcon from "@/components/icons/YaIcon.vue";

import {userStore} from "@/stores/userStore";

import  {ref} from  "vue";


export default {
  components: { SignUpForm, LoginForm, ProfilePage, GoogleIcon, TgIcon, VkIcon, MailruIcon, YaIcon},
  setup() {
    const mStore = userStore();
    const title = ref("Вход");
    const pageLink = ref("Зарегистрироваться");

    const changeRegForm = ()=>{
      mStore.changeRegForm();
      title.value = mStore.isRegForm ? "Регистрация" : "Вход";
      pageLink.value = !mStore.isRegForm ? "Зарегистрироваться" : "Войти";
    }


    return {

      mStore,
      changeRegForm,
      title,
      pageLink
    };
  },
};

</script>

<style scoped>
.my_h-100 {
  min-height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
