<template>
  <div class="main">
    <div class="main__container">
      <div class="list">
        <div class="list__title">Смотрите сегодня</div>
        <div class="list__container">
          <RouterLink
              v-for="(film, index) in films.current"
              :key="index"
              :to="`/films/current/${film.ukr.seoUrl}`"
          >
            <FilmCard
                :film="film"
                :lang="lang"
                :isAvailable="true"
                class="film"
            />
          </RouterLink>

        </div>
      </div>
      <div class="list">
        <div class="list__title">Смотрите скоро</div>
        <div class="list__container">
          <RouterLink
              v-for="(film, index) in films.soon"
              :key="index"
              :to="`/films/soon/${film.ukr.seoUrl}`"
          >
            <FilmCard
                :film="film"
                :lang="lang"
                :isAvailable="false"
                class="film"
            />
          </RouterLink>
        </div>
      </div>
      <div class="seo-text">
        {{ pages?.list[0].ukr.seoDescription }}
      </div>
    </div>
  </div>
</template>

<script>
import FilmCard from "./FilmCard";

export default {
  name: "Main",
  props: ["films", "pages", "lang"],
  components: {
    FilmCard
  },
}
</script>

<style lang="scss" scoped>
.main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.main__container {
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

.film {
  margin: 10px;
  color: black;
}

.seo-text {
  margin-top: 100px;
  text-align: center;
}
</style>