<template>
  <div class="pages">
    <DataTable
      v-if="editingMode === 'none'"
      :list="pages.list"
      :settings="pagesTableSettings"
      :lang="'ukr'"
      @addItem="addPage"
      @editItem="editPage"
      @deleteItem="deletePage"
    />
    <CommonPageEdit
      v-else-if="editingMode === 'common'"
      :page="editingPage"
      :sourceRef="ref"
      @savePage="savePage"
    />
    <MainPageEdit
        v-else-if="editingMode === 'main'"
        :page="editingPage"
        :sourceRef="ref"
        @savePage="savePage"
    />
    <ContactsPageEdit
        v-else-if="editingMode === 'contacts'"
        :page="editingPage"
        :sourceRef="ref"
        @savePage="savePage"
    />
    <div v-if="isLoading" class="overlay">
      <i class="fas fa-2x fa-sync-alt fa-spin"></i>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import MainPageEdit from './MainPageEdit.vue';
import ContactsPageEdit from "./ContactsPageEdit";
import CommonPageEdit from './CommonPageEdit.vue';
import database from '@/scripts/database.js';
import DataUpdater from '@/scripts/DataUpdater.js';
import ImagesCollector from '@/scripts/ImagesCollector.js';
import InfoList from '@/scripts/ListManager.js';


let infoList = new InfoList();

export default {
  name: 'UsersPages',
  components: {
    DataTable,
    MainPageEdit,
    ContactsPageEdit,
    CommonPageEdit
  },
  data() {
    return {
      ref: "pages/",
      editingMode: "none",
      isLoading: true,
      pages: { 
        imagesCounter: 0,
        list: []
      },
      editingPage: {},
      pagesTableSettings: {
        title: "Список страниц",
        props: { 
          name: "Название", 
          creationDate: "Дата создания",
          status: "Статус"
        },
        hasEdit: true,
        hasDelete: true,
      }
    }
  },
  methods: {
    addPage() {
      let page = this.getNewPage("новая страница", "common", "ВЫКЛ");

      this.pages.list = this.pages.list || [];
      this.pages.list.push(page);

      this.save();
    },
    editPage(page) {
      this.editingPage = page;
      this.editingMode = page.ukr.page;
    },
    deletePage(page) {
      infoList.deleteItem(this.pages.list, page);
      this.save();
    },
    getNewPage(name, page, status, isDeletable = true) {
      return {
        rus: { name, page, creationDate: this.currentDate, status },
        ukr: { name, page, creationDate: this.currentDate, status },
        isDeletable
      };
    },
    addDefaultPages() {
      let defaults = [
        this.getNewPage("Главная страница", "main", "ВКЛ", false),
        this.getNewPage("О кинотеатре", "common", "ВКЛ", false),
        this.getNewPage("Кафе - Бар", "common", "ВКЛ", false),
        this.getNewPage("Vip - зал", "common", "ВКЛ", false),
        this.getNewPage("Реклама", "common", "ВКЛ", false),
        this.getNewPage("Детская комната", "common", "ВКЛ", false),
        this.getNewPage("Контакты", "contacts", "ВКЛ", false),
      ];

      defaults.map(item => this.pages.list.push(item));
    },
    savePage(page) {
      this.editingPage.ukr = page.ukr;
      this.editingPage.rus = page.rus;

      this.editingMode = "none";
      this.save();
    },
    save() {
      let handle = list => {
        let images = [];

        ImagesCollector.pushImages(this.pages.list, images, "mainImage");
        ImagesCollector.pushInnerImages(this.pages.list, "gallery", images, "image");

        this.pages.list.map(item => {
          if(item["ukr"].page !== "contacts") { return; }
          item["ukr"].list.map(subitem => images.push({
            image: subitem["ukr"]["mainImage"],
            imageFile: subitem["ukr"]["mainImageFile"],
            changeImage: name => subitem["ukr"]["mainImage"] = name
          }));
        });

        DataUpdater.handleImagesByCallback(images, list, this.ref, () => this.pages.imagesCounter++);

        this.handleData();
      };
      
      database.getAllImagesAsync(this.ref, handle);
    },
    handleData() {
      database.writeData(this.ref, this.pages);
    },
    updateBox(list) {
      if(list !== null) {
        this.pages = list;
      }

      if(this.pages.list.length < 7) {
        this.addDefaultPages();
        this.save();
      }

      this.isLoading = false;
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
    database.listenData(this.ref, this.updateBox.bind(this));
  }
}
</script>

<style lang="scss" scoped>
.pages {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(145, 145, 145, 0.178);
  z-index: 10;
}

.fas {
  position: absolute !important;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  width: 50px;
  height: 50px;
}
</style>
