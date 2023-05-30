<template>
  <Nav></Nav>
  <Suspense>
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
          <component :is="Component"></component>
      </transition>
    </router-view>
  </Suspense>
</template>
<script setup>
console.log(import.meta.env.MODE, 'mode')
</script>
<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.3s ease;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>