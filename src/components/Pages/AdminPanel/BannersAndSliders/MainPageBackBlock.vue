<template>
  <div class="info-block">
    <img v-if="imageSource !== null" ref="filePreview" class="info-bloc__image">
    <input ref="fileDialog" @change="saveImage" style="display: none;" type="file">
    <button
        v-if="imageSource === null"
        @click="openFileDialog"
        class="btn btn-block btn-default info-block__add"
    >Добавить</button>
    <button
        v-if="imageSource !== null"
        @click="deleteImage"
        class="btn btn-block btn-default info-block__add"
    >Удалить</button>
  </div>
</template>

<script>
import database from '@/scripts/database.js';

export default {
  name: 'MainPageBackBlock',
  props: ['sourceRef', 'image'],
  data() {
    return {
      imageSource: this.image,
      files: []
    }
  },
  methods: {
    openFileDialog() {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      this.$refs.fileDialog.dispatchEvent(event);
    },
    saveImage() {
      const file = this.$refs.fileDialog.files[0];
      this.previewImage(file);
    },
    previewImage(file) {
      const preview = this.$refs.filePreview;
      const reader = new FileReader();
      reader.onload = function (e) { preview.src = e.target.result };
      reader.readAsDataURL(file);

      let name = file.name.split("");
      name.splice(0, file.name.lastIndexOf("."), "unnamed");
      name = name.join("");

      this.imageSource = name;
      this.imageFile = file;

      this.$emit("imageChanged", this.imageSource, this.imageFile);
    },
    deleteImage() {
      this.imageSource = null;
      this.$refs.filePreview.src = "";
      this.$emit("imageChanged", null);
    },
    loadImage() {
      if(this.imageFile === undefined) {
        this.imageFile = null;
      }

      if(this.imageSource === undefined) {

        this.imageSource = null;

      } else if(this.imageSource === "") {

        this.imageSource = null;

      } else if(this.imageSource.indexOf("unnamed") === 0) {

        return;

      } else if(this.imageSource === "") {

        this.$refs.filePreview.src = "";

      } else if(this.imageSource !== null) {

        database.getImageUrl(`${this.sourceRef}${this.imageSource}`, url => {
          this.$refs.filePreview.src = url;
        });
      }
    }
  },
  watch: {
    image(newImage) {
      this.imageSource = newImage;
      this.loadImage();
    }
  },
  mounted() {
    this.loadImage();
  },
}
</script>

<style lang="scss" scoped>
.info-block {
  position: relative;
}

.info-bloc__image {
  width: 120px;
  height: 180px;
  flex-shrink: 0;
  flex-grow: 0;
  background: #007BFF;
  border-radius: 0.25rem;
  background-size: cover;
}

.info-block__add {
  margin-left: 20px;
}

.btn-block + .btn-block {
  margin-top: 0;
}

.info-block {
  display: flex;
  margin: 10px 0;
}
</style>
