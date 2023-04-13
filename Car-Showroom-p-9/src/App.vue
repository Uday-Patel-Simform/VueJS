<template>
  <Nav></Nav>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  
</template>
<script>
import Home from "./views/HomeView.vue"

export default {
  components:{Home},
  created(){
    console.log(import.meta.env.MODE,'mode')
  }
}
</script>
<style>
.route-enter-from{
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active{
  transition: all 0.3s ease;
}
.route-leave-to{
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active{
  transition: all 0.3s ease-in;
}
</style>