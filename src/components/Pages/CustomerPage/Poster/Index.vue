<template>
  <div class="poster">
    <div class="poster__container">
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
    </div>
  </div>
</template>

<script>
import FilmCard from "./FilmCard";

export default {
  name: "Poster",
  props: ["films", "lang"],
  components: {
    FilmCard
  },
}
</script>

<style lang="scss" scoped>
.poster {
  display: flex;
  justify-content: center;
}

.poster__container {
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
</style>