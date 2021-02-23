<template>
  <div class="cinema">
    <img :src="image" class="cinema__image">
    <div class="cinema__name">{{cinema.ukr.name}}</div>
  </div>
</template>

<script>
import database from '@/scripts/database.js'

export default {
  name: 'CinemaBlock',
  props: ['cinema', 'sourceRef'],
  data() {
    return {
      image: ""
    }
  },
  watch: {
    cinema(newCinema) {
      database.getImageUrl(
        this.sourceRef + newCinema.ukr.mainImage, 
        url => this.image = url
      );
    }
  },
  mounted() {
    if(this.cinema.ukr.mainImage !== "") {
      database.getImageUrl(
        this.sourceRef + this.cinema.ukr.mainImage, 
        url => this.image = url
      );
    }  
  }
}
</script>

<style lang="scss" scoped>
.cinema {
  display: flex;
  flex-direction: column;
  max-width: 230px;
}

.cinema__image {
  width: 200px;
  height: 200px;
  background: #007BFF;
  border-radius: 0.25rem;
}

.cinema__name {
  margin-top: 15px;
}
</style>
