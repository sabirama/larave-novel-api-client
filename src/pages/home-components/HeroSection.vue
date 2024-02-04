<template>
  <div class="hero">
    <div class="hero-image">
      <div class="button-container">
        <router-link to="/books" class="cta-button button-tertiary">See Collection <span class="spinner">⧰</span></router-link>
        <router-link to="/about" class="cta-button button-secondary"><span class="spinner">⧰</span> Learn More</router-link>
      </div>
    </div>

    <div class="hero-text">
      <h1>LIGHT NOVEL CORNER</h1>
      <p class="text">
        Get updated to latest light novels and news.
        Light Novel Corner is your place to keep up to date to popular and upcoming novels.
      </p>
      <span class="more">. . .</span>
    </div>
    <div class="hero-cards">
      <div class="card-container">
        <AppCard
          v-for="(item) in books.value"
          :imgSrc="item.cover_image? url + item.cover_image : '/src/assets/images/placeholder-book-image.svg'"
          :popular="'hot'"
          :latest="'new'"
          :rate="item.rating[0]?.rate"
          :title="item.title"
          :id="item.id"

        />
      </div>
      <h4>LATEST</h4>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { apiGet } from '../../js/Functions.js';
import AppCard from '../../components/AppCard.vue';
import Variables from '../../js/Variables.js';

const books = ref([]);
const url = Variables.baseUrl;

const getData = async () => {
    const data = await apiGet(Variables.bookEndpoint + "?" + Variables.pageSize(8));
    return books.value = ref(data.data);
}

onMounted(()=> {getData('') });
</script>

<style scoped>
@import url(./css/HeroSection.css);
</style>
