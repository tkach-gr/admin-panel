<template>
  <div class="promotions page-container">
    <div class="promotions__container">
      <div class="list">
        <div class="list__title">Акции и скидки</div>
        <div class="list__container">
          <RouterLink
              v-for="(item, index) in promotions?.list"
              :key="index"
              :to="`/promotions/${item.ukr.seoUrl}`"
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
  name: "Promotions",
  props: ["pages", "lang"],
  components: {
    ItemCard
  },
  data() {
    return {
      sourceRef: "promotions/",
      searchingStatus: "searching",
    }
  },
  computed: {
    promotions() {
      return this.$store.getters.getPromotions(this.sourceRef);
    }
  },
}
</script>

<style lang="scss" scoped>
.promotions {
  display: flex;
  justify-content: center;
}

.promotions__container {
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
  width: 366px;
  margin: 10px;
  color: black;
}
</style>