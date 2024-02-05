<template>
  <form class="create-comment">
    <textarea v-model="comment"></textarea>
    <div>
      <span>
        <span v-for="star in 5" :key="star" class="rate-stars">
          <button
            v-if="rateValue >= star"
            :value="star"
            @click="updateRate"
            class="rate-button"
          >
            ★
          </button>
          <button v-else :value="star" class="rate-button" @click="updateRate">
            ☆
          </button>
        </span>
      </span>
      <button @click="submitComment" class="comment-button">Comment</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { apiFetch, dispatchCustomEvent } from "../js/Functions.js";
import { rateEndpoint } from "../js/Variables.js";

const book = ref(window.location.pathname);
const regex = /-(\d+)$/;
const match = book.value.match(regex);

const comment = ref("");

const rateValue = ref(0);

const formData = ref({});

const fetchComment = async () => {
   const data = await apiFetch(
      rateEndpoint,
      "POST",
      "application/json",
      JSON.parse(sessionStorage.getItem("user")).token,
      formData.value
    );
    if (data) {
        dispatchCustomEvent('commented');
    }
  };

const updateRate = (e) => {
  e.preventDefault();
  rateValue.value = e.target.value;
};

const submitComment = (e) => {
  e.preventDefault();
  formData.value = {
    book_id: match[1],
    user_id: JSON.parse(sessionStorage.getItem("user")).user.id,
    rate: rateValue.value,
    comment: comment.value,
  };

  fetchComment();
};
</script>

<style scoped>
@import url(./css/CreateComment.css);
</style>
