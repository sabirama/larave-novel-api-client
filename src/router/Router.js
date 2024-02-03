import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Books from '../pages/Books.vue'
import Authentication from '../pages/Authentication.vue'
import BookNovel from '../pages/BookNovel.vue'
import { bookEndpoint } from '../js/Variables.js'
import { apiGet } from '../js/Functions.js'

const bookRoutes = async (endpoint) => {
    const { data } = await apiGet(endpoint);

    return data.map((route) => {
        return { path: "/" + route.title.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase() + "-"+route.id, name:route.title, component: BookNovel };
    });
};

const createRoutes = async () => {
    const BookRoutes = await bookRoutes(bookEndpoint);

    const staticRoutes = [
        { path: '/', name: 'home', component: Home },
        { path: '/about', name: 'about', component: About },
        { path: '/books', name: 'books', component: Books },
        { path: '/auth', name: 'authenticate', component: Authentication },
        ...BookRoutes
    ];

    return staticRoutes;
};

const MainRouter = createRouter({
    history: createWebHistory(),
    routes: createRoutes()
});

export default MainRouter;