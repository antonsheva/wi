import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";

export const modalStore = defineStore("modalStore", ()=> {
    const showState = ref(false);
})