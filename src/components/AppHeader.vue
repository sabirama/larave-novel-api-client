<template>
  <header>
    <router-link to="/" exact>Home</router-link>
    <nav>
      <ul>
        |
        <li><router-link to="/about">About</router-link></li>
        |
        <li><router-link to="/books">Books</router-link></li>
        |
        <li v-if="authenticated">
          <router-link to="/account">Account</router-link>
        </li>
        <li v-else>
          <router-link to="/account/login" v-if="authPath == '/account/register'">Login</router-link>
          <router-link to="/account/register" v-else-if="authPath == '/account/login'">Register</router-link>
          <router-link to="/account/login" v-else>Login</router-link>
        </li>
      </ul>
    </nav>
    <div class="search">
      <input type="text" v-model="value" @change="updateValue" />
      <router-link to="/books"
        ><button @click="dispatchCustomEvent('search')">
          search
        </button></router-link
      >
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { dispatchCustomEvent } from "../js/Functions.js";

const value = ref("");
const authPath = ref(window.location.pathname);
const authenticated = ref(false);

window.addEventListener("click", () => {
  authPath.value = window.location.pathname;
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sessionStorage.setItem("search", value.value);
    dispatchCustomEvent("search");
  }
});

function updateValue() {
  sessionStorage.setItem("search", value.value);
}

</script>

<style scoped>
@import url(./css/Header.css);
</style>
../js/Functions.js
