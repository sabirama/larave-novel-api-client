<template>
    <main class="home">
        <HeroSection />
        <Recommended />
    </main>
</template>

<script setup>
import HeroSection from './home-components/HeroSection.vue'
import Recommended from './home-components/Recommended.vue'
</script>

<style scoped>
    @import url(./css/Main.css);
</style>