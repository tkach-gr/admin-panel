<template>
  <div class="page-container">
    <div v-show="searchingStatus === 'found'" class="film">
      <div class="film__container">
        <div v-if="film[lang].trailer !== undefined" class="player-container">
          <iframe
              class="player"
              type="text/html"
              :src="film[lang].trailer"
              frameborder="0"
          />
        </div>
        <div class="film__row">
          <div class="film__poster">
            <img ref="poster" alt="poster" class="film__poster-img">
          </div>
          <div class="film__description">
            <div class="film__buy">Купить билет</div>
            <div class="film__name">{{ film[lang].name }}</div>
            <div class="film__text">{{ film[lang].text }}</div>
          </div>
        </div>
        <div class="film__row">
          <div class="film__gallery">
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
    <div v-if="searchingStatus === 'searching'" class="searching">
      Поиск...
    </div>
    <div v-else-if="searchingStatus === 'error'" class="searching-error">
      Не удалось найти фильм
    </div>
  </div>
</template>

<script>
import database from "@/scripts/database.js";

export default {
  name: "Film",
  props: ["films", "lang"],
  data() {
    return {
      film: { ukr: {}, rus: {} },
      searchingStatus: "searching",
      sourceRef: "films/",
      gallery: [],
    }
  },
  methods: {
    showPoster() {
      let ref = `${this.sourceRef}${this.film[this.lang].mainImage}`;
      database.getImageUrl(ref, url => {
        this.$refs.poster.src = url;
      });
    },
    showGallery() {
      let images = this.film[this.lang].gallery;

      if(images === undefined) {
        this.gallery = [];
        return;
      }

      let temp = images.map(() => "");
      this.gallery = temp;

      for(let i = 0; i < images.length; i++) {
        let item = images[i];
        let ref = `${this.sourceRef}${item.image}`;

        let number = i;
        database.getImageUrl(ref, url => {
          this.gallery[number] = url;
        });
      }
    },
    check(category, url) {
      for(let item of this.films[category]) {
        if(item.ukr.seoUrl === url) {
         return item;
        }
      }

      return null;
    },
    update() {
      let film = null;
      let category = this.$route.params.category;
      let seoUrl = this.$route.params.seoUrl;

      if(category !== undefined && this.films.length !== 0) {
        if(category === "any") {
          film = this.check("current", seoUrl);

          if(film === null) {
            film = this.check("soon", seoUrl);
          }
        } else {
          film = this.check(category, seoUrl);
        }
      }

      if(film !== null) {
        this.film = film;
        this.searchingStatus = "found";
        this.showPoster();
        this.showGallery();
      } else if(this.films.length !== 0) {
        this.searchingStatus = "error";
      }
    }
  },
  watch: {
    films(newValue) {
      this.update();
    },
    lang() {
      this.showPoster();
      this.showGallery();
    }
  },
  created() {
    this.$watch(
        () => this.$route.params,
        (toParams, previousParams) => {
          this.update();
        }
    );

    let category = this.$route.params.category;
    if(category !== "any" && category !== "current" && category !== "soon") {
      this.$router.push("/");
    }
  },
  mounted() {
    this.update();
  }
};
</script>

<style lang="scss" scoped>
.film {
  display: flex;
  justify-content: center;
}

.film__container {
  flex-grow: 1;
  max-width: 1200px;
  padding: 30px;
}

.player-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.film__row {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.film__poster {
  position: relative;
  overflow: hidden;
  flex: 33% 0 0;
  border-radius: 0.25rem;
}

.film__poster-img {
  position: relative;
  //top: -20%;
  width: 100%;
  height: 100%;
}

.film__description {
  flex: 58% 0 0;
  display: flex;
  flex-direction: column;
}

.film__buy {
  margin: 0 auto;
  padding: 10px 25px;
  font-size: 18px;
  background-color: #1aca1a;
  border: black 1px solid;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.film__buy:hover {
  background-color: #40f140;
}

.film__name {
  font-size: 24px;
  text-align: center;
  margin-top: 30px;
}

.film__text {
  margin-top: 50px;
}

.film__gallery {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: -10px;
}

.slide {
  flex: 357px 0 0;
  border-radius: 0.25rem;
  overflow: hidden;
  margin: 10px;
}

.slide__img {
  width: 100%;
  padding-top: 42%;
  background-size: cover;
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