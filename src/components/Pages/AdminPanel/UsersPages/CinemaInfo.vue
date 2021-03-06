<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Контакты театра</h3>
      <div class="custom-control custom-switch card__enabled">
        <input v-model="isEnabled" type="checkbox" class="custom-control-input" id="PageEnabled">
        <label class="custom-control-label" for="PageEnabled"></label>
      </div>
    </div>
    <div class="card-body">
      <div class="input-row">
        <div class="input-row__label">Название кинотеатра</div>
        <input v-model="page[lang].name" type="text" class="form-control" placeholder="Название кинотеатра">
      </div>
      <div class="input-row description">
        <div class="input-row__label">Адресс </div>
        <textarea v-model="page[lang].adress" class="form-control" placeholder="Адресс"></textarea>
      </div>
      <div class="input-row">
        <div class="input-row__label">Координаты для карты</div>
        <input v-model="page[lang].coords" type="text" class="form-control" placeholder="Координаты для карты">
      </div>
      <div class="input-row">
        <div class="input-row__label mt">Главная картинка </div>
        <ImageBlock
            v-if="lang === 'ukr'"
            :sourceRef="sourceRef"
            :image="page[lang].mainImage"
            @imageChanged="changeMainImage"
        />
        <ImageBlock
            v-else-if="lang === 'rus'"
            :sourceRef="sourceRef"
            :image="page[lang].mainImage"
            @imageChanged="changeMainImage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ImageBlock from "./ImageBlock";

export default {
  name: "CinemaInfo",
  props: ["sourceRef", "page"],
  components: {
    ImageBlock
  },
  data() {
    return {
      lang: "ukr",
      isEnabled: this.page.ukr.status === 'ВКЛ'
    }
  },
  methods: {
    changeMainImage(image, file = null) {
      if(image !== null) {
        this.page[this.lang].mainImage = image;
      } else {
        this.page[this.lang].mainImage = "";
      }

      this.page[this.lang].mainImageFile = file;
    },
    changeLang(lang) {
      this.lang = lang;

      this.$refs.ukrLang.classList.remove("selected");
      this.$refs.rusLang.classList.remove("selected");

      this.$refs[lang + "Lang"].classList.add("selected");
    }
  },
  watch: {
    isEnabled(newValue) {
      let changed;
      if(newValue === true) { changed = 'ВКЛ' }
      else { changed = 'ВЫКЛ' }

      this.page.ukr.status = changed;
    }
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

.card__enabled {
  margin: 0 30px;
}

.card__item.selected {
  background-color: #dde1e6;
}

.input-row {
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
}

.input-column .form-control {
  margin-top: 15px;
}

.input-column .form-control:first-child {
  margin-top: 0;
}

.description {
  margin-top: 30px;
}

.mt {
  margin-top: 11px;
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