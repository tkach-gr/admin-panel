<template>
  <div class="cinemas">
    <CinemasList ref="cinemasList" v-if="!isEditing" :cinemas="cinemas" :isLoading="isLoading" :sourceRef="ref" @addCinema="addCinema" @editCinema="editCinema" @deleteCinema="deleteCinema" />
    <CinemaEdit v-else-if="isEditing" :cinema="editingCinema" :sourceRef="ref" @saveCinema="saveCinema" @saveHall="saveHall" />
  </div>
</template>

<script>
import CinemasList from './CinemasList.vue';
import CinemaEdit from './CinemaEdit.vue';
import database from '@/scripts/database.js';
import DataUpdader from '@/scripts/DataUpdater.js';
import InfoList from '@/scripts/ListManager.js';

let infoList = new InfoList();

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
        rus: { mainImage: "", logoImage: "", name: "название кинотеатра"},
        ukr: { mainImage: "", logoImage: "", name: "название кинотеатра"}
      }

      this.cinemas.list = this.cinemas.list || [];
      this.cinemas.list.push(cinema);

      let list = this.cinemas.list;
      let currentCinema = list[list.length - 1];
      this.editCinema(currentCinema);
    },
    editCinema(cinema) {
      this.editingCinema = cinema;
      this.isEditing = true;
    },
    deleteCinema(cinema) {
      infoList.deleteItem(this.cinemas.list, cinema);
      this.save();
    },
    saveHall() {
      this.save();
    },
    saveCinema(cinema) {
      this.editingCinema.ukr = cinema.ukr;
      this.editingCinema.rus = cinema.rus;
      this.editingCinema.halls = cinema.halls;

      this.isEditing = false;
      this.save();
    },
    pushInnerImages(source, containerKey, array, propName) {
      if(source === undefined) return;

      let iterator = (lang, item) => {
        if(item[lang][containerKey] === undefined) return;

        item[lang].gallery.map(subitem => array.push({
          image: subitem[propName],
          imageFile: subitem[propName + "File"],
          changeImage: name => subitem[propName] = name
        }));
      };

      source.map(item => iterator("rus", item));
      source.map(item => iterator("ukr", item));
    },
    pushImages(source, array, propName) {
      if(source === undefined) return;

      let iterator = (lang, item) => array.push({ 
        image: item[lang][propName],
        imageFile: item[lang][propName + "File"],
        changeImage: name => item[lang][propName] = name
      });

      source.map(item => iterator("rus", item));
      source.map(item => iterator("ukr", item));
    },
    save() {
      let handle = list => {
        let images = [];

        this.pushImages(this.cinemas.list, images, "logoImage");
        this.pushImages(this.cinemas.list, images, "mainImage");
        this.pushInnerImages(this.cinemas.list, "gallery", images, "image");

        this.cinemas.list.map(item => this.pushImages(item.halls, images, "schemaImage"));
        this.cinemas.list.map(item => this.pushImages(item.halls, images, "topBannerImage"));
        this.cinemas.list.map(item => this.pushInnerImages(item.halls, "gallery", images, "image"));

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
