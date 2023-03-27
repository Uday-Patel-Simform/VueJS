<template>
  <Nav :is_logged_in="is_logged_in"></Nav>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  
</template>
<script>
import Home from "./views/HomeView.vue";

export default {
  components:{Home},
  data() {
    return {
      is_logged_in:false,
    }
  },
};
</script>
<style>
.route-enter-from{
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active{
  transition: all 0.3s ease-out;
}
.route-leave-to{
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active{
  transition: all 0.3s ease-in;
}
</style>