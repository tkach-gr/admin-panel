<template>
  <CinemaInfo
      v-for="item in edit[lang].list"
      :key="item"
      :page="item"
      :sourceRef="sourceRef"
  />
  <div class="controls">
    <button @click="addCinema" class="btn btn-default btn-save">Добавить кинотеатр</button>
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
  <div class="controls">
    <button @click="save" class="btn btn-default btn-save">Сохранить</button>
  </div>
</template>

<script>
import CinemaInfo from "./CinemaInfo";

export default {
  name: "ContactsPageEdit",
  props: ["sourceRef", "page"],
  components: {
    CinemaInfo
  },
  data() {
    return {
      edit: JSON.parse(JSON.stringify(this.page)),
      lang: "ukr"
    }
  },
  methods: {
    addCinema() {
      this.edit[this.lang].list.push({
        ukr: {},
        rus: {}
      });
    },
    save() {
      this.$emit("savePage", this.edit);
    }
  },
  mounted() {
    this.edit['rus'].list = this.edit['rus'].list || [];
    this.edit['ukr'].list = this.edit['ukr'].list || [];
  }
}
</script>

<style lang="scss" scoped>
.input-row {
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
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
</style>