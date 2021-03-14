import { createRouter, createWebHistory } from 'vue-router';
import CustomerPage from '../components/Pages/CustomerPage/Index.vue';
import CustomerMain from '../components/Pages/CustomerPage/Main/Index.vue';
import CustomerPoster from '../components/Pages/CustomerPage/Poster/Index.vue';
import CustomerSoon from '../components/Pages/CustomerPage/Soon/Index.vue';
import CustomerCinemas from '../components/Pages/CustomerPage/Cinemas/Index.vue';
import CustomerCinema from '../components/Pages/CustomerPage/Cinema/Index.vue';
import CustomerHall from '../components/Pages/CustomerPage/Hall/Index.vue';
import CustomerAccount from '../components/Pages/CustomerPage/Account/Index.vue';
import CustomerFilm from '../components/Pages/CustomerPage/Film/Index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CustomerPage,
    children: [
      {
        path: "",
        component: CustomerMain,
      },
      {
        path: "poster",
        component: CustomerPoster
      },
      {
        path: "future",
        component: CustomerSoon
      },
      {
        path: "cinemas",
        component: CustomerCinemas
      },
      {
        path: "cinemas/:name",
        component: CustomerCinema
      },
      {
        path: "cinemas/:cinemaName/:hallName",
        component: CustomerHall,
      },
      {
        path: "/account",
        component: CustomerAccount
      },
      {
        path: "/films/:category/:seoUrl",
        component: CustomerFilm
      }
    ]
  },
  {
    path: '/login',
    name: 'Authorization',
    component: () => import(/* webpackChunkName: "about" */ '../components/Pages/Authorization/Index.vue')
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "about" */ '../components/Pages/AdminPanel/Index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
