<template>
  <div class="page-container">
    <div v-if="searchingStatus === 'found'" class="promotion">
      <div class="promotion__container">
        <div class="promotion__header">
          <div class="promotion__title">{{ promotion[lang].name }}</div>
          <div class="promotion__date">{{ promotion[lang].creationDate }}</div>
        </div>
        <div class="promotion__body">
          <div class="promotion__poster">
            <ImageBlock
                :sourceRef="sourceRef"
                :image="promotion[lang].mainImage"
                :lang="lang"
            />
          </div>
          <div class="promotion__content">
            <div
                v-if="promotion[lang].text !== undefined"
                class="promotion__text"
            >{{ promotion[lang].text }}</div>
            <div class="gallery">
              <ImageBlock
                  v-for="(item, index) in promotion[lang].gallery"
                  :key="index"
                  :sourceRef="sourceRef"
                  :image="item.image"
                  :lang="lang"
                  class="gallery__item"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="searchingStatus === 'searching'" class="searching">
      Поиск...
    </div>
    <div v-else-if="searchingStatus === 'error'" class="searching-error">
      Не удалось найти акцию
    </div>
  </div>
</template>

<script>
import ImageBlock from "./ImageBlock";

export default {
  name: "Promotion",
  props: ["lang"],
  components: {
    ImageBlock
  },
  data() {
    return {
      sourceRef: "promotions/",
      promotion: null,
      searchingStatus: "searching",
    }
  },
  methods: {
    findPromotion() {
      this.searchingStatus = "searching";
      let seoUrl = this.$route.params.seoUrl;

      if(this.promotions === null || this.promotions.list.length === 0) return;

      for(let item of this.promotions.list) {
        if(item.ukr.seoUrl === seoUrl) {
          this.promotion = item;
          this.searchingStatus = "found";
          return;
        }
      }

      this.searchingStatus = "error";
    }
  },
  computed: {
    promotions() {
      return this.$store.getters.getPromotions(this.sourceRef);
    }
  },
  watch: {
    promotions() {
      this.findPromotion();
    }
  },
  mounted() {
    this.findPromotion();
  }
}
</script>

<style lang="scss" scoped>
.searching,
.searching-error {
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 30px;
}

.promotion {
  display: flex;
  justify-content: center;
  width: 100%;
}

.promotion__container {
  flex-grow: 1;
  max-width: 1200px;
  padding: 30px;
}

.promotion__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.promotion__title {
  font-size: 28px;
  font-weight: 600;
}

.promotion__date {
  margin-top: 5px;
  padding: 5px 15px;
  background-color: #4e4e4e;
  color: white;
  border-radius: 0.25rem;
}

.promotion__body {
  display: flex;
  margin-top: 25px;
}

.promotion__poster {
  flex: 366px 0 0;
  height: 260px;
}

.promotion__content {
  flex-grow: 1;
  margin-left: 25px;
}

.promotion__text {
  max-width: 450px;
  margin-bottom: 20px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: -10px;
}

.gallery__item {
  flex: 300px 0 0;
  height: 126px;
  margin: 10px;
}
</style>