<template>
  <main class="books">
    <aside>
      <div>
        <router-link to="/">home /</router-link>
        <router-link to="/books" class="active">books </router-link>
      </div>
    </aside>
    <h1>Books</h1>
    <CardCollection :books="books" />
    <ToTop />
  </main>
</template>

<script setup>
import ToTop from "../components/ToTop.vue";
import { onMounted, ref } from 'vue';
import {catchEvent, apiGet} from '../js/Functions.js';
import { paths, apiParams } from '../js/Variables.js';
import CardCollection from '../components/CardCollection.vue'

const books = ref([]);
const currPage = ref(1);

catchEvent('search', ()=>{
    getData();
});

const getData = async () => {
    const pageUrl = paths.bookEndpoint + "?" + apiParams.searchBookTitle(sessionStorage.getItem('search')) + apiParams.pageSize(50) + apiParams.pageOn(currPage.value)
    let data;
    if (sessionStorage.getItem('search')) {
        data = await apiGet(pageUrl);
    } else {
        data = await apiGet(paths.bookEndpoint);
    }
    books.value = data[0];
    return;
}

onMounted(()=> {getData()});
</script>

<style scoped>
@import url(./css/Main.css);
@import url(./css/Books.css);
@import url(./css/Breadcrumb.css);
</style>
