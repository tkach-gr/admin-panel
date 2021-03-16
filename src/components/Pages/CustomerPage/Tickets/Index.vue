<template>
  <div class="page-container">
    <div class="tickets">
      <div class="tickets__container">
        <div class="settings">
          <div class="settings__group">
            <div class="settings__key">Фильм</div>
            <select v-model="selectedFilm" class="settings__value">
              <option value="">Любой фильм</option>
              <option
                  v-for="(item, index) in films?.current"
                  :key="index"
                  :value="item.ukr.seoUrl"
              >{{ item[lang].name }}</option>
            </select>
          </div>
          <div class="settings__group">
            <div class="settings__key">Кинотеатр</div>
            <select v-model="selectedCinema" class="settings__value">
              <option value="">Любой кинотеатр</option>
              <option
                  v-for="(item, index) in cinemas?.list"
                  :key="index"
                  :value="item.ukr.seoUrl"
              >{{ item[lang].name }}</option>
            </select>
          </div>
          <div class="settings__group">
            <div class="settings__key">Зал</div>
            <select v-model="selectedHall" class="settings__value">
              <option value="">Любой зал</option>
              <option
                  v-for="(item, index) in halls"
                  :key="index"
                  :value="item.ukr.seoUrl"
              >{{ item[lang].name }}</option>
            </select>
          </div>
        </div>
        <div
            v-for="(item, index) in sortedTickets"
            :key="index"
            class="list"
        >
          <div class="list__title">{{ index }}</div>
          <TicketEdit
              :lang="lang"
              :settings="ticketsTableSettings"
              :tickets="item"
              class="list__table"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TicketEdit from "./TicketTable.vue";

export default {
  name: "Tickets",
  props: ["lang", "films"],
  components: {
    TicketEdit
  },
  data() {
    return {
      cinemasRef: "cinemas/",
      ticketsRef: "tickets/",
      selectedCinema: "",
      selectedHall: "",
      selectedFilm: "",
      ticketsTableSettings: {
        props: {
          time: "Время",
          film: "Фильм",
          cinema: "Кинотеатр",
          hall: "Зал",
          price: "Цена",
        },
      }
    }
  },
  methods: {
    getBySeoUrl(list, url) {
      if(list === undefined) return null;

      for(let item of list) {
        if(item.ukr.seoUrl === url) {
          return item;
        }
      }

      return null;
    },
    isTicketValid(ticket) {
      if(ticket.status !== "ВКЛ") return false;

      if(this.selectedFilm !== "" &&
          this.selectedFilm !== ticket.film) return false;

      if(this.selectedCinema !== "" &&
          this.selectedCinema !== ticket.cinema) return false;

      if(this.selectedHall !== "" &&
          this.selectedHall !== ticket.hall) return false;

      return true;
    },
    pushTicketByDate(collection, ticket) {
      if(collection[ticket.date] === undefined) {
        collection[ticket.date] = [];
      }

      collection[ticket.date].push(ticket);
    },
    sortTickets(collection) {
      let keys = Object.keys(collection);
      keys.sort((a, b) => {
        let [firstDay, firstMonth, firstYear] = a.split(".");
        let [secondDay, secondMonth, secondYear] = b.split(".");

        if(+firstYear > +secondYear) {
          return 1;
        } else if(+firstYear === +secondYear &&
            +firstMonth > +secondMonth) {
          return 1;
        } else if(+firstYear === +secondYear &&
            +firstMonth === +secondMonth &&
            +firstDay > +secondDay) {
          return 1;
        }

        return -1;
      });

      let sorted = {};
      keys.map(item => sorted[item] = collection[item].sort((a, b) => {
        let [firstHour, firstMinutes] = a.time.split(":");
        let [secondHour, secondMinutes] = b.time.split(":");

        if(+firstHour > +secondHour) {
          return 1;
        } else if(+firstHour === +secondHour &&
            +firstMinutes > +secondMinutes) {
          return 1;
        }

        return -1;
      }));

      return sorted;
    }
  },
  watch: {
    selectedCinema() {
      this.selectedHall = "";
    },
  },
  computed: {
    cinemas() {
      return this.$store.getters.getCinemas(this.cinemasRef);
    },
    tickets() {
      return this.$store.getters.getTickets(this.ticketsRef);
    },
    halls() {
      if(this.selectedCinema === "" || this.cinemas === null) {
        return [];
      }

      return this.getBySeoUrl(this.cinemas.list, this.selectedCinema).halls;
    },
    sortedTickets() {
      let list = {};

      if(this.tickets === null) return list;

      for(let item of this.tickets.list) {
        if(!this.isTicketValid(item)) continue;

        let film = this.getBySeoUrl(this.films.current, item.film);
        let cinema = this.getBySeoUrl(this.cinemas.list, item.cinema);
        let hall = cinema !== null ? this.getBySeoUrl(cinema.halls, item.hall) : null;

        this.pushTicketByDate(list, {
          film: film?.ukr.name,
          cinema: cinema?.ukr.name,
          hall: hall?.ukr.name,
          date: item.date,
          time: item.time,
          price: item.price
        });
      }

      return this.sortTickets(list);;
    }
  }
}
</script>

<style lang="scss" scoped>
.tickets {
  display: flex;
  justify-content: center;
  width: 100%;
}

.tickets__container {
  flex-grow: 1;
  max-width: 1200px;
  padding: 30px;
}

.settings {
  display: flex;
}

.settings__group {
  display: flex;
  align-items: center;
  margin-left: 50px;
}

.settings__group:first-child {
  margin-left: 0;
}

.settings__key {
  font-size: 20px;
  font-weight: 500;
}

.settings__value {
  border: black 1px solid;
  border-radius: 0.25rem;
  padding: 5px 13px;
  width: 200px;
  margin-left: 17px;
}

.list {
  //display: flex;
  //justify-content: flex-start;
  margin-top: 50px;
}

.list__title {
  font-size: 24px;
  font-weight: 500;
  margin-left: 13px;
}

.list__table {
  margin-top: 13px;
}
</style>