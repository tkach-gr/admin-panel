<template>
    <div class="banners-sliders">
      <MainPageTop />
      <MainPageBack />
      <MainPageNews />
    </div>
</template>

<script>
import MainPageTop from './MainPageTop.vue';
import MainPageBack from './MainPageBack.vue';
import MainPageNews from './MainPageNews.vue';

export default {
  name: 'BannersAndSliders',
  components: {
    MainPageTop,
    MainPageBack,
    MainPageNews
  }
}
</script>

<style lang="scss" scoped>
  .banners-sliders {

  }
</style>
