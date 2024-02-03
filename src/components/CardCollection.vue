<template>
    <div class="card-container">
           <span class="card-with-details" v-for="(item) in books.value">
            <AppCard 
                :imgSrc="item.cover_image ? url + item.cover_image : '/src/assets/images/placeholder-book-image.svg'"
                :popular="'hot'"
                :latest="'new'"
                :rate="item.rating[0]?.rate"
                :title="item.title"
                details="more"
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
import Variables from '../js/Variables.js';

const books = ref([]);
const url = Variables.baseUrl;
const currPage = ref(1);
const pageUrl = Variables.bookEndpoint + "?" + Variables.searchBookTitle(sessionStorage.getItem('search')) + Variables.pageSize(20) + Variables.pageOn(currPage.value)

catchEvent('search', ()=>{
    getData(sessionStorage.getItem('search'));
});

const getData = async (item) => {
    let data;
    if (item) {
        data = await apiGet(pageUrl);
        console.log(data)
    } else {
        data = await apiGet(Variables.bookEndpoint);
    }
    books.value = ref(data.data);
}

onMounted(()=> {getData()});
</script>

<style scoped>
@import url(./css/CardCollection.css);
</style>