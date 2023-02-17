<template>
  <div class="app">
    <nav-bar/>
    <router-view></router-view>
    <my-modal></my-modal>

  </div>
</template>

<script>
import VueCookie from 'vue-cookies'
import {userStore} from "@/stores/userStore";

import NavBar from "./components/UI/NavBar.vue";
import MyModal from "./components/UI/MyModal.vue";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.css";


import {inject, onMounted} from "vue";


export default {
  name: 'App',
  components: {
    NavBar,MyModal
  },
  setup(){
    inject<VueCookie>('$cookies');

    const mStore = userStore();

    const q1 = ()=>{
      console.log("hook onMounted")

    }

    onMounted(()=>{
      mStore.checkLoginState();
    });

  }
}
</script>


<style>
#app {
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
}
.app{
  width: 100%;
  height: 100%;
  min-height: 100%;

  display: flex;
  justify-content: center;
  background-color: antiquewhite;
}
</style>
