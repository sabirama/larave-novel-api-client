import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Books from '../pages/Books.vue';
import Authentication from '../pages/Authentication.vue';
import BookNovel from '../pages/BookNovel.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/books', name: 'books', component: Books },
    { path: '/auth', name: 'authenticate', component: Authentication },
    {path: '/:title', name: 'book', component: BookNovel}
];

const MainRouter = createRouter({
    history: createWebHistory(),
    routes,
});

export default MainRouter;