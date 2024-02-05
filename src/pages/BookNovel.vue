User
<template>
  <div v-if="errorPage == true">
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
        <ul class="authors background">
          <h4>Authors</h4>
          <li v-for="author in bookObject.author">{{ author.name }}</li>
        </ul>
        <ul class="genres background">
          <h4>Genres</h4>
          <li v-for="genre in bookObject.genre">{{ genre.name }}</li>
        </ul>
      </div>

      <div class="about background">
        <h4>About</h4>
        <p>{{ bookObject.details }}</p>
      </div>
    </div>
    <div class="rating-container">
      <h4>Comments</h4>
      <ul v-if="rateObject !== false">
        <li v-for="rating in rateObject" class="rate">
          <span class="rater">
            <button class="user-image">
              <img :src="rating.user.data.profile_image" alt="user-image" />
            </button>
            <p class="username">{{ rating.user.data.username }}</p>
            <button
              v-if="rating.user.data.id == userId"
              @click="deleteComment"
              :value="rating.rate.rate.id"
            >
              X
            </button>
            <p v-for="star in 5" :key="star" class="rate-stars">
              <span v-if="rating.rate >= star">★</span>
              <span v-else>☆</span>
            </p>
          </span>
          <div class="rate-content">
            <p>{{ rating.rate.rate.comment }}</p>
          </div>
        </li>
      </ul>

      <ul v-else>
        Be the first to comment!
      </ul>
    </div>

    <CreateComment v-if="auth" />
    <div v-else class="login-action">
      Only Logged in users can comment.
      <button><router-link to="/account/login">LOG IN </router-link></button>
    </div>
    <button class="to-top" @click="toTop">Back to Top</button>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiFetch, apiGet, catchEvent } from "../js/Functions.js";
import {
  bookEndpoint,
  baseUrl,
  rateEndpoint,
  userEndpoint,
} from "../js/Variables";
import Errorpage from "../components/Errorpage.vue";
import CreateComment from "../components/CreateComment.vue";

const book = ref(window.location.pathname);
const regex = /-(\d+)$/;
const match = book.value.match(regex);
const bookObject = ref({});
const rateObject = ref([]);
const errorPage = ref(false);
const auth = sessionStorage.getItem("user");
const userId = ref(JSON.parse(sessionStorage.getItem("user"))?.user?.id);

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

    if (data) {
      data.forEach((element) => {
        return getUser(element);
      });
    } else {
      rateObject.value = false;
    }
  } catch (error) {
    console.error(error.message);
  }
};

const getUser = async (data) => {
  try {
    const user = await apiGet(userEndpoint + data.rate.user.id);
    rateObject?.value?.push({ rate: data, user: user });
  } catch (error) {
    console.error(error.message);
  }
};

const deleteComment = async (e) => {
  try {
    const data = await apiFetch(
      rateEndpoint + e.target.value,
      "DELETE",
      "application/json",
      JSON.parse(sessionStorage.getItem("user")).token,
      null
    );
    if (data) {
      rateObject.value = [];
      getRating();
    }
  } catch (error) {
    console.error(error.message);
  }
};

catchEvent("commented", () => {
  rateObject.value = [];
  getRating();
});

onMounted(() => {
  getBook();
  getRating();

  sessionStorage.removeItem("search");
});
</script>

<style scoped>
@import url(./css/Main.css);
@import url(./css/BookNovel.css);
</style>
