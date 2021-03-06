<template>
  <div class="info-block">
    <div @click="$emit('remove')" class="btn btn-default info-block__close">
      <svg class="info-block__close-img" viewBox="0 0 8 8">
        <path d="M1.406 0l-1.406 1.406.688.719 1.781 1.781-1.781 1.781-.688.719 1.406 1.406.719-.688 1.781-1.781 1.781 1.781.719.688 1.406-1.406-.688-.719-1.781-1.781 1.781-1.781.688-.719-1.406-1.406-.719.688-1.781 1.781-1.781-1.781-.719-.688z" id="x" fill="rgba(0,0,0,0.7)"></path>
      </svg>
    </div>
    <img ref="filePreview" class="info-bloc__image">
  </div>
</template>

<script>
import database from '@/scripts/database.js';

export default {
  name: 'FilmEditGalleryItem',
  props: ['sourceRef', 'data'],
  data() {
    return {
      dataSource: this.data,
      files: []
    }
  },
  methods: {
    previewImage(file) {
      const preview = this.$refs.filePreview;
      const reader = new FileReader();
      reader.onload = function (e) { preview.src = e.target.result };
      reader.readAsDataURL(file);

      let name = file.name.split("");
      name.splice(0, file.name.lastIndexOf("."), "unnamed");
      name = name.join("");

      this.dataSource.image = name;
      this.dataSource.imageFile = file;
    }
  },
  mounted() {
    if(this.dataSource.imageFile === undefined) {
      this.dataSource.imageFile = null;
    }

    if(this.dataSource.image === undefined) {
      this.dataSource.image = null;
    } else if(this.dataSource.image !== null) {
      database.getImageUrl(`${this.sourceRef}${this.dataSource.image}`, url => {
        this.$refs.filePreview.src = url;
      });
    } else if(this.dataSource.imageFile !== null) {
      this.previewImage(this.dataSource.imageFile);
    }
  },
}
</script>

<style lang="scss" scoped>
.info-block {
  position: relative;
  padding-right: 10px;
  padding-top: 10px;
  max-width: 210px;
}

.info-bloc__image {
  width: 200px;
  height: 84px;
  background: #007BFF;
  border-radius: 0.25rem;
  background-size: cover;
}

.info-block__close {
  position: absolute;
  top: 0%;
  right: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 3px;
}

.info-block__close-img {
  width: 13px;
  height: 13px;
}

.info-block__add {
  margin-top: 20px;
}

.input-column {
  margin-top: 10px;
}

.input-label {
}

.info-block__input {
  flex: 140px 0 0;
}
</style>