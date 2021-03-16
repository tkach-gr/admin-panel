<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Редактирование билета</h3>
      <div class="custom-control custom-switch card__enabled">
        <input v-model="isEnabled" type="checkbox" class="custom-control-input" id="TicketEnabled">
        <label class="custom-control-label" for="TicketEnabled"></label>
      </div>
    </div>
    <div class="card-body">
      <div class="input-row">
        <div class="input-row__label">Фильм</div>
        <select v-model="edit.film" class="form-control">
          <option disabled value="">Веберите фильм</option>
          <option
              v-for="(item, index) in films?.current"
              :key="index"
              :value="item.ukr.seoUrl"
          >{{ item.ukr.name }}</option>
        </select>
      </div>
      <div class="input-row">
        <div class="input-row__label">Кинотеатр</div>
        <select v-model="edit.cinema" @change="nullifyHall" class="form-control">
          <option disabled value="">Веберите кинотеатр</option>
          <option
              v-for="(item, index) in cinemas?.list"
              :key="index"
              :value="item.ukr.seoUrl"
          >{{ item.ukr.name }}</option>
        </select>
      </div>
      <div class="input-row">
        <div class="input-row__label">Зал</div>
        <select v-model="edit.hall" class="form-control">
          <option disabled value="">Веберите зал</option>
          <option
              v-for="(item, index) in halls"
              :key="index"
              :value="item.ukr.seoUrl"
          >{{ item.ukr.name }}</option>
        </select>
      </div>
      <div class="input-row">
        <div class="input-row__label">Дата</div>
        <DatePicker :date="edit.date" @changeDate="changeDate"/>
      </div>
      <div class="input-row">
        <div class="input-row__label">Время</div>
        <input v-model="edit.time" type="text" class="form-control" placeholder="Время">
      </div>
      <div class="input-row">
        <div class="input-row__label">Цена</div>
        <input v-model="edit.price" type="text" class="form-control" placeholder="Цена">
      </div>
    </div>
    <div class="controls">
      <button @click="save" class="btn btn-default btn-save">Сохранить</button>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/Pages/AdminPanel/DatePicker.vue';

export default {
  name: "TicketEdit",
  props: ["ticket", "films", "cinemas"],
  components: {
    DatePicker
  },
  data() {
    return {
      edit: JSON.parse(JSON.stringify(this.ticket)),
      isEnabled: this.ticket.status === 'ВКЛ'
    }
  },
  methods: {
    changeDate(newValue) {
      let date = newValue.getDate();
      let month = newValue.getMonth() + 1;
      date = date < 10 ? '0' + date: date;
      month = month < 10 ? '0' + month: month;

      let changed = `${date}.${month}.${newValue.getFullYear()}`;

      this.edit.date = changed;
      this.edit.date = changed;
    },
    nullifyHall() {
      this.edit.hall = "";
    },
    save() {
      this.$emit("saveTicket", this.edit);
    },
    returnDefault() {
      this.edit = this.promotion;
    }
  },
  watch: {
    isEnabled(newValue) {
      let changed;
      if(newValue === true) { changed = 'ВКЛ' }
      else { changed = 'ВЫКЛ' }

      this.edit.status = changed;
      this.edit.status = changed;
    }
  },
  computed: {
    halls() {
      if(this.edit.cinema === "" || this.cinemas === undefined) {
        return [];
      }

      let cinemaUrl = this.edit.cinema;
      let halls = [];
      for(let item of this.cinemas.list) {
        if(item.ukr.seoUrl === cinemaUrl) {
          halls = item.halls;
          break;
        }
      }

      return halls;
    }
  },
}
</script>

<style lang="scss" scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-title {
    flex: 200px 1 1;
    display: flex;
    justify-content: flex-start;
  }

  .card__enabled {
    margin: 0 30px;
  }

  .input-row {
    display: flex;
    align-items: flex-start;
    margin-top: 15px;
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

  .controls .btn {
    margin-left: 25px
  }
</style>