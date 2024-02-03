<template>
  <header>
    <router-link  to="/" exact>Home</router-link>
    <nav>
      <ul> |
        <li><router-link to="/about">About</router-link></li> |
        <li><router-link  to="/books">Books</router-link></li> |
        <li>
          <router-link  to="/account" v-if="auth">Account</router-link>
          <router-link  to="/auth" v-else="">Log-in</router-link>
        </li> 
      </ul>
    </nav>
    <div class="search">
      <input type="text" v-model="value" @change="updateValue">
        <router-link to="/books"><button @click="dispatchCustomEvent('search')">search</button></router-link>
    </div>
  </header>
</template>

<script setup>
  import {ref} from 'vue';
  import { dispatchCustomEvent } from '../js/Functions.js';

  const  value = ref('');
  const auth = ref(false);
  window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sessionStorage.setItem('search', value.value);
    dispatchCustomEvent('search');
  }
  });

  function updateValue(event) {
    sessionStorage.setItem('search', event.target.value);
  }


</script>

<style scoped>
@import url(./css/Header.css);
</style>
../js/Functions.js