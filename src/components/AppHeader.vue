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
          <router-link to="/account/register" v-if="authPath == '/account/login'">Register</router-link>
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
import { catchEvent, dispatchCustomEvent } from "../js/Functions.js";

const value = ref("");
const authPath = ref(window.location.pathname);
const authenticated = ref(sessionStorage.getItem('user'));

catchEvent('authenticated', ()=> {
  authenticated.value = sessionStorage.getItem('user');
})

window.addEventListener("click", () => {
  authPath.value = window.location.pathname;
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sessionStorage.setItem("search", value.value);
    window.dispatchEvent(new Event('search'));
  }
});

function updateValue() {
  sessionStorage.setItem("search", value.value);
  window.dispatchEvent( new Event('search'));
}

</script>

<style scoped>
@import url(./css/Header.css);
</style>
../js/Functions.js
