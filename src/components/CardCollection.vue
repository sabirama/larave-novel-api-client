<template>
    <div class="card-container">
      <span class="card-with-details" v-for="(item) in books">
        <AppCard 
          :imgSrc="item.cover_image ? paths.assetUrl + item.cover_image : '../assets/images/placeholder-book-image.svg'"
          :popular="'hot'"
          :latest="'new'"
          :rate="item.rating[0]?.rate"
          :title="item.title"
          :id="item.id"
           />
        <div class="card-detail">
          <p>{{ item.details }}</p>
        </div>
      </span>
    </div>
  </template>

<script setup>
import AppCard from '../components/AppCard.vue';
import { paths } from '../js/Variables.js';
defineProps({
    books: Array
   });
</script>

<style scoped>
@import url(./css/CardCollection.css);
</style>