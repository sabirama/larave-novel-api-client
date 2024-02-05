<template>
    <div class="card">
        <img :src="imgSrc" alt="">
        
        <div class="card-details">
           <router-link :to="'/books/' + title.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase() + '-' + id">
            <h3>{{ title }}</h3>
            <small>{{ details }}</small>
           </router-link>
        </div>
        <div class="card-status">
            <i>{{ popular }}</i>
            <i>{{  latest }}</i>
            <i>{{ rate }}✩</i>
        </div>
    </div>
</template>

<script setup>
   defineProps({
    imgSrc: String,
    popular: String,
    latest: String,
    rate: Number,
    title: String,
    details: String,
    id: Number
   });
</script>

<style scoped>
@import url(./css/Card.css);
</style>
