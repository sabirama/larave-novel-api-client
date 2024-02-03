User
<template>
  <main class="book-novel">
    <div class="book-main-container">
      <div class="image-container">
        <h3>{{ bookObject.title }}</h3>
        <img
          :src="
            bookObject.cover_image
              ? baseUrl + bookObject.cover_image
              : '../src/assets/images/hutao.png'
          "
          :alt="bookObject.title"
        />
      </div>
      <div class="detail-container">
        <div>
            <h4>About</h4>
            <p>{{ bookObject.details }}</p>
        </div>
        <ul class="authors">
           <h4> Authors</h4>
          <li v-for="author in bookObject.author">{{ author.name }}</li>
        </ul>
        <ul class="genre">
            <h4>Genres</h4>
          <li v-for="genre in bookObject.genre">{{ genre.name }}</li>
        </ul>
      </div>
    </div>
    <div class="rating-container">
        <h4>Comments</h4>
      <ul>
        <li v-for="rating in rateObject">
        <p>{{ rating.user.data.username }}</p>
        <div class="rate-content">
        <span v-for="star in 5" :key="star">
            <span v-if="rating.rate >= star">★</span>
            <span v-else>☆</span>
        </span>
        <p>{{ rating.rate.rate.comment }}</p>
        </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiGet } from "../js/Functions.js";
import { bookEndpoint, baseUrl, rateEndpoint, userEndpoint } from "../js/Variables";

const book = ref(window.location.pathname);
const regex = /-(\d+)$/;
const match = book.value.match(regex);
const bookObject = ref({});
const rateObject = ref([]);

const getBook = async () => {
  try {
    const { data } = await apiGet(bookEndpoint + match[1]);
    bookObject.value = data;
  } catch (error) {
    console.error(error);
  }
};

const getRating = async () => {
  try {
    const { data } = await apiGet(rateEndpoint + match[1]);
    data.forEach(element => {
        return getUser(element)
    });
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (data) => {
  try {
    const user = await apiGet(userEndpoint + data.rate.user.id);
    rateObject.value.push({ rate: data, user: user });
  } catch (error) {
    console.error(error);
  }
};
onMounted(getBook);
onMounted(getRating)
</script>

<style scoped>
@import url(./css/Main.css);
@import url(./css/BookNovel.css)
</style>
