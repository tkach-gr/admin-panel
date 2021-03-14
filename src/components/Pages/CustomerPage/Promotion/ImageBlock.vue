<template>
  <div class="item">
    <div class="item__container">
      <img :src="imageUrl" alt="item" class="item__img">
    </div>
  </div>
</template>

<script>
import database from "@/scripts/database.js";

export default {
  name: "ImageBlock",
  props: ["sourceRef", "image", "lang"],
  data() {
    return {
      imageUrl: "",
    }
  },
  methods: {
    updateImage() {
      if(this.image === undefined || this.image === "") {
        this.imageUrl = "";
        return;
      }

      let path = `${this.sourceRef}${this.image}`;
      database.getImageUrl(path, url => {
        this.imageUrl = url;
      });
    }
  },
  watch: {
    lang() {
      this.updateImage();
    },
    image() {
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
  width: 100%;
  height: 100%;
}

.item__container {
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: #007BFF;
  color:white;
}

.item__img {
  width: 100%;
  height: 100%;
}
</style>