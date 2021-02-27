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
        <div class="input-column">
          <input v-model="edit[lang].name" type="text" class="form-control" placeholder="Название кинотеатра">
        </div>
      </div>
      <div class="input-row description">
        <div class="input-row__label">Адресс </div>
        <textarea v-model="edit[lang].adress" class="form-control" placeholder="Адресс"></textarea>
      </div>
    </div>
    <div class="input-row">
      <div class="input-row__label">Координаты для карты</div>
      <div class="input-column">
        <input v-model="edit[lang].coords" type="text" class="form-control" placeholder="Координаты для карты">
      </div>
    </div>
    <div class="input-row">
      <div class="input-row__label mt">Главная картинка </div>
      <ImageBlock
          v-if="lang === 'ukr'"
          :sourceRef="sourceRef"
          :image="edit[lang].mainImage"
          @imageChanged="changeMainImage"
      />
      <ImageBlock
          v-else-if="lang === 'rus'"
          :sourceRef="sourceRef"
          :image="edit[lang].mainImage"
          @imageChanged="changeMainImage"
      />
    </div>
  </div>
</template>

<script>
import ImageBlock from "@/components/Pages/UsersPages/ImageBlock";

export default {
  name: "CinemaInfo",
  props: ["sourceRef", "page"],
  components: {
    ImageBlock
  },
  data() {
    return {
      edit: JSON.parse(JSON.stringify(this.page)),
      lang: "ukr",
      isEnabled: this.page.ukr.status === 'ВКЛ'
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
    }
  },
  watch: {
    isEnabled(newValue) {
      let changed;
      if(newValue === true) { changed = 'ВКЛ' }
      else { changed = 'ВЫКЛ' }

      this.edit.ukr.status = changed;
      this.edit.rus.status = changed;
    }
  }
}
</script>