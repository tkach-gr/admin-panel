<template>
  <div class=" page-container">
    <div class="news__container">
      <div class="list">
        <div class="list__title">Новости</div>
        <div class="list__container">
          <ItemCard
              v-for="(item, index) in getEnabledNews"
              :key="index"
              :item="item"
              :lang="lang"
              class="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from "./ItemCard";

export default {
  name: "News",
  props: ["pages", "lang"],
  components: {
    ItemCard
  },
  data() {
    return {
      sourceRef: "news/",
    }
  },
  computed: {
    news() {
      return this.$store.getters.getNews(this.sourceRef);
    },
    getEnabledNews() {
      let news = this.news;

      if(news === null || news.list === null) return [];

      return news.list.filter(item => {
        if(item.ukr.status === "ВКЛ") {
          return true;
        }

        return false;
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.news {
  display: flex;
  justify-content: center;
}

.news__container {
  flex-grow: 1;
  max-width: 1200px;
  padding: 30px
}

.list {
  margin-top: 40px;
}

.list:first-child {
  margin-top: 0;
}

.list__title {
  text-align: center;
  font-size: 28px;
}

.list__container {
  display: flex;
  flex-wrap: wrap;
  margin: 10px -10px -20px -10px;
}

.item {
  width: 366px;
  margin: 20px 10px;
  color: black;
}
</style>