<template>
  <div class="item">
    <div class="item__img-container">
      <img ref="imgPreview" alt="item" class="item__img">
    </div>
    <div class="item__name">{{ item[lang].name }}</div>
    <div class="item__date">{{ item[lang].creationDate }}</div>
    <div class="item__text">{{ item[lang].text }}</div>
  </div>
</template>

<script>
import database from "@/scripts/database.js";

export default {
  name: "ItemCard",
  props: ["item", "lang", "isAvailable"],
  methods: {
    updateImage() {
      let image = this.item[this.lang].mainImage;

      if(image === undefined || image === "") {
        this.$refs.imgPreview.src = "";
        return;
      }

      database.getImageUrl(`promotions/${image}`, url => {
        if(this.$refs.imgPreview !== undefined) {
          this.$refs.imgPreview.src = url;
        }
      });
    }
  },
  watch: {
    lang() {
      this.updateImage();
    }
  },
  mounted() {
    this.updateImage();
  }
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
}

.item__img-container {
  width: 366px;
  height: 260px;
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: #007BFF;
  color:white;
}

.item__img {
  width: 100%;
  height: 100%;
}

.item__name {
  font-size: 18px;
  font-weight: 600;
  margin-top: 6px;
}

.item__date {
  margin-top: 5px;
  padding: 5px 15px;
  background-color: #4e4e4e;
  color: white;
  border-radius: 0.25rem;
}

.item__text {
  margin-top: 3px;
}

.item__buy {
  margin-top: 10px;
  padding: 4px 15px;
  color: black;
  border: black 1px solid;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.item__buy:hover {
  background-color: #d6d6d6;
}
</style>