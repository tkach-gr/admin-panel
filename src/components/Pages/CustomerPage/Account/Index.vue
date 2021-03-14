<template>
  <div class="card-container">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Редактирование пользователя</h3>
        <RouterLink v-if="isAdmin" to="/admin" class="btn btn-default">Страница администратора</RouterLink>
      </div>
      <div class="card-body">
        <div class="input-column">
          <div class="input-row">
            <div class="input-row__label">Имя</div>
            <input v-model="edit[lang].name" type="text" class="form-control" placeholder="Имя">
          </div>
          <div class="input-row">
            <div class="input-row__label">Фамилия</div>
            <input v-model="edit[lang].surname" type="text" class="form-control" placeholder="Фамилия">
          </div>
          <div class="input-row">
            <div class="input-row__label">Псевдоним</div>
            <input v-model="edit[lang].nickname" type="text" class="form-control" placeholder="Псевдоним">
          </div>
          <div class="input-row">
            <div class="input-row__label">E-mail</div>
            <input v-model="edit[lang].email" type="text" class="form-control" placeholder="E-mail">
          </div>
          <div class="input-row">
            <div class="input-row__label">Адресс</div>
            <input v-model="edit[lang].address" type="text" class="form-control" placeholder="Адресс">
          </div>
          <div class="input-row">
            <div class="input-row__label">Пароль</div>
            <input v-model="edit[lang].password" type="password" class="form-control" placeholder="Пароль">
          </div>
          <div class="input-row">
            <div class="input-row__label">Повторите пароль</div>
            <input v-model="repeatPassword" type="password" class="form-control" placeholder="Повторите пароль">
          </div>
        </div>
        <div class="input-column">
          <div class="input-row">
            <div class="input-row__label">Номер карты</div>
            <input v-model="edit[lang].cardNumber" type="text" class="form-control" placeholder="Номер карты">
          </div>
          <div class="input-row">
            <div class="input-row__label">Язык</div>
            <div class="radio-control">
              <input v-model="edit[lang].language" type="radio" id="languageRus" class="form-control" value="rus">
              <label for="languageRus">Русский</label>
            </div>
            <div class="radio-control">
              <input v-model="edit[lang].language" type="radio" id="languageUkr" class="form-control" value="ukr">
              <label for="languageUkr">Украинский</label>
            </div>
          </div>
          <div class="input-row">
            <div class="input-row__label">Пол</div>
            <div class="radio-control">
              <input v-model="edit[lang].gender" type="radio" id="genderMale" class="form-control" value="male">
              <label for="genderMale">Мужской</label>
            </div>
            <div class="radio-control">
              <input v-model="edit[lang].gender" type="radio" id="genderFemale" class="form-control" value="female">
              <label for="genderFemale">Женский</label>
            </div>
          </div>
          <div class="input-row">
            <div class="input-row__label">Телефон</div>
            <input v-model="edit[lang].phone" type="text" class="form-control" placeholder="Телефон">
          </div>
          <div class="input-row">
            <div class="input-row__label">Дата рождения</div>
            <DatePicker :date="edit[lang].bornDate" @changeDate="changeDate"/>
          </div>
          <div class="input-row">
            <div class="input-row__label">Город</div>
            <select v-model="edit[lang].city" class="form-control">
              <option disabled value="Город не указан">Город не выбран</option>
              <option value="Киев">Киев</option>
              <option value="Харьков">Харьков</option>
              <option value="Одесса">Одесса</option>
              <option value="Львов">Львов</option>
            </select>
          </div>
        </div>
      </div>
      <div class="controls">
        <button @click="save" :class="{ warning: isShowingError }" class="btn btn-default btn-save">Сохранить</button>
      </div>
      <div v-if="isLoading" class="overlay">
        <i class="fas fa-2x fa-sync-alt fa-spin"></i>
      </div>
    </div>
  </div>
</template>

<script>
import database from "@/scripts/database";
import AccountManager from "@/scripts/AccountManager";
import DatePicker from './DatePicker.vue';

let accountManager = new AccountManager();

export default {
  name: "Account",
  components: {
    DatePicker
  },
  data() {
    return {
      sourceRef: "users/",
      users: null,
      edit: { ukr: {} },
      lang: "ukr",
      isAdmin: false,
      isLoading: true,
      repeatPassword: "",
      isShowingError: false
    }
  },
  methods: {
    changeDate(newValue) {
      let date = newValue.getDate();
      let month = newValue.getMonth() + 1;
      date = date < 10 ? '0' + date: date;
      month = month < 10 ? '0' + month: month;

      let changed = `${date}.${month}.${newValue.getFullYear()}`;

      this.edit['ukr'].bornDate = changed;
    },
    save() {
      if(this.repeatPassword === this.edit[this.lang].password) {
        database.writeData(this.sourceRef, this.users);
        this.$router.back();
      } else {
        this.isShowingError = true;
        setTimeout(() => this.isShowingError = false, 2000);
      }
    }
  },
  created() {
    database.listenData(this.sourceRef, newValue => {
      this.users = newValue;
      let mail = accountManager.getMail();

      if(mail === null) {
        this.$router.replace("/");
      }

      for(let item of newValue.list) {
        if(item.ukr.email === mail) {
          this.edit = item;
          this.repeatPassword = this.edit[this.lang].password;
          this.isLoading = false;
        }
      }
    });

    if(accountManager.getMail() === "admin@adminpanel.com") {
      this.isAdmin = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  justify-content: center;
  padding: 30px;
}

.card {
  flex-grow: 1;
  max-width: 1200px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-body {
  display: flex;
  flex-wrap: wrap;
}

.card-title {
  flex: 200px 1 1;
  display: flex;
  justify-content: flex-start;
}

.card__enabled {
  margin: 0 30px;
}

.card__item.selected {
  background-color: #dde1e6;
}

.input-column {
  display: flex;
  flex-direction: column;
}

.input-row {
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
  min-width: 450px;
  max-width: 600px;
}

.radio-control {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.radio-control label {
  margin-left: 5px;
  margin-bottom: 0;
}

.mt {
  margin-top: 11px;
}

.gallery {
  margin-bottom: 45px
}

.gallery__title {
  margin-top: 30px;
}

.seo {
  margin-top: 25px;
  flex-direction: column;
  display: flex;
}

.seo__title {
  display: flex;
  justify-content: flex-end;
  font-size: 18px;
  width: 160px;
}

.seo__body {
  width: 100%;
  max-width: 700px;
}

.input-row__label {
  flex: 160px 0 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 160px;
  margin-right: 15px;
  height: 38px;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 42px;
}
</style>