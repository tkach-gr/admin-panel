<template>
  <div class="tickets">
    <DataTable 
      v-if="!isEditing" 
      :list="ticketsTable"
      :settings="ticketsTableSettings"
      :lang="null"
      @addItem="addTicket"
      @editItem="editTicket"
      @deleteItem="deleteTicket"
    />
    <TicketEdit
      v-else-if="isEditing" 
      :ticket="editingTicket"
      :films="films"
      :cinemas="cinemas"
      @saveTicket="saveTicket"
    />
    <div v-if="isLoading" class="overlay">
      <i class="fas fa-2x fa-sync-alt fa-spin"></i>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/Pages/AdminPanel/DataTable.vue';
import TicketEdit from './TicketEdit.vue';
import database from '@/scripts/database.js';
import DataUpdader from '@/scripts/DataUpdater.js';
import ImagesCollector from '@/scripts/ImagesCollector.js';
import InfoList from '@/scripts/ListManager.js';

let infoList = new InfoList();

export default {
  name: 'Tickets',
  components: {
    DataTable,
    TicketEdit
  },
  data() {
    return {
      ref: "tickets/",
      cinemasRef: "cinemas/",
      filmsRef: "films/",
      isEditing: false,
      isLoading: true,
      tickets: { list: [] },
      cinemas: { list: [] },
      films: { list: [] },
      editingTicket: {},
      ticketsTableSettings: {
        title: "Расписание",
        props: {
          film: "Фильм",
          cinema: "Кинотеатр",
          hall: "Зал",
          date: "Дата",
          time: "Время",
          price: "Цена",
          status: "Статус"
        },
        hasEdit: true,
        hasDelete: true,
      }
    }
  },
  methods: {
    addTicket() {
      let ticket = {
        film: "",
        cinema: "",
        hall: "",
        date: this.currentDate,
        time: "",
        status: "ВЫКЛ"
      }

      this.tickets.list = this.tickets.list || [];
      this.tickets.list.push(ticket);

      let ticketsList = this.tickets.list;
      let lastTicket = ticketsList[ticketsList.length - 1];
      this.editTicket({ source: lastTicket });
    },
    editTicket(ticket) {
      this.editingTicket = ticket.source;
      this.isEditing = true;
    },
    deleteTicket(ticket) {
      infoList.deleteItem(this.tickets.list, ticket);
      this.save();
    },
    saveTicket(ticket) {
      for(let key in ticket) {
        this.editingTicket[key] = ticket[key];
      }

      this.isEditing = false;
      this.save();
    },
    save() {
      this.handleData();
    },
    handleData() {
      database.writeData(this.ref, this.tickets);
    },
    updateBox(list) {
      if(list !== null) {
        this.tickets = list;
      }

      this.isLoading = false;
    },
    updateCinemas(list) {
      if (list !== null) {
        this.cinemas = list;
      }
    },
    updateFilms(list) {
      if (list !== null) {
        this.films = list;
      }
    },
    getBySeoUrl(list, url) {
      if(list === undefined) return null;

      for(let item of list) {
        if(item.ukr.seoUrl === url) {
          return item;
        }
      }

      return null;
    }
  },
  computed: {
    currentDate() {
      let date = new Date();
      let month = date.getMonth();
      month = month.toString().length === 1 ? "0" + month : month;

      return `${date.getDate()}.${month}.${date.getFullYear()}`;
    },
    ticketsTable() {
      let list = [];

      for(let item of this.tickets.list) {
        let film = this.getBySeoUrl(this.films.current, item.film);
        let cinema = this.getBySeoUrl(this.cinemas.list, item.cinema);
        let hall = cinema !== null ? this.getBySeoUrl(cinema.halls, item.hall) : null;

        list.push({
          film: film?.ukr.name,
          cinema: cinema?.ukr.name,
          hall: hall?.ukr.name,
          date: item.date,
          time: item.time,
          price: item.price,
          status: item.status,
          source: item
        });
      }

      return list;
    }
  },
  mounted() {
    database.listenData(this.ref, this.updateBox.bind(this));
    database.listenData(this.cinemasRef, this.updateCinemas.bind(this));
    database.listenData(this.filmsRef, this.updateFilms.bind(this));
  }
}
</script>

<style lang="scss" scoped>
.tickets {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(145, 145, 145, 0.178);
  z-index: 10;
}

.fas {
  position: absolute !important;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  width: 50px;
  height: 50px;
}
</style>
