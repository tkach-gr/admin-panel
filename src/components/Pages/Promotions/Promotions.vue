<template>
  <div class="promotions">
    <DataTable 
      v-if="!isEditing" 
      :list="promotions.list" 
      :settings="promotionsTableSettings" 
      :lang="'ukr'" 
      @addItem="addPromotion" 
      @editItem="editPromotion" 
      @deleteItem="deletePromotion" 
    />
    <PromotionEdit 
      v-else-if="isEditing" 
      :promotion="editingPromotion" 
      :sourceRef="ref" 
      @savePromotion="savePromotion" 
    />
    <div v-if="isLoading" class="overlay">
      <i class="fas fa-2x fa-sync-alt fa-spin"></i>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import PromotionEdit from './PromotionEdit.vue';
import database from '@/scripts/database.js';
import DataUpdader from '@/scripts/DataUpdater.js';
import ImagesCollector from '@/scripts/ImagesCollector.js';
import InfoList from '@/scripts/ListManager.js';

let infoList = new InfoList();

export default {
  name: 'Promotions',
  components: {
    DataTable,
    PromotionEdit
  },
  data() {
    return {
      ref: "promotions/",
      isEditing: false,
      isLoading: true,
      promotions: { 
        imagesCounter: 0,
        list: []
      },
      editingPromotion: {},
      promotionsTableSettings: {
        title: "Список акций",
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
    addPromotion() {
      let promotion = {
        rus: { name: "новая акция", creationDate: this.currentDate, status: "ВЫКЛ"},
        ukr: { name: "новая акция", creationDate: this.currentDate, status: "ВЫКЛ"},
      }

      this.promotions.list = this.promotions.list || [];
      this.promotions.list.push(promotion);

      this.save();
    },
    editPromotion(promotion) {
      this.editingPromotion = promotion;
      this.isEditing = true;
    },
    deletePromotion(promotion) {
      infoList.deleteItem(this.promotions.list, promotion);
      this.save();
    },
    savePromotion(promotion) {
      this.editingPromotion.ukr = promotion.ukr;
      this.editingPromotion.rus = promotion.rus;

      this.isEditing = false;
      this.save();
    },
    save() {
      let handle = list => {
        let images = [];

        ImagesCollector.pushImages(this.promotions.list, images, "mainImage");
        ImagesCollector.pushInnerImages(this.promotions.list, "gallery", images, "image");

        DataUpdader.handleImagesByCallback(images, list, this.ref, () => this.promotions.imagesCounter++);

        this.handleData();
      };
      
      database.getAllImagesAsync(this.ref, handle);
    },
    handleData() {
      database.writeData(this.ref, this.promotions);
    },
    updateBox(list) {
      if(list !== null) {
        this.promotions = list;
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
.promotions {
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
