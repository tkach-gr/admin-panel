<template>
  <div class="gallery">
    <FilmEditGalleryItem :key="item" :sourceRef="sourceRef" :data="item"
      v-on:remove="list.splice(index, 1)" v-for="(item, index) in list"
      class="card__block" />
    <button @click="openFileDialog" class="btn btn-default card__add-block">
      <input ref="fileDialog" @change="saveImage" onclick="this.value=null;" style="display: none;" type="file">
      Добавить<br>фото
    </button>
  </div>
  
</template>

<script>
import FilmEditGalleryItem from './FilmEditGalleryItem.vue';

export default {
  name: 'FilmEditGallery',
  props: ["sourceRef", "list"],
  components: {
    FilmEditGalleryItem
  },
  methods: {
    openFileDialog() {
      this.$refs.fileDialog.click();
    },
    saveImage() {
      const file = this.$refs.fileDialog.files[0];
      if(file !== undefined) {
        this.list.push({
          image: null,
          imageFile: this.$refs.fileDialog.files[0],
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.gallery {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
}

.card__block {
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
}

.card__add-block {
  margin: 30px 48px 10px 48px;
}
</style>
