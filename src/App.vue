<template>
  <AppHeader />
  <router-view></router-view>
  <AppFooter />
</template>

<script setup>
  import AppHeader from './components/AppHeader.vue';
  import AppFooter from './components/AppFooter.vue';

  const toTop = () => {
    window.scrollTo(top);
  }
</script>

<style scoped>
 
</style>
