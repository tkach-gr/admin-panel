<template>
  <div @click="l" class="account">
    <div class="account__container">
      <div v-if="mail !== null" class="info">
        <RouterLink to="/account" class="info__user">
          <div class="info__avatar">
            <img src="@/assets/user.svg" alt="user-avatar">
          </div>
          <div class="info__mail">{{ mail }}</div>
        </RouterLink>
        <div @click="logout" class="info__logout account-btn">Выйти</div>
      </div>
      <div v-else-if="mail === null" class="login">
        <RouterLink to="/login" class="login__btn account-btn">
          Войти
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Account",
  props: ["mail"],
  methods: {
    logout() {
      this.$emit('logout');

      if(this.$router.currentRoute.value.fullPath === "/account") {
        this.$router.replace("/");
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.account {
  display: flex;
  justify-content: center;
  background-color: #b0b0b0;
}

.account__container {
  display: flex;
  padding: 10px 30px;
}

.info {
  display: flex;
  align-items: center;
}

.info__user {
  display: flex;
  align-items: center;
}

.info__user {
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 34px;
  border-radius: 0.25rem;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.info__user:hover {
  background-color: #dedede;
}

.info__avatar {
  display: flex;
  align-items: center;
  width: 23px;
  height: 23px;
}

.info__mail {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 2px;
}

.info__logout {
  margin-left: 50px;
}

.account-btn {
  padding: 4px 15px;
  color: black;
  border: black 1px solid;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.account-btn:hover {
  background-color: #dedede;
}
</style>