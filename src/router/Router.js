import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Books from '../pages/Books.vue';
import Authentication from '../pages/Authentication.vue';
import BookNovel from '../pages/BookNovel.vue';
import Errorpage from '../components/Errorpage.vue';
import Account from '../pages/authentication-components/Account.vue';
import Login from '../pages/authentication-components/Login.vue';
import Register from '../pages/authentication-components/Register.vue';
import ForgotPassword from '../pages/authentication-components/ForgotPassword.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/books', name: 'books', component: Books },
    {path: '/book/:title', name: 'book', component: BookNovel },
    {path: '/account', name: 'account', component: Authentication, 
        children: [
            { path: '', component: Account}, 
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            { path: 'password-reset', component: ForgotPassword}, 
            { path: ':404', component: Errorpage }]
    },
    {path: '/:404', name: 'error', component: Errorpage}
];

const MainRouter = createRouter({
    history: createWebHistory(),
    routes,
});

export default MainRouter;