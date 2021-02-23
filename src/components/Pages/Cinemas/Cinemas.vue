<template>
  <div class="cinemas">
    <CinemasList ref="cinemasList" v-if="!isEditing" :cinemas="cinemas" :isLoading="isLoading" :sourceRef="ref" @addCinema="addCinema" @editCinema="editCinema" />
    <CinemaEdit v-else-if="isEditing" :cinema="editingCinema" :sourceRef="ref" @saveCinema="saveCinema" />
  </div>
</template>

<script>
import CinemasList from './CinemasList.vue';
import CinemaEdit from './CinemaEdit.vue';
import database from '@/scripts/database.js';
import DataUpdader from '@/scripts/DataUpdater.js';

export default {
  name: 'Cinemas',
  components: {
    CinemasList,
    CinemaEdit
  },
  data() {
    return {
      ref: "cinemas/",
      isEditing: false,
      cinemas: { 
        imagesCounter: 0,
        list: []
      },
      editingCinema: {},
      isLoading: true
    }
  },
  methods: {
    addCinema() {
      let cinema = {
        rus: { mainImage: "", name: "название кинотеатра"},
        ukr: { mainImage: "", name: "название кинотеатра"}
      }

      this.cinemas.list = this.cinemas.list || [];
      this.cinemas.list.push(cinema);

      this.save();
    },
    editCinema(cinema) {
      this.editingCinema = cinema;
      this.isEditing = true;
    },
    saveCinema(cinema) {
      this.editingCinema.ukr = cinema.ukr;
      this.editingCinema.rus = cinema.rus;

      this.isEditing = false;
      console.log(this.cinemas);
      this.save();
    },
    pushLogoImages(array) {
      let logoImageIterator = (lang, item) => array.push({ 
        image: item[lang].logoImage,
        imageFile: item[lang].logoImageFile,
        changeImage: name => item[lang].logoImage = name
      });

      this.cinemas.list.map(item => logoImageIterator("rus", item));
      this.cinemas.list.map(item => logoImageIterator("ukr", item));
    },
    pushMainImages(array) {
      let mainImageIterator = (lang, item) => array.push({ 
        image: item[lang].mainImage,
        imageFile: item[lang].mainImageFile,
        changeImage: name => item[lang].mainImage = name
      });

      this.cinemas.list.map(item => mainImageIterator("rus", item));
      this.cinemas.list.map(item => mainImageIterator("ukr", item));
    },
    pushGalleryImages(array) {
      let galleryIterator = (lang, cinema) => {
        if(cinema[lang].gallery === undefined) return;

        cinema[lang].gallery.map(item => array.push({
          image: item.image,
          imageFile: item.imageFile,
          changeImage: name => item.image = name
        }));
      };

      this.cinemas.list.map(item => galleryIterator("rus", item));
      this.cinemas.list.map(item => galleryIterator("ukr", item));
    },
    save() {
      let handle = list => {
        let images = [];

        this.pushLogoImages(images);
        this.pushMainImages(images);
        this.pushGalleryImages(images);

        DataUpdader.handleImagesByCallback(images, list, this.ref, () => this.cinemas.imagesCounter++);

        this.handleData();
      };
      
      database.getAllImagesAsync(this.ref, handle);
    },
    handleData() {
      database.writeData(this.ref, this.cinemas);
    },
    updateBox(list) {
      if(list !== null) {
        this.cinemas = list;
      }

      this.isLoading = false;
    }
  },
  created() {
    database.listenData(this.ref, this.updateBox.bind(this));
  }
}
</script>

<style lang="scss" scoped>
  .cinemas {
  }
</style>
