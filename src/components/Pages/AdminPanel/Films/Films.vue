<template>
  <div class="films">
    <FilmsList
        ref="filmsList"
        v-if="!isEditing"
        :films="films"
        :isLoading="isLoading"
        :sourceRef="ref"
        @addFilm="addFilm"
        @editFilm="editFilm"
    />
    <FilmEdit
        v-else-if="isEditing"
        :film="editingFilm"
        :sourceRef="ref"
        @saveFilm="saveFilm"
    />
  </div>
</template>

<script>
import FilmsList from './FilmsList.vue';
import FilmEdit from './FilmEdit.vue';
import database from '@/scripts/database.js';
import DataUpdader from '@/scripts/DataUpdater.js';

export default {
  name: 'Films',
  components: {
    FilmsList,
    FilmEdit
  },
  data() {
    return {
      ref: "films/",
      isEditing: false,
      films: { 
        imagesCounter: 0,
        current: [], 
        soon: [] 
      },
      editingFilm: {},
      isLoading: true
    }
  },
  methods: {
    addFilm(category) {
      let film = {
        rus: { mainImage: "", name: "название фильма"},
        ukr: { mainImage: "", name: "название фильма"}
      }

      this.films.soon = this.films.soon || [];
      this.films[category].push(film);

      let films = this.films[category];
      let currentFilm = films[films.length - 1];
      this.editFilm(currentFilm);
    },
    editFilm(film) {
      this.editingFilm = film;
      this.isEditing = true;
    },
    saveFilm(film) {
      this.editingFilm.ukr = film.ukr;
      this.editingFilm.rus = film.rus;

      this.isEditing = false;
      this.save();
    },
    pushMainImages(array) {
      let mainImageIterator = (lang, item) => array.push({ 
        image: item[lang].mainImage,
        imageFile: item[lang].mainImageFile,
        changeImage: name => item[lang].mainImage = name
      });

      this.films.current.map(item => mainImageIterator("rus", item));
      this.films.current.map(item => mainImageIterator("ukr", item));
      this.films.soon.map(item => mainImageIterator("rus", item));
      this.films.soon.map(item => mainImageIterator("ukr", item));
    },
    pushGalleryImages(array) {
      let galleryIterator = (lang, film) => {
        if(film[lang].gallery === undefined) return;

        film[lang].gallery.map(item => array.push({
          image: item.image,
          imageFile: item.imageFile,
          changeImage: name => item.image = name
        }));
      };

      this.films.current.map(item => galleryIterator("rus", item));
      this.films.current.map(item => galleryIterator("ukr", item));
      this.films.soon.map(item => galleryIterator("rus", item));
      this.films.soon.map(item => galleryIterator("ukr", item));
    },
    save() {
      let handle = list => {
        let images = [];

        this.pushMainImages(images);
        this.pushGalleryImages(images);

        DataUpdader.handleImagesByCallback(images, list, this.ref, () => this.films.imagesCounter++);

        this.handleData();
      };
      
      database.getAllImagesAsync(this.ref, handle);
    },
    handleData() {
      database.writeData(this.ref, this.films);
    },
    updateBox(list) {
      if(list !== null) {
        this.films = list;
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
  .films {
  }
</style>
