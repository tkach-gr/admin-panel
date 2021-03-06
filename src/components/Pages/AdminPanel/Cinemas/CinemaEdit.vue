<template>
  <div>
  <div v-if="isEditHall === false" class="card">
    <div class="card-header">
      <h3 class="card-title">Редактирование кинотеатра</h3>
      <div class="card__menu btn-group">
        <div ref="ukrLang" @click="changeLang('ukr')" class="card__item btn btn-default selected">Украинский</div>
        <div ref="rusLang" @click="changeLang('rus')" class="card__item btn btn-default">Русский</div>
      </div>
    </div>
    <div class="card-body">
      <div class="input-row">
        <div class="input-row__label">Навание кинотеатра</div>
        <input v-model="edit[lang].name" type="text" class="form-control" placeholder="Название кинотеатра">
      </div>
      <div class="input-row">
        <div class="input-row__label">Описание </div>
        <textarea v-model="edit[lang].text" class="form-control" placeholder="Описание"></textarea>
      </div>
      <div class="input-row">
        <div class="input-row__label">Условия </div>
        <textarea v-model="edit[lang].conditions" class="form-control" placeholder="Условия"></textarea>
      </div>
      <div class="input-row">
        <div class="input-row__label">Логотип </div>
        <ImageBlock
            v-if="lang === 'ukr'"
            :sourceRef="sourceRef"
            :image="edit[lang].logoImage"
            :file="edit[lang].logoImageFile"
            @imageChanged="changeLogoImage"
        />
        <ImageBlock
            v-else-if="lang === 'rus'"
            :sourceRef="sourceRef"
            :image="edit[lang].logoImage"
            :file="edit[lang].logoImageFile"
            @imageChanged="changeLogoImage"
        />
      </div>
      <div class="input-row">
        <div class="input-row__label mt">Фото верхнего баннера </div>
        <ImageBlock
            v-if="lang === 'ukr'"
            :sourceRef="sourceRef"
            :image="edit[lang].mainImage"
            :file="edit[lang].mainImageFile"
            @imageChanged="changeMainImage"
        />
        <ImageBlock
            v-else-if="lang === 'rus'"
            :sourceRef="sourceRef"
            :image="edit[lang].mainImage"
            :file="edit[lang].mainImageFile"
            @imageChanged="changeMainImage"
        />
      </div>
      <div class="input-row gallery">
        <div class="input-row__label gallery__title">Галлерея картинок<br>Размер: 1000x420</div>
        <Gallery v-if="lang === 'ukr'" :sourceRef="sourceRef" :list="edit[lang].gallery" />
        <Gallery v-else-if="lang === 'rus'" :sourceRef="sourceRef" :list="edit[lang].gallery" />
      </div>
      <div class="input-row">
        <DataTable
            :settings="hallsTableSettings"
            :list="edit.halls"
            :lang="lang"
            @addItem="addHall"
            @editItem="editHall"
            @deleteItem="deleteHall"
        />
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
    <HallEdit v-if="isEditHall" :hall="editingHall" :sourceRef="sourceRef" @saveHall="saveHall" />
  </div>
</template>

<script>
import ImageBlock from './ImageBlock.vue';
import Gallery from './Gallery.vue';
import HallEdit from './HallEdit.vue';
import DataTable from '@/components/Pages/AdminPanel/DataTable.vue';
import InfoList from '@/scripts/ListManager.js';

let infoList = new InfoList();

export default {
  name: "CinemaEdit",
  props: ["sourceRef", "cinema"],
  components: {
    ImageBlock,
    Gallery,
    HallEdit,
    DataTable,
  },
  data() {
    return {
      edit: JSON.parse(JSON.stringify(this.cinema)),
      lang: "ukr",
      isEditHall: false,
      editingHall: {},
      hallsTableSettings: {
        title: "Список залов",
        props: { 
          name: "Название зала", 
          creationDate: "Дата создания"
        },
        hasEdit: true,
        hasDelete: true,
      }
    }
  },
  methods: {
    changeLogoImage(image, file = null) {
      if(image !== null) {
        this.edit[this.lang].logoImage = image;
      } else {
        this.edit[this.lang].logoImage = ""; 
      }
      
      this.edit[this.lang].logoImageFile = file;
    },
    changeMainImage(image, file = null) {
      if(image !== null) {
        this.edit[this.lang].mainImage = image;
      } else {
        this.edit[this.lang].mainImage = ""; 
      }
      
      this.edit[this.lang].mainImageFile = file;
    },
    addHall() {
      let hall = {
        ukr: {
          name:"Новый зал(укр)",
          schemaImage: "",
          topBannerImage: "",
          creationDate: this.currentDate
        },
        rus: {
          name:"Новый зал(рус)",
          schemaImage: "",
          topBannerImage: "",
          creationDate: this.currentDate
        },
      };

      if(this.edit.halls.length === 0) { hall.isDeletable = false; }

      this.edit.halls.push(hall);

      let hallsList = this.edit.halls;
      let editingHall = hallsList[hallsList.length - 1];
      this.editHall(editingHall);
    },
    editHall(hall) {
      this.editingHall = hall;
      this.isEditHall = true;
    },
    deleteHall(hall) {
      infoList.deleteItem(this.edit.halls, hall);
    },
    changeLang(lang) {
      this.lang = lang;

      this.$refs.ukrLang.classList.remove("selected");
      this.$refs.rusLang.classList.remove("selected");

      this.$refs[lang + "Lang"].classList.add("selected");
    },
    saveHall(hall) {
      this.isEditHall = false;
      this.editingHall.ukr = hall.ukr;
      this.editingHall.rus = hall.rus;
      //
      // this.cinema.halls = this.edit.halls;
      // this.$emit("saveHall");
    },
    save() {
      this.$emit("saveCinema", this.edit);
    },
    returnDefault() {
      this.edit = this.cinema;
    }
  },
  computed: {
    currentDate() {
      let date = new Date();
      let month = date.getMonth();
      month = month.toString().length === 1 ? "0" + month : month;

      return `${date.getDate()}.${month}.${date.getFullYear()}`;
    }
  },
  mounted() {
    this.edit.rus.gallery = this.edit.rus.gallery || [];
    this.edit.ukr.gallery = this.edit.ukr.gallery || [];

    this.edit.halls = this.edit.halls || [];
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