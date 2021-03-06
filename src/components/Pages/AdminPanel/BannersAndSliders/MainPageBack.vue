<template>
  <div class="card card-outline card-primary">
    <div class="card-header">
      <h3 class="card-title">Сквозной баннер на заднем фоне</h3>
    </div>
    <div class="card-body">
      <div class="card-body__top">
        <div class="card-body__item">Размер: 2000x3000</div>
      </div>
      <div class="card-body__center">
        <div class="form-group">
          <MainPageBackBlock
              v-if="isLoading !== true"
              ref="block"
              :sourceRef="ref"
              :image="image"
              @imageChanged="changeImage"
          />
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="overlay">
      <i class="fas fa-2x fa-sync-alt fa-spin"></i>
    </div>
  </div>
</template>

<script>
import MainPageBackBlock from './MainPageBackBlock.vue';
import database from '@/scripts/database.js';
import DataUpdader from '@/scripts/DataUpdater.js';

export default {
  name: 'MainPageBack',
  components: {
    MainPageBackBlock
  },
  data() {
    return {
      ref: "banners/mainBack/",
      imagesCounter: 0,
      isLoading: true,
      background: "with",
      image: ""
    }
  },
  methods: {
    save() {
      let handle = list => {
        this.imageFile = this.$refs.block.imageFile;

        DataUpdader.handleImages([ this ], list, this.ref, () => this.imagesCounter++);
        this.handleData();
      };
      
      database.getAllImagesAsync(this.ref, handle);
    },
    handleData() {
      const data = {
        imagesCounter: this.imagesCounter,
        background: this.background,
        image: this.image
      };
      
      database.writeData(this.ref, data);
    },
    updateBox(list) {
      if(list !== null) {
        this.imagesCounter = list.imagesCounter;
        this.background = list.background;

        if(this.image !== list.image) {
          this.image = list.image;
        }
      }
      
      this.isLoading = false;
    },
    changeImage(img) {
      if(img !== null) {
        this.image = img;
        this.background = "with";
      } else {
        this.image = "";
        this.background = "without";
      }

      this.save();
    }
  },
  created() {
    database.listenData(this.ref, this.updateBox.bind(this));
  }
}
</script>

<style lang="scss" scoped>
.card-body__top {
  display: flex;
  justify-content: space-between;
}

.card-body__center {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
}

.custom-control {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
