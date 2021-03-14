<template>
  <div class="cinemas page-container">
    <div class="cinemas__container">
      <div class="list">
        <div class="list__title">Наши кинотеатры</div>
        <div class="list__container">
          <RouterLink
              v-for="(item, index) in cinemas?.list"
              :key="index"
              :to="`/cinemas/${item[lang].name}`"
          >
            <ItemCard
                :item="item"
                :lang="lang"
                :isAvailable="true"
                class="item"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from "./ItemCard";

export default {
  name: "Cinemas",
  props: ["pages", "lang"],
  components: {
    ItemCard
  },
  data() {
    return {
      sourceRef: "cinemas/",
      searchingStatus: "searching",
    }
  },
  computed: {
    cinemas() {
      return this.$store.getters.getCinemas(this.sourceRef);
    }
  },
}
</script>

<style lang="scss" scoped>
.cinemas {
  display: flex;
  justify-content: center;
}

.cinemas__container {
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
  margin: 20px -10px -10px -10px;
}

.item {
  margin: 10px;
  color: black;
}
</style>