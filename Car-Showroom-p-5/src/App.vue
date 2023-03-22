<template>
  <Nav :is_logged_in="is_logged_in"></Nav>
  <router-view></router-view>
  
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