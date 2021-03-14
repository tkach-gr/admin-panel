<template>
  <div class="soon">
    <div class="soon__container">
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
    </div>
  </div>

</template>

<script>
import FilmCard from "./FilmCard";

export default {
  name: "Main",
  props: ["films", "lang"],
  components: {
    FilmCard
  },
}
</script>

<style lang="scss" scoped>
.soon {
  display: flex;
  justify-content: center;
}

.soon__container {
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