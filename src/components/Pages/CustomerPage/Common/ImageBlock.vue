<template>
  <div class="item">
    <div
        :style="`background-image: url(${imageUrl};`"
        class="item__container"
    ></div>
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
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.item__container {
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: hidden;
  background-color: #007BFF;
  color:white;
}
</style>