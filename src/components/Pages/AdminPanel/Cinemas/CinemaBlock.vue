<template>
  <div class="cinema">
    <div class="cinema__container">
      <div v-if="index !== 0" @click="$emit('delete')" class="btn btn-default cinema__delete">
        <svg class="ciname__delete-img" viewBox="0 0 8 8">
          <path d="M1.406 0l-1.406 1.406.688.719 1.781 1.781-1.781 1.781-.688.719 1.406 1.406.719-.688 1.781-1.781 1.781 1.781.719.688 1.406-1.406-.688-.719-1.781-1.781 1.781-1.781.688-.719-1.406-1.406-.719.688-1.781 1.781-1.781-1.781-.719-.688z" id="x" fill="rgba(0,0,0,0.7)"></path>
        </svg>
      </div>
      <div @click="$emit('editCinema')" class="cinema__info">
        <img :src="image" class="cinema__image">
        <div class="cinema__name">{{cinema.ukr.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import database from '@/scripts/database.js'

export default {
  name: 'CinemaBlock',
  props: ['cinema', 'sourceRef', 'index'],
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
  max-width: 230px;
}

.cinema__container {
  position: relative;
  display: flex;
  flex-direction: column;
}

.cinema__info {
  position: relative;
  display: flex;
  flex-direction: column;
}

.cinema__image {
  width: 200px;
  height: 200px;
  background: #007BFF;
  border-radius: 0.25rem;
}

.cinema__delete {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  padding: 2px;
  z-index: 10;
}

.ciname__delete-img {
  width: 100%;
  height: 100%;
}

.cinema__name {
  margin-top: 15px;
}
</style>
