import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";

export const modalStore = defineStore("modalStore", ()=> {
    const showState = ref(false);
    const modalTitle = ref("");
    const modalContent = ref("modalContent");
    const modalButtonTitle = ref("Ok");


    function hideModal(){
        showState.value = false;
    }
    function showModal(content:string, title?:string|undefined, buttonTitle?:string|undefined, time  = 3000){
        modalContent.value = content;
        if(title)modalTitle.value = title;
        if(buttonTitle)modalButtonTitle.value = buttonTitle;
        showState.value = true;

        setTimeout(()=>{
            showState.value = false;
        }, time)
    }

    return {hideModal, showModal, showState,
        modalTitle,modalContent,modalButtonTitle}
})