<template>
    <div class="card-container" >
           <span class="card-with-details" v-for="(item) in books">
            <AppCard 
                :imgSrc="item.cover_image ? url + item.cover_image : '/src/assets/images/placeholder-book-image.svg'"
                :popular="'hot'"
                :latest="'new'"
                :rate="item.rating[0]?.rate"
                :title="item.title"
                :id="item.id" />
                <div class="card-detail">
                    <p>{{ item.details }}</p>
                </div>
           </span>
        </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {catchEvent, apiGet} from '../js/Functions.js';
import AppCard from './AppCard.vue';
import { paths, apiParams } from '../js/Variables';

const books = ref([]);
const url = paths.assetUrl;
const currPage = ref(1);

catchEvent('search', ()=>{
    getData();
});

const getData = async () => {
    const pageUrl = paths.bookEndpoint + "?" + apiParams.searchBookTitle(sessionStorage.getItem('search')) + apiParams.pageSize(20) + apiParams.pageOn(currPage.value)
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
@import url(./css/CardCollection.css);
</style>