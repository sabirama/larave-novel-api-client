<template>
    <div class="recommended">
        <h1>Recommended</h1>
        <CardCollection :books="books" />
        <span class="more">. . .</span>
    </div>
    
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { apiGet } from '../../js/Functions.js';
import { paths, apiParams } from '../../js/Variables.js';
import CardCollection from '../../components/CardCollection.vue'

const books = ref([]);
const currPage = ref(1);

const getData = async () => {
    const data = await apiGet(paths.bookEndpoint + "?" +  apiParams.pageSize(16) + apiParams.pageOn(currPage.value));
    return books.value = data[0];
}

onMounted(()=> {getData()});
</script>

<style scoped>
@import url(./css/Recommended.css);
</style>