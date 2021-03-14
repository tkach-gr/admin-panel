<template>
  <template v-if="authInfo !== null">
    <Header :authInfo="authInfo"/>
    <MainMenu @pagechanged="changePage"/>
    <div class="content-wrapper px-4 py-2">
      <Statistics class="page" v-if="currentPage === 'statistics'" />
      <BannersAndSliders class="page" v-else-if="currentPage === 'banners-sliders'" />
      <Films class="page" v-else-if="currentPage === 'films'" />
      <Cinemas class="page" v-else-if="currentPage === 'cinemas'" />
      <News class="page" v-else-if="currentPage === 'news'" />
      <Promotions class="page" v-else-if="currentPage === 'promotions'" />
      <UsersPages class="page" v-else-if="currentPage === 'pages'" />
      <Users class="page" v-else-if="currentPage === 'users'" />
      <Sending class="page" v-else-if="currentPage === 'sending'" />
    </div>
  </template>
</template>

<script>
import Header from './Header.vue';
import MainMenu from './MainMenu.vue';
import Statistics from './Statistics.vue';
import BannersAndSliders from './BannersAndSliders/BannersAndSliders.vue';
import Films from './Films/Films.vue';
import Cinemas from './Cinemas/Cinemas.vue';
import News from './News/News.vue';
import Promotions from './Promotions/Promotions.vue';
import UsersPages from './UsersPages/UsersPages.vue';
import Users from './Users/Users.vue';
import Sending from './Sending/Sending.vue';
import database from "@/scripts/database";
import { computed } from "vue";

export default {
  name: 'AdminPanel',
  components: {
    Header,
    MainMenu,
    Statistics,
    BannersAndSliders,
    Films,
    Cinemas,
    News,
    Promotions,
    UsersPages,
    Users,
    Sending
  },
  data() {
    return {
      currentPage: 'statistics',
      authInfo: null
    }
  },
  methods: {
    changePage(pageName) {
      this.currentPage = pageName
    },
    login() {
      let mail = "admin@adminpanel.com";
      let pass = "123321";

      database.auth(mail, pass,
          (userCredential) => {
            this.authInfo = userCredential;
          },
          (err) => {
            this.authInfo = null;
            this.$router.replace("/");
          });
    }
  },
  watch: {
    authInfo(newValue) {
      console.log(newValue);
    }
  },
  mounted() {
    this.login();
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  min-height: calc(100% - 57px);
  height: 1px;
}

.page {
  width: 100%;
  min-height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
