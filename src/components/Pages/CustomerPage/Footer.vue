<template>
  <div class="footer">
    <div class="footer__container">
      <div class="footer__top">
        <div class="column">
          <div class="column__title">Мобильные приложения</div>
          <div class="socials">
            <a href="#" class="socials__item">
              <img src="@/assets/google-play.svg" alt="">
            </a>
            <a href="#" class="socials__item">
              <img src="@/assets/app-store.svg" alt="">
            </a>
          </div>
          <div class="column__text column__bottom">Разработка сайтов: AVADA-MEDIA</div>
        </div>
        <div class="column">
          <RouterLink to="/poster" class="column__title">Афиша</RouterLink>
          <RouterLink to="/tickets" class="column__text">Расписание</RouterLink>
          <RouterLink to="/future" class="column__text">Скоро в прокате</RouterLink>
          <RouterLink to="/cinemas" class="column__text">Кинотеатры</RouterLink>
          <RouterLink to="/promotions" class="column__text">Акции</RouterLink>
        </div>
        <div class="column">
          <RouterLink to="/common/about" class="column__title">О кинотеатре</RouterLink>
          <RouterLink to="/news" class="column__text">Новости</RouterLink>
          <RouterLink to="/common/advertising" class="column__text">Реклама</RouterLink>
          <RouterLink to="/common/cafe" class="column__text">Кафе-Бар</RouterLink>
          <RouterLink to="/contacts" class="column__text">Контакты</RouterLink>
        </div>
        <div class="column">
          <div class="socials">
            <a href="#" class="socials__item">
              <img src="@/assets/facebook.svg" alt="">
            </a>
            <a href="#" class="socials__item">
              <img src="@/assets/youtube.svg" alt="">
            </a>
            <a href="#" class="socials__item">
              <img src="@/assets/instagram.svg" alt="">
            </a>
            <a href="#" class="socials__item">
              <img src="@/assets/google-plus.svg" alt="">
            </a>
          </div>
        </div>
      </div>
      <div class="footer__bottom">©KinoCMS 2016, All rights reserved</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  background-color: #d5d5d5;
}

.footer__container {
  flex-grow: 1;
  max-width: 1200px;
  padding: 30px;
}

.footer__top {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
}

.column {
  display: flex;
  flex-direction: column;
}

.column__title {
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-bottom: 10px;
}

.column__text {
  color: black;
  margin-top: 6px;
}

.socials {
  display: flex;
}

.socials__item {
  width: 35px;
  height: 35px;
  margin-left: 10px;
}

.socials__item:first-child {
  margin-left: 0;
}

.socials__item img {
  width: 100%;
  height: 100%;
}

.column__bottom {
  margin-top: 50px;
}

.footer__bottom {
  margin-top: 50px;
  text-align: center;
}
</style>