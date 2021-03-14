<template>
  <div class="page-container">
    <div v-show="searchingStatus === 'found'" class="cinema">
      <div
          v-if="mainImage !== ''"
          class="cinema__background"
      >
        <div
            :style="`background-image: url(${mainImage});`"
            class="cinema__background-img"></div>
      </div>
      <div class="cinema__container">
        <div class="cinema__column cinema__left">
          <div class="list">
            <div class="list__title">Список залов</div>
            <div class="list__container">
              <RouterLink
                  v-for="(item, index) in cinema.halls"
                  :key="index"
                  :to="`/cinemas/${cinema[lang].name}/${item[lang].name}`"
                  class="list__item"
              >{{ item[lang].name }}</RouterLink>
            </div>
          </div>
        </div>
        <div class="cinema__column cinema__right">
          <div class="cinema__row">
            <div class="cinema__poster">
              <img ref="logoImage" alt="poster" class="cinema__poster-img">
            </div>
            <div class="cinema__description">
              <div class="cinema__name">{{ cinema[lang].name }}</div>
              <div class="cinema__buy">Посмотреть расписание</div>
            </div>
          </div>
          <div v-if="cinema[lang].text !== undefined" class="cinema__row">
            <div class="info">
              <div class="info__title">Описание</div>
              <div class="info__text">
                {{ cinema[lang].text }}
              </div>
            </div>
          </div>
          <div v-if="cinema[lang].conditions !== undefined" class="cinema__row">
            <div class="info">
              <div class="info__title">Условия</div>
              <div class="info__text">
                {{ cinema[lang].conditions }}
              </div>
            </div>
          </div>
          <div
              v-if="cinema[lang].gallery !== undefined && cinema[lang].gallery.length !== 0"
              class="cinema__row">
            <div class="cinema__gallery">
              <div class="info">
                <div class="info__title">Фотогалерея</div>
                <div class="info__text">
                  <div
                      v-for="(item, index) in gallery"
                      :key="index"
                      class="slide"
                  >
                    <div :style="`background-image: url(${item});`" class="slide__img"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="searchingStatus === 'searching'" class="searching">
      Поиск...
    </div>
    <div v-else-if="searchingStatus === 'error'" class="searching-error">
      Не удалось найти кинотеатр
    </div>
  </div>
</template>

<script>
import database from "@/scripts/database.js";

export default {
  name: "Cinema",
  props: ["lang"],
  data() {
    return {
      cinema: { ukr: {}, rus: {}, halls: [] },
      searchingStatus: "searching",
      sourceRef: "cinemas/",
      mainImage: "",
      gallery: [],
    }
  },
  methods: {
    showLogoImage() {
      let image = this.cinema[this.lang].logoImage;

      if(image === undefined || image === "") {
        this.$refs.logoImage.src = "";
        return;
      }

      let ref = `${this.sourceRef}${this.cinema[this.lang].logoImage}`;
      database.getImageUrl(ref, url => {
        this.$refs.logoImage.src = url;
      });
    },
    showMainImage() {
      let image = this.cinema[this.lang].mainImage;

      if(image === undefined || image === "") {
        this.mainImage = "";
        return;
      }

      let ref = `${this.sourceRef}${image}`;
      database.getImageUrl(ref, url => {
        this.mainImage = url;
      });
    },
    showGallery() {
      let images = this.cinema[this.lang].gallery;

      if(images === undefined) {
        this.gallery = [];
        return;
      }

      for(let i = 0; i < images.length; i++) {
        let item = images[i];
        let ref = `${this.sourceRef}${item.image}`;

        let number = i;
        database.getImageUrl(ref, url => {
          this.gallery[number] = url;
        });
      }
    },
    check(name) {
      for(let item of this.cinemas.list) {
        if(item[this.lang].name === name) {
          return item;
        }
      }

      return null;
    },
    update() {
      let cinema = null;
      let name = this.$route.params.name;

      if(this.cinemas === null) return;

      if(this.cinemas.list.length !== 0) {
        cinema = this.check(name);
      }

      if(cinema !== null) {
        this.cinema = cinema;
        this.searchingStatus = "found";
        this.showMainImage();
        this.showLogoImage();
        this.showGallery();
      } else if(this.cinemas.list.length !== 0) {
        this.searchingStatus = "error";
      }
    }
  },
  watch: {
    cinemas() {
      this.update();
    },
    lang() {
      this.showMainImage();
      this.showLogoImage();
      this.showGallery();
    }
  },
  computed: {
    cinemas() {
      return this.$store.getters.getCinemas(this.sourceRef);
    },
  },
  mounted() {
    this.update();
  }
};
</script>

<style lang="scss" scoped>
.cinema {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.cinema__container {
  flex-grow: 1;
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 30px;
}

.cinema__background {
  width: 100%;
  max-height: 580px;
  overflow: hidden;
}

.cinema__background-img {
  width: 100%;
  padding-top: 51%;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 57%;
}

.cinema__column {
  display: flex;
  flex-direction: column;
}

.cinema__left {
  flex: 200px 0 0;
}

.cinema__right {
  flex-grow: 1;
  margin-left: 50px;
}

.cinema__row {
  display: flex;
  margin-top: 50px;
}

.cinema__column .cinema__row:first-child {
  margin-top: 0;
}

.list__title {
  font-size: 20px;
}

.list__container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border: black 1px solid;
  border-radius: 0.25rem;
  overflow: hidden;
}

.list__item {
  padding: 5px 12px;
  color: black;
  border-top: black 1px solid;
  transition: background-color 0.3s ease;
}

.list__item:first-child {
  border-top: none;
}

.list__item:hover {
  background-color: #dbdbdb;
}

.cinema__poster {
  position: relative;
  overflow: hidden;
  flex: 160px 0 0;
  height: 160px;
  border-radius: 0.25rem;
}

.cinema__poster-img {
  position: relative;
  //top: -20%;
  width: 100%;
  height: 100%;
}

.cinema__description {
  flex: 63% 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cinema__buy {
  margin-top: 20px;
  padding: 10px 25px;
  font-size: 18px;
  background-color: #1aca1a;
  border: black 1px solid;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cinema__buy:hover {
  background-color: #40f140;
}

.cinema__name {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  width: 100%;
}

.info {
  width: 100%;
}

.info__title {
  font-size: 24px;
  text-align: center;
}

.info__text {
  margin-top: 16px;
}

.cinema__gallery {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin: -15px;
}

.slide {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 15px;
}

.slide__img {
  width: 100%;
  max-width: 700px;
  padding-top: 42%;
  background-size: contain;
  background-repeat: round;
  border-radius: 0.25rem;
  overflow: hidden;
}

.searching,
.searching-error {
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 30px;
}
</style>