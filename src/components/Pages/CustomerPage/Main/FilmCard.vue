<template>
  <div class="film">
    <div class="film__img-container">
      <img ref="imgPreview" alt="film" class="film__img">
    </div>
    <div class="film__name">{{ film[lang].name }}</div>
    <div v-if="isAvailable" class="film__buy">Купить билет</div>
  </div>
</template>

<script>
import database from "@/scripts/database.js";

export default {
  name: "FilmCard",
  props: ["film", "lang", "isAvailable"],
  methods: {
    updateImage() {
      database.getImageUrl(`films/${this.film[this.lang].mainImage}`, url => {
        if(this.$refs.imgPreview !== undefined) {
          this.$refs.imgPreview.src = url;
        }
      });
    }
  },
  watch: {
    lang() {
      this.updateImage();
    }
  },
  mounted() {
    this.updateImage();
  }
};
</script>

<style lang="scss" scoped>
.film {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
}

.film__img-container {
  width: 270px;
  height: 405px;
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: #007BFF;
  color:white;
}

.film__img {
  width: 100%;
  height: 100%;
}

.film__name {
  font-size: 18px;
  font-weight: 600;
  margin-top: 6px;
}

.film__buy {
  margin-top: 10px;
  padding: 4px 15px;
  color: black;
  border: black 1px solid;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.film__buy:hover {
  background-color: #d6d6d6;
}
</style>