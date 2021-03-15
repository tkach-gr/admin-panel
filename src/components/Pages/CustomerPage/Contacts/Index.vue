<template>
  <div class="page-container">
    <div v-if="searchingStatus === 'found'" class="contacts">
      <div class="contacts__container">
        <div class="contacts__title">{{ contacts[lang].name }}</div>
        <div
            v-for="(item, index) in contacts[lang]?.list"
            :key="index"
            class="contact"
        >
          <div class="contact__img">
            <ImageBlock
                :sourceRef="sourceRef"
                :image="item[lang].mainImage"
                :lang="lang"
            />
          </div>
          <div class="contact__info">
            <div class="contact__title">{{ item[lang].name }}</div>
            <div class="contact__text">{{item[lang].adress }}</div>
            <div class="contact__coords">Координаты: {{ item[lang].coords }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="searchingStatus === 'searching'" class="searching">
      Поиск...
    </div>
    <div v-else-if="searchingStatus === 'error'" class="searching-error">
      Не удалось найти страницу
    </div>
  </div>
</template>

<script>
import ImageBlock from "./ImageBlock";

export default {
  name: "Contacts",
  props: ["pages", "lang"],
  components: {
    ImageBlock
  },
  data() {
    return {
      sourceRef: "pages/",
      contacts: null,
      searchingStatus: "searching",
    }
  },
  methods: {
    findPage() {
      this.searchingStatus = "searching";
      let seoUrl = "contacts";

      if(this.pages === null || this.pages.list.length === 0) return;

      for(let item of this.pages.list) {
        if(item.ukr.seoUrl === seoUrl) {
          this.contacts = item;
          this.searchingStatus = "found";
          return;
        }
      }

      this.searchingStatus = "error";
    }
  },
  watch: {
    pages() {
      this.findPage();
    }
  },
  mounted() {
    this.findPage();
  }
}
</script>

<style lang="scss" scoped>
.searching,
.searching-error {
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 30px;
}

.contacts {
  display: flex;
  justify-content: center;
  width: 100%;
}

.contacts__container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 1200px;
  padding: 30px;
}

.contacts__title {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
}

.contact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 625px;
  margin-top: 40px;
}

.contact:nth-child(2n + 1) {
  flex-direction: row-reverse;
}

.contact__img {
  flex: 300px 0 0;
  height: 220px;
}

.contact__info {
  flex: 300px 0 0;
}

.contact__title {
  font-size: 18px;
  font-weight: 600;
}

.contact__text {
  margin-top: 10px;
}

.contact__coords {
  margin-top: 10px;
}
</style>