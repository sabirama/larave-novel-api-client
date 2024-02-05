<template>
  <main class="home">
    <aside>
      <div>
        <router-link to="/" class="active">home </router-link>
      </div>
    </aside>
    <HeroSection />
    <Recommended />
    <button class="to-top" @click="toTop">Back to Top</button>
  </main>
</template>

<script setup>
import HeroSection from "./home-components/HeroSection.vue";
import Recommended from "./home-components/Recommended.vue";
</script>

<style scoped>
@import url(./css/Main.css);
@import url(./css/Breadcrumb.css);
</style>
