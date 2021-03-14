<template>
  <div class="login">
    <div class="login__container">
      <div class="login__title">Авторизация</div>
      <div class="login__row">
        <div class="login__label">Логин:</div>
        <input
            v-model="usersLogin"
            :class="{ login__input_error: hasError }"
            type="text"
            class="login__input"
        >
      </div>
      <div class="login__row">
        <div class="login__label">Пароль:</div>
        <input
            v-model="usersPass"
            :class="{ login__input_error: hasError }"
            type="password"
            class="login__input"
        >
      </div>
      <div class="login__row login__btn-container">
        <div @click="login" class="login__btn">Войти</div>
      </div>
    </div>
  </div>
</template>

<script>
import database from "@/scripts/database";
import AccountManager from "@/scripts/AccountManager";

let accountManager = new AccountManager();

export default {
  name: "Authorization",
  data() {
    return {
      usersLogin: "",
      usersPass: "",
      hasError: false,
    }
  },
  methods: {
    login() {
      database.auth(this.usersLogin, this.usersPass,
          (userCredential) => {
            accountManager.setMail(this.usersLogin);
            this.$router.back();
          },
          (err) => {
            this.usersLogin = "";
            this.usersPass = "";
            this.hasError = true;
          });
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-bottom: 130px;
}

.login__container {
  padding: 50px;
  border: black 1px solid;
  border-radius: 0.25rem;
  background-color: #e5e5e5;
}

.login__title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 40px;
}

.login__row {
  margin-top: 30px;
}

.login__input {
  padding: 5px 10px;
  border: black 1px solid;
  border-radius: 0.25rem;
  margin-top: 5px;
  line-height: 18px;
  width: 260px;
}

.login__input_error {
  border-color: #e92828;
}

.login__btn-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.login__btn {
  padding: 4px 15px;
  background-color: #ffffff;
  border: black 1px solid;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login__btn:hover {
  background-color: #d0d0d0;
}
</style>