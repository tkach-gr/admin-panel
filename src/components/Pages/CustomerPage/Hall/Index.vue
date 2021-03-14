<template>
  <div class="page-container">
    <div v-show="searchingStatus === 'found'" class="hall">
      <div v-if="topBannerImage !== ''" class="hall__background">
        <div
            :style="`background-image: url(${topBannerImage});`"
            class="hall__background-img"
        ></div>
      </div>
      <div class="hall__container">
        <div class="hall__column hall__left">
          <!-- list -->
        </div>
        <div class="hall__column hall__right">
          <div class="hall__row">
            <div class="hall__description">
              <div class="hall__name">{{ hall[lang].name }}</div>
              <div class="hall__buy">Посмотреть расписание</div>
            </div>
          </div>
          <div v-if="hall[lang].description !== undefined" class="hall__row">
            <div class="info">
              <div class="info__title">Описание</div>
              <div class="info__text">
                {{ hall[lang].description }}
              </div>
            </div>
          </div>
          <div class="hall__row">
            <div v-if="schemaImage !== ''" class="info">
              <div class="info__title">Cхема зала</div>
              <div class="info__text">
                <div class="hall__schema">
                  <img :src="schemaImage" alt="schema" class="hall__poster-img">
                </div>
              </div>
            </div>

          </div>
          <div
              v-if="gallery.length !== 0"
              class="hall__row">
            <div class="hall__gallery">
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
      hall: { ukr: {}, rus: {}, halls: [] },
      searchingStatus: "searching",
      sourceRef: "cinemas/",
      schemaImage: "",
      topBannerImage: "",
      gallery: [],
    }
  },
  methods: {
    showSchemaImage() {
      let image = this.hall[this.lang].schemaImage;

      if(image === undefined || image === "") {
        this.schemaImage = "";
        return;
      }

      let ref = `${this.sourceRef}${image}`;
      database.getImageUrl(ref, url => {
        this.schemaImage = url;
      });
    },
    showTopBannerImage() {
      let image = this.hall[this.lang].topBannerImage;

      if(image === undefined || image === "") {
        this.topBannerImage = "";
        return;
      }

      let ref = `${this.sourceRef}${image}`;
      database.getImageUrl(ref, url => {
        this.topBannerImage = url;
      });
    },
    showGallery() {
      let images = this.hall[this.lang].gallery;
      this.gallery = [];

      if(images === undefined) {
        return;
      }

      for(let i = 0; i < images.length; i++) {
        this.gallery.push("");
        let item = images[i];
        let ref = `${this.sourceRef}${item.image}`;

        let number = i;
        database.getImageUrl(ref, url => {
          this.gallery[number] = url;
        });
      }
    },
    check(list, name) {
      for(let item of list) {
        if(item[this.lang].name === name) {
          return item;
        }
      }

      return null;
    },
    findHall(cinema) {
      let hallName = this.$route.params.hallName;

      if(cinema.halls === undefined) return null;

      return this.check(cinema.halls, hallName);
    },
    update() {
      let cinema = null;
      let cinemaName = this.$route.params.cinemaName;

      if(this.cinemas === null ) return;

      if(this.cinemas.list.length !== 0) {
        cinema = this.check(this.cinemas.list, cinemaName);
      }

      if(cinema !== null) {
        let hall = this.findHall(cinema);
        if(hall !== null) {
          this.hall = hall;
          this.searchingStatus = "found";
          this.showSchemaImage();
          this.showTopBannerImage();
          this.showGallery();
        } else {
          this.searchingStatus = "error";
        }
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
      this.showSchemaImage();
      this.showTopBannerImage();
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
.hall {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.hall__container {
  flex-grow: 1;
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 30px;
}

.hall__background {
  width: 100%;
  max-height: 580px;
  overflow: hidden;
}

.hall__background-img {
  width: 100%;
  padding-top: 51%;
  background-size: cover;
  background-position-x: 50%;
  background-position-y: 57%;
}

.hall__column {
  display: flex;
  flex-direction: column;
}

.hall__left {
  flex: 200px 0 0;
}

.hall__right {
  flex-grow: 1;
  margin-left: 50px;
}

.hall__row {
  display: flex;
  margin-top: 50px;
}

.hall__column .hall__row:first-child {
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

.hall__schema {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 500px;
  border-radius: 0.25rem;
}

.hall__poster-img {
  position: relative;
  //top: -20%;
  width: 100%;
  height: 100%;
}

.hall__description {
  flex: 63% 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hall__buy {
  margin-top: 20px;
  padding: 10px 25px;
  font-size: 18px;
  background-color: #1aca1a;
  border: black 1px solid;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.hall__buy:hover {
  background-color: #40f140;
}

.hall__name {
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

.hall__gallery {
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