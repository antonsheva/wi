<template>
  <div class="app">
    <router-view></router-view>
    <my-modal></my-modal>
    <nav-bar/>
  </div>
</template>

<script>
import VueCookie from 'vue-cookies'
import {userStore} from "@/stores/userStore";

import NavBar from "./components/UI/NavBar.vue";
import MyModal from "./components/UI/MyModal.vue";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.css";



import {inject} from "vue";


export default {
  name: 'App',
  components: {
    NavBar,MyModal
  },
  setup(){
    inject<VueCookie>('$cookies');
  }
}
</script>


<style>
#app {
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
}
.app{
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
}
</style>
