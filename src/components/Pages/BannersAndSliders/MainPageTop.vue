<template>
  <div class="card card-outline card-primary">
    <div class="card-header">
      <h3 class="card-title">На главной верх</h3>
    </div>
    <div class="card-body">
      <div class="card-body__top">
        <div class="card-body__item">Размер: 1000х190</div>
        <div class="card-body__item">
          <div class="custom-control custom-switch">
            <input v-model="isEnabled" type="checkbox" class="custom-control-input" id="mainPageTopSwitch">
            <label class="custom-control-label" for="mainPageTopSwitch"></label>
          </div>
        </div>
      </div>
      <div class="card-body__center">
        <MainPageTopBlock :key="item" :sourceRef="ref" :data="item" v-on:remove="dataBlocks.splice(index, 1)"
          v-for="(item, index) in dataBlocks" class="card__block" />
        <button @click="addItem()" class="btn btn-default card__add-block">Добавить<br>фото</button>
      </div>
      <div class="card-body__bottom">
        <div class="seconds">
          <div class="seconds__label">Скорость вращения</div>
          <select v-model="scrollSpeed" class="seconds__input form-control">
            <option :key="number" v-for="number in 10">{{ number }} сек.</option>
          </select>
        </div>
        <button ref="btnSave" @click="save" class="btn btn-default btn-save">Сохранить</button>
      </div>
    </div>
    <div v-if="isLoading" class="overlay">
      <i class="fas fa-2x fa-sync-alt fa-spin"></i>
    </div>
  </div>
</template>

<script>
import MainPageTopBlock from './MainPageTopBlock.vue';
import database from '@/scripts/database.js';
import InfoList from '@/scripts/ListManager.js';
import DataUpdader from '@/scripts/DataUpdater.js';

const infoList = new InfoList();

export default {
  name: 'MainPageTop',
  components: {
    MainPageTopBlock
  },
  data() {
    return {
      ref: "banners/mainTop/",
      imagesCounter: 0,
      isEnabled: false,
      dataBlocks: [],
      scrollSpeed: "1 сек.",
      isLoading: true
    }
  },
  methods: {
    addItem() {
      infoList.addItem(this.dataBlocks);
    },
    save() {
      this.$refs.btnSave.classList.add("show");

      let handle = list => {
        DataUpdader.handleImages(this.dataBlocks, list, this.ref, () => this.imagesCounter++);
        this.handleData();
      };
      
      database.getAllImagesAsync(this.ref, handle);

      setTimeout(() => this.$refs.btnSave.classList.remove("show"), 1500);
    },
    handleData() {
      const list = this.dataBlocks.map(value => {
        return { 
          image: value.image,
          url: value.url, 
          text: value.text 
        };
      });

      const data = {
        imagesCounter: this.imagesCounter,
        isEnabled: this.isEnabled,
        list,
        scrollSpeed: this.scrollSpeed
      };
      
      database.writeData(this.ref, data);
    },
    updateBox(list) {
      if(list !== null) {
        this.imagesCounter = list.imagesCounter;
        this.isEnabled = list.isEnabled;
        this.scrollSpeed = list.scrollSpeed;

        DataUpdader.updateBlocks(this.dataBlocks, list.list, (local, updated) => {
          return updated.image === local.image
            && updated.url === local.url
            && updated.text === local.text;
        });
      }
      
      this.isLoading = false;
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
  margin: 0 -15px;
}

.card__block {
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
}

.card__add-block {
  margin: 30px 48px 10px 48px;
}

.card-body__bottom {
  display: flex;
  margin-top: 30px;
}

.seconds {
  flex: 42% 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
}

.seconds__input {
  max-width: 120px;
  margin-left: 15px;
}
</style>
