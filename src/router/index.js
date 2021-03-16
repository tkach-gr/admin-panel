import { createRouter, createWebHistory } from 'vue-router';
import CustomerPage from '../components/Pages/CustomerPage/Index.vue';
import CustomerMain from '../components/Pages/CustomerPage/Main/Index.vue';
import CustomerPoster from '../components/Pages/CustomerPage/Poster/Index.vue';
import CustomerTickets from '../components/Pages/CustomerPage/Tickets/Index.vue';
import CustomerSoon from '../components/Pages/CustomerPage/Soon/Index.vue';
import CustomerCinemas from '../components/Pages/CustomerPage/Cinemas/Index.vue';
import CustomerCinema from '../components/Pages/CustomerPage/Cinema/Index.vue';
import CustomerHall from '../components/Pages/CustomerPage/Hall/Index.vue';
import CustomerPromotions from '../components/Pages/CustomerPage/Promotions/Index.vue';
import CustomerPromotion from '../components/Pages/CustomerPage/Promotion/Index.vue';
import CustomerNews from '../components/Pages/CustomerPage/News/Index.vue';
import CustomerContacts from '../components/Pages/CustomerPage/Contacts/Index.vue';
import CustomerCommonPage from '../components/Pages/CustomerPage/Common/Index.vue';
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
        path: "tickets",
        component: CustomerTickets
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
        path: "promotions",
        component: CustomerPromotions
      },
      {
        path: "promotions/:seoUrl",
        component: CustomerPromotion
      },
      {
        path: "news",
        component: CustomerNews
      },
      {
        path: "contacts",
        component: CustomerContacts
      },
      {
        path: "common/:seoUrl",
        component: CustomerCommonPage
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
