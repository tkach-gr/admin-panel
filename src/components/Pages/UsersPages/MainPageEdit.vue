<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Редактирование страницы</h3>
      <div class="custom-control custom-switch card__enabled">
        <input v-model="isEnabled" type="checkbox" class="custom-control-input" id="PageEnabled">
        <label class="custom-control-label" for="PageEnabled"></label>
      </div>
      <div class="card__menu btn-group">
        <div ref="ukrLang" @click="changeLang('ukr')" class="card__item btn btn-default selected">Украинский</div>
        <div ref="rusLang" @click="changeLang('rus')" class="card__item btn btn-default">Русский</div>
      </div>
    </div>
    <div class="card-body">
      <div class="input-row">
        <div class="input-row__label">Номер телефона</div>
        <div class="input-column">
          <input v-model="edit[lang].firstNumber" type="string" class="form-control" placeholder="Номер телефона">
          <input v-model="edit[lang].secondNumber" type="string" class="form-control" placeholder="Номер телефона">
        </div>
      </div>
      <div class="input-row description">
        <div class="input-row__label">Описание </div>
        <textarea v-model="edit[lang].text" class="form-control" placeholder="Описание"></textarea>
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
    </div>
  </div>
</template>

<script>
import ImageBlock from './ImageBlock.vue';
import Gallery from './Gallery.vue';
import DatePicker from '@/components/DatePicker.vue';

export default {
  name: "MainPageEdit",
  props: ["sourceRef", "page"],
  components: {
    ImageBlock,
    Gallery,
    DatePicker
  },
  data() {
    return {
      edit: JSON.parse(JSON.stringify(this.page)),
      lang: "ukr",
      isEnabled: this.page.ukr.status === 'ВКЛ'
    }
  },
  methods: {
    changeLang(lang) {
      this.lang = lang;

      this.$refs.ukrLang.classList.remove("selected");
      this.$refs.rusLang.classList.remove("selected");

      this.$refs[lang + "Lang"].classList.add("selected");
    },
    save() {
      this.$emit("savePage", this.edit);
    },
    returnDefault() {
      this.edit = this.page;
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