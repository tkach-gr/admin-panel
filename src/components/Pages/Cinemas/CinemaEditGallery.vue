<template>
  <div class="gallery">
    <CinemaEditGalleryItem :key="item" :sourceRef="sourceRef" :data="item"
      v-on:remove="list.splice(index, 1)" v-for="(item, index) in list"
      class="card__block" />
    <button @click="addItem()" class="btn btn-default card__add-block">Добавить<br>фото</button>
  </div>
  
</template>

<script>
import CinemaEditGalleryItem from './CinemaEditGalleryItem.vue';

export default {
  name: 'CinemaEditGallery',
  props: ["sourceRef", "list"],
  components: {
    CinemaEditGalleryItem
  },
  methods: {
    addItem() {
      this.list.push({});
    },
    // updateBox(list) {
    //   if(list !== null) {
    //     this.list = list;
    //   }
    // }
  },
  created() {
    // database.listenData(this.ref, this.updateBox.bind(this));
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
