<template>
  <main class="books">
    <aside>
      <div>
        <router-link to="/">home /</router-link>
        <router-link to="/books" class="active">books </router-link>
      </div>
    </aside>
    <h1>Books</h1>
    <CardCollection />
    <ToTop />
  </main>
</template>

<script setup>
import CardCollection from "../components/CardCollection.vue";
import ToTop from "../components/ToTop.vue";
</script>

<style scoped>
@import url(./css/Main.css);
@import url(./css/Books.css);
@import url(./css/Breadcrumb.css);
</style>
