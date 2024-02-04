User
<template>
  <div v-if="errorPage==true">
   <Errorpage />
  </div>
  
  <main class="book-novel" v-else>
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
        <div class="overlay"></div>
      </div>
      <div class="detail-container">
        <div class="about background">
            <h4>About</h4>
            <p>{{ bookObject.details }}</p>
        </div>
        <ul class="authors background">
           <h4> Authors</h4>
          <li v-for="author in bookObject.author">{{ author.name }}</li>
        </ul>
        <ul class="genre background">
            <h4>Genres</h4>
          <li v-for="genre in bookObject.genre">{{ genre.name }}</li>
        </ul>
      </div>
    </div>
    <div class="rating-container">
        <h4>Comments</h4>
      <ul>
        <li  class="rate">
         <span class="rater">
            <img src="../assets/images/hutao.png" alt="user-image" class="user-image"> 
            <span>LightReader</span>
            <span class="rate-stars">
              rating :
                <span >★</span>
                <span >★</span>
                <span >★</span>
                <span >★</span>
                <span >★</span>
            </span>
          </span>
          <div class="rate-content">
          <p>Sample Comment. this is a test comment for layouting the website.</p>
          </div>
        </li>

        <li v-for="rating in rateObject" class="rate">
          <span>
            <img :src="rating.user.data.profile_image" alt="user-image" class="user-image">
            <span>{{ rating.user.data.username }}</span>
            <span v-for="star in 5" :key="star" class="rate-stars">
              <span v-if="rating.rate >= star">★</span>
              <span v-else>☆</span>
          </span>
          </span>
          <div class="rate-content">
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
import Errorpage from "../components/Errorpage.vue";

const book = ref(window.location.pathname);
const regex = /-(\d+)$/;
const match = book.value.match(regex);
const bookObject = ref({});
const rateObject = ref([]);
const errorPage = ref(false);

const getBook = async () => {
  try {
    const { data } = await apiGet(bookEndpoint + match[1]);
    bookObject.value = data;
    
  } catch (error) {
    if (!match) {
        errorPage.value = true;
      }
    console.error(error.message);
  }
};

const getRating = async () => {
  try {
    const { data } = await apiGet(rateEndpoint + match[1]);
    data.forEach(element => {
        return getUser(element);
    });
  } catch (error) {
    console.error(error.message);
  }
};

const getUser = async (data) => {
  try {
    const user = await apiGet(userEndpoint + data.rate.user.id);
    rateObject.value.push({ rate: data, user: user });
  } catch (error) {
    console.error(error.message);
  }
};
onMounted(() => {
  getBook();
  getRating();
});
</script>

<style scoped>
@import url(./css/Main.css);
@import url(./css/BookNovel.css)
</style>
