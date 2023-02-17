<template>
    <div class="container text-center footer">
        <div class="row">
            <div @click="$router.push('/')" class="col my_st-2">
                <i class="bi bi-house"></i>
            </div>
            <div @click="$router.push('/scan-product')" class="col my_st-2">
                <i class="bi bi-qr-code-scan"></i>
            </div>
            <div @click="$router.push('/add-product')" class="col my_st-2">
                <i class="bi bi-plus-square"></i>
            </div>
            <div @click="$router.push('/my-profile')" class="col my_st-2">
              <i class="bi bi-person"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {userStore} from "@/stores/userStore";
    export default {
      name: "NavBar",
      setup(){
        const  mStore = userStore();
        const signOut = ()=>{
          mStore.signOut();



        }



        return{
          signOut
        }
      }
    }
</script>

<style scoped>
    .footer{
        font-size: 26px;
        height:60px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: white;
    }
    .my_st-2{
        display: inline;
        justify-content: center;
    }
</style>