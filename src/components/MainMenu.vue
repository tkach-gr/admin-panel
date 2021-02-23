<template>
  <div class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
          <li class="nav-item">
            <div ref="statistics" @click="changePage('statistics')" class="nav-link active">
              <p>
                Статистика
              </p>
            </div>
          </li>
          <li class="nav-item">
            <div ref="banners-sliders" @click="changePage('banners-sliders')" class="nav-link">
              <p>
                Баннеры / Слайдеры
              </p>
            </div>
          </li>
          <li class="nav-item">
            <div ref="films" @click="changePage('films')" class="nav-link">
              <p>
                Фильмы
              </p>
            </div>
          </li>
          <li class="nav-item">
            <div ref="cinemas" @click="changePage('cinemas')" class="nav-link">
              <p>
                Кинотеатры
              </p>
            </div>
          </li>
          <li class="nav-item">
            <div ref="news" @click="changePage('news')" class="nav-link">
              <p>
                Новости
              </p>
            </div>
          </li>
          <li class="nav-item">
            <div ref="promotions" @click="changePage('promotions')" class="nav-link">
              <p>
                Акции
              </p>
            </div>
          </li>
          <li class="nav-item">
            <div ref="pages" @click="changePage('pages')" class="nav-link">
              <p>
                Страницы
              </p>
            </div>
          </li>
          <li class="nav-item">
            <div ref="users" @click="changePage('users')" class="nav-link">
              <p>
                Пользователи
              </p>
            </div>
          </li>
          <li class="nav-item">
            <div ref="sendings" @click="changePage('sendings')" class="nav-link">
              <p>
                Рассылка
              </p>
            </div>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </div>
</template>

<script>

export default {
  name: 'MainMenu',
  // props: ['pageManager'],
  data () {
    return {
      pageName: 'statistics'
    }
  },
  methods: {
    changePage (pageName) {
      if (pageName === this.pageName) { return };

      this.$refs[this.pageName].classList.remove('active');
      this.$refs[pageName].classList.add('active');
      this.pageName = pageName;

      this.$emit('pagechanged', pageName);
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-sidebar {
    position: fixed !important;
  }

  .nav-link {
    color: #C2C7D0 !important;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }

  .nav-link.active {
    color: white !important;
    cursor: pointer;
  }
</style>
