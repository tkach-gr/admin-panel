<template>
  <div class="page-container">
    <div v-if="searchingStatus === 'found'" class="common-page">
      <div class="poster">
        <div class="poster__container">
          <ImageBlock
              :sourceRef="sourceRef"
              :image="page[lang].mainImage"
              :lang="lang"
          />
        </div>
      </div>
      <div class="common-page__container">
        <div class="common-page__name">{{ page[lang].name }}</div>
        <div class="common-page__text">{{ page[lang].text }}</div>
        <div
            v-if="page[lang].gallery !== undefined && page[lang].gallery.length !== 0"
            class="gallery"
        >
          <div class="gallery__title">Фотогалерея</div>
          <div class="gallery__container">
            <div
                v-for="(item, index) in page[lang].gallery"
                :key="index"
                class="gallery__wrapper"
            >
              <div class="gallery__item">
                <ImageBlock
                    :sourceRef="sourceRef"
                    :image="item.image"
                    :lang="lang"
                />
              </div>
            </div>
          </div>
      </div>
      </div>
    </div>
    <div v-else-if="searchingStatus === 'searching'" class="searching">
      Поиск...
    </div>
    <div v-else-if="searchingStatus === 'error'" class="searching-error">
      Не удалось найти страницу
    </div>
  </div>
</template>

<script>
import ImageBlock from "./ImageBlock";

export default {
  name: "CommonPage",
  props: ["pages", "lang"],
  components: {
    ImageBlock
  },
  data() {
    return {
      sourceRef: "pages/",
      page: null,
      searchingStatus: "searching",
    }
  },
  methods: {
    findPromotion() {
      this.searchingStatus = "searching";
      let seoUrl = this.$route.params.seoUrl;

      if(this.pages === null || this.pages.list.length === 0) return;

      for(let item of this.pages.list) {
        if(item.ukr.seoUrl === seoUrl) {
          this.page = item;
          this.searchingStatus = "found";
          return;
        }
      }

      this.searchingStatus = "error";
    },
  },
  watch: {
    pages() {
      this.findPromotion();
    }
  },
  created() {
    this.$watch(
        () => this.$route.params,
        (toParams, previousParams) => {
          this.findPromotion();
        }
    );
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

.common-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.poster {
  position: relative;
  width: 100%;
  max-height: 640px;
  overflow: hidden;
}

.poster__container {
  width: 100%;
  padding-top: 56.25%;
}

.common-page__container {
  flex-grow: 1;
  max-width: 1200px;
  padding: 30px;
}

.common-page__name {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
}

.common-page__text {
  margin-top: 15px;
  white-space: pre-wrap;
}

.gallery {
  margin-top: 50px;
}

.gallery__title {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.gallery__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  margin-bottom: -10px;
}

.gallery__wrapper {
  flex: 49% 0 0;
  margin: 10px 0;
  border-radius: 0.25rem;
  overflow: hidden;
}

.gallery__item {
  position: relative;
  width: 100%;
  padding-top: 42%;
}
</style>