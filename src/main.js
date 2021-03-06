import { createApp } from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './scss/style.scss';
import CustomerPage from './components/Pages/CustomerPage/Index';
import AdminPanel from './components/Pages/AdminPanel/Index.vue';

const routes = [
    { path: '/', component: CustomerPage },
    { path: 'admin', component: AdminPanel }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

const app = createApp(App);

app.use(router);

app.mount('#app');
