<template>
  <div>
    <div class="card card-outline card-primary">
      <div class="card-header">
        <h3 class="card-title">Список текущих фильмов</h3>
      </div>
      <div class="card-body">
        <FilmBlock :key="item" :film="item" :sourceRef="sourceRef" v-for="item in films.current" @click="$emit('editFilm', item)" class="card-block card-body__item" />
        <button @click="$emit('addFilm', 'current')" class="btn btn-default card__add-block card-body__item">
          Добавить<br>фильм
        </button>
      </div>
      <div v-if="isLoading" class="overlay">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
    <div class="card card-outline card-primary">
      <div class="card-header">
        <h3 class="card-title">Список будущих релизов</h3>
      </div>
      <div class="card-body">
        <FilmBlock :key="item" :film="item" :sourceRef="sourceRef" v-for="item in films.soon" @click="$emit('editFilm', item)" class="card-block card-body__item" />
        <button @click="$emit('addFilm', 'soon')" class="btn btn-default card__add-block card-body__item">
          Добавить<br>фильм
        </button>
      </div>
      <div v-if="isLoading" class="overlay">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
</template>

<script>
import FilmBlock from './FilmBlock.vue';

export default {
  name: 'FilmsList',
  components: {
    FilmBlock
  },
  props: ["films", "sourceRef", "isLoading"],
}
</script>

<style lang="scss" scoped>
  .card-body {
    display: flex;
    flex-wrap: wrap;
    margin: -15px;
  }

  .card-block {
    padding: 15px;
    cursor: pointer;
    background-color: transparent;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
  }

  .card-block:hover {
    background-color: rgba(226, 226, 226, 0.788);
  }

  .card__add-block {
    width: 200px;
    height: 200px;
    margin: 15px;
  }
</style>