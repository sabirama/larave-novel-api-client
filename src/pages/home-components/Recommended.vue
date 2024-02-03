<template>
    <div class="recommended">
        <h1>Recommended</h1>
        <CardCollection />
        <span class="more">. . .</span>
    </div>
    
</template>

<script setup>
import CardCollection from '../../components/CardCollection.vue'
</script>

<style scoped>
@import url(./css/Recommended.css);
</style>