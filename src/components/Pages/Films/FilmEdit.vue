<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Редактирование фильма</h3>
      <div class="card__menu btn-group">
        <div ref="ukrLang" @click="changeLang('ukr')" class="card__item btn btn-default selected">Украинский</div>
        <div ref="rusLang" @click="changeLang('rus')" class="card__item btn btn-default">Русский</div>
      </div>
    </div>
    <div class="card-body">
      <div class="input-row">
        <div class="input-row__label">Навание фильма </div>
        <input v-model="edit[lang].name" type="text" class="form-control" placeholder="Название фильма">
      </div>
      <div class="input-row">
        <div class="input-row__label">Описание </div>
        <textarea v-model="edit[lang].text" class="form-control" placeholder="Текст"></textarea>
      </div>
      <div class="input-row">
        <div class="input-row__label">Главная картинка </div>
        <FilmMainImageBlock v-if="lang === 'ukr'" :sourceRef="sourceRef" :image="edit[lang].mainImage" @imageChanged="changeMainImage" />
        <FilmMainImageBlock v-else-if="lang === 'rus'" :sourceRef="sourceRef" :image="edit[lang].mainImage" @imageChanged="changeMainImage" />
      </div>
      <div class="input-row gallery">
        <div class="input-row__label gallery__title">Галлерея картинок<br>Размер: 1000x190</div>
        <FilmEditGallery v-if="lang === 'ukr'" :sourceRef="sourceRef" :list="edit[lang].gallery" />
        <FilmEditGallery v-else-if="lang === 'rus'" :sourceRef="sourceRef" :list="edit[lang].gallery" />
      </div>
      <div class="input-row">
        <div class="input-row__label">Ссылка на трейлер </div>
        <input v-model="edit[lang].trailer" type="text" class="form-control" placeholder="Ссылка на видео в youtube">
      </div>
      <div class="input-row">
        <div class="input-row__label">Тип кино </div>
        <div class="checkbox-list">
          <div class="checkbox-list__group">
            <input v-model="edit[lang].has3d" id="film3dCheck" type="checkbox" class="form-control checkbox-list__input" placeholder="Ссылка на видео в youtube">
            <label for="film3dCheck" class="checkbox-list__label">3D</label>
          </div>
          <div class="checkbox-list__group">
            <input v-model="edit[lang].has2d" id="film2dCheck" type="checkbox" class="form-control checkbox-list__input" placeholder="Ссылка на видео в youtube">
            <label for="film2dCheck" class="checkbox-list__label">2D</label>
          </div>
          <div class="checkbox-list__group">
            <input v-model="edit[lang].hasImax" id="filmImaxCheck" type="checkbox" class="form-control checkbox-list__input" placeholder="Ссылка на видео в youtube">
            <label for="filmImaxCheck" class="checkbox-list__label">IMAX</label>
          </div>
        </div>
      </div>
      <div class="seo">
        <div class="seo__title">SEO блок </div>
        <div class="seo__body">
          <div class="input-row">
            <div class="input-row__label">URL </div>
            <input v-model="edit[lang].seoUrl" type="text" class="form-control" placeholder="URL">
          </div>
          <div class="input-row">
            <div class="input-row__label">Title </div>
            <input v-model="edit[lang].seoTitle" type="text" class="form-control" placeholder="Title">
          </div>
          <div class="input-row">
            <div class="input-row__label">Keywords </div>
            <input v-model="edit[lang].seoKeywords" type="text" class="form-control" placeholder="word">
          </div>
          <div class="input-row">
            <div class="input-row__label">Description </div>
            <input v-model="edit[lang].seoDescription" type="text" class="form-control" placeholder="Description">
          </div>
        </div>
      </div>
    </div>
    <div class="controls">
      <button @click="save" class="btn btn-default btn-save">Сохранить</button>
      <button @click="returnDefault" class="btn btn-default btn-return">Вернуть базовую версию</button>
    </div>
  </div>
</template>

<script>
import FilmMainImageBlock from './FilmMainImageBlock.vue';
import FilmEditGallery from './FilmEditGallery.vue';

export default {
  name: "FilmEdit",
  props: ["sourceRef", "film"],
  components: {
    FilmMainImageBlock,
    FilmEditGallery
  },
  data() {
    return {
      edit: JSON.parse(JSON.stringify(this.film)),
      lang: "ukr"
    }
  },
  methods: {
    changeMainImage(image, file = null) {
      if(image !== null) {
        this.edit[this.lang].mainImage = image;
      } else {
        this.edit[this.lang].mainImage = ""; 
      }
      
      this.edit[this.lang].mainImageFile = file;
    },
    changeLang(lang) {
      this.lang = lang;

      this.$refs.ukrLang.classList.remove("selected");
      this.$refs.rusLang.classList.remove("selected");

      this.$refs[lang + "Lang"].classList.add("selected");
    },
    save() {
      this.$emit("saveFilm", this.edit);
    },
    returnDefault() {
      this.edit = this.film;
    }
  },
  mounted() {
    this.edit.rus.gallery = this.edit.rus.gallery || [];
    this.edit.ukr.gallery = this.edit.ukr.gallery || [];
  }
}
</script>

<style lang="scss" scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-title {
    flex: 200px 1 1;
    display: flex;
    justify-content: flex-start;
  }

  .card__item.selected {
    background-color: #dde1e6;
  }

  .input-row {
    display: flex;
    align-items: flex-start;
    margin-top: 15px;
  }

  .gallery {
    margin-bottom: 45px
  }

  .gallery__title {
    margin-top: 30px;
  }

  .seo {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
  }

  .seo__title {
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    width: 160px;
  }

  .seo__body {
    margin: 0 auto;
    width: 100%;
    max-width: 700px;
  }

  .input-row__label {
    flex: 160px 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 160px;
    margin-right: 15px;
    height: 38px;
  }

  .checkbox-list {
    display: flex;
    align-items: center;
    margin-left: -25px;
  }

  .checkbox-list__group {
    display: flex;
    align-items: center;
    margin-left: 50px;
  }

  .checkbox-list__label {
    margin-left: 10px;
    margin-bottom: 0;
    font-weight: normal !important;
  }

  .controls {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 42px;
  }

  .controls .btn {
    margin-left: 25px
  }
</style>