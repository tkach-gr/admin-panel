<template>
  <div class="news">
    <DataTable 
      v-if="!isEditing" 
      :list="news.list" 
      :settings="newsTableSettings" 
      :lang="'ukr'" 
      @addItem="addNews"
      @editItem="editNews"
      @deleteItem="deleteNews" 
    />
    <NewsEdit 
      v-else-if="isEditing" 
      :news="editingNews" 
      :sourceRef="ref" 
      @saveNews="saveNews" 
    />
    <div v-if="isLoading" class="overlay">
      <i class="fas fa-2x fa-sync-alt fa-spin"></i>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/Pages/AdminPanel/DataTable.vue';
import NewsEdit from './NewsEdit.vue';
import database from '@/scripts/database.js';
import DataUpdader from '@/scripts/DataUpdater.js';
import ImagesCollector from '@/scripts/ImagesCollector.js';
import InfoList from '@/scripts/ListManager.js';

let infoList = new InfoList();

export default {
  name: 'News',
  components: {
    DataTable,
    NewsEdit
  },
  data() {
    return {
      ref: "news/",
      isEditing: false,
      isLoading: true,
      news: { 
        imagesCounter: 0,
        list: []
      },
      editingNews: {},
      newsTableSettings: {
        title: "Список новостей",
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
    addNews() {
      let news = {
        rus: {
          name: "новая новость",
          mainImage: "",
          creationDate: this.currentDate,
          status: "ВЫКЛ"
        },
        ukr: {
          name: "новая новость",
          mainImage: "",
          creationDate: this.currentDate,
          status: "ВЫКЛ"
        },
      }

      this.news.list = this.news.list || [];
      this.news.list.push(news);

      let newsList = this.news.list;
      let lastNews = newsList[newsList.length - 1];
      this.editNews(lastNews);
    },
    editNews(news) {
      this.editingNews = news;
      this.isEditing = true;
    },
    deleteNews(news) {
      infoList.deleteItem(this.news.list, news);
      this.save();
    },
    saveNews(news) {
      this.editingNews.ukr = news.ukr;
      this.editingNews.rus = news.rus;

      this.isEditing = false;
      this.save();
    },
    save() {
      let handle = list => {
        let images = [];

        ImagesCollector.pushImages(this.news.list, images, "mainImage");
        ImagesCollector.pushInnerImages(this.news.list, "gallery", images, "image");

        DataUpdader.handleImagesByCallback(images, list, this.ref, () => this.news.imagesCounter++);

        this.handleData();
      };
      
      database.getAllImagesAsync(this.ref, handle);
    },
    handleData() {
      database.writeData(this.ref, this.news);
    },
    updateBox(list) {
      if(list !== null) {
        this.news = list;
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
.news {
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
