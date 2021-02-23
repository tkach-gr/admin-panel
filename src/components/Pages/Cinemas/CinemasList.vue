<template>
    <div class="card card-outline card-primary">
      <div class="card-header">
        <h3 class="card-title">Список кинотеатров</h3>
      </div>
      <div class="card-body">
        <CinemaBlock :key="item" :cinema="item" :sourceRef="sourceRef" v-for="item in cinemas.list" @click="$emit('editCinema', item)" class="card-block card-body__item" />
        <button @click="$emit('addCinema', 'current')" class="btn btn-default card__add-block card-body__item">
          Добавить<br>кинотеатр
        </button>
      </div>
      <div v-if="isLoading" class="overlay">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
</template>

<script>
import CinemaBlock from './CinemaBlock.vue';

export default {
  name: 'CinemasList',
  components: {
    CinemaBlock
  },
  props: ["cinemas", "sourceRef", "isLoading"],
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