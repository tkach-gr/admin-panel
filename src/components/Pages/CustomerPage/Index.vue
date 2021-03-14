<template>
  <div class="main-container">
    <Account :mail="mail" @logout="logout" />
    <Header :lang="lang" @changeLang="changeLang" />
    <RouterView :films="films" :pages="pages" :lang="lang" />
    <Footer class="footer" />
  </div>
</template>

<script>
import Account from "./Account.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import AccountManager from "@/scripts/AccountManager.js";
import database from "@/scripts/database";

let accountManager = new AccountManager();

export default {
  name: 'CustomerPage',
  components: {
    Account,
    Header,
    Footer
  },
  data() {
    return {
      mail: accountManager.getMail(),
      filmsRef: "films/",
      pagesRef: "pages/",
      films: [],
      pages: null,
      lang: "ukr"
    }
  },
  methods: {
    logout() {
      accountManager.deleteMail();
      this.mail = null;
    },
    changeLang(lang) {
      this.lang = lang;
    }
  },
  created() {
    database.listenData(this.filmsRef, newValue => this.films = newValue);

    database.listenData(this.pagesRef, newValue => this.pages = newValue);
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-align: left !important;
}

.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.footer {
  margin-top: 60px;
}
</style>
