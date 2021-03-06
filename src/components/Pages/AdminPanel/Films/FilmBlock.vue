<template>
  <div class="film">
    <img :src="image" class="film__image">
    <div class="film__name">{{film.ukr.name}}</div>
  </div>
</template>

<script>
import database from '@/scripts/database.js'

export default {
  name: 'FilmBlock',
  props: ['film', 'sourceRef'],
  data() {
    return {
      image: ""
    }
  },
  watch: {
    film(newFilm) {
      database.getImageUrl(
        this.sourceRef + newFilm.ukr.mainImage, 
        url => this.image = url
      );
    }
  },
  mounted() {
    if(this.film.ukr.mainImage !== "") {
      database.getImageUrl(
        this.sourceRef + this.film.ukr.mainImage, 
        url => this.image = url
      );
    }  
  }
}
</script>

<style lang="scss" scoped>
.film {
  display: flex;
  flex-direction: column;
  max-width: 230px;
}

.film__image {
  width: 200px;
  height: 200px;
  background: #007BFF;
  border-radius: 0.25rem;
}

.film__name {
  margin-top: 15px;
}
</style>
