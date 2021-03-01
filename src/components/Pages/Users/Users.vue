<template>
  <div class="users">
    <DataTable 
      v-if="!isEditing" 
      :list="tableData"
      :settings="usersTableSettings"
      :lang="'ukr'"
      @search="searchUser"
      @addItem="addUser"
      @editItem="editUser"
      @deleteItem="deleteUser"
    />
    <UserEdit
      v-else-if="isEditing"
      :user="editingUser"
      :sourceRef="ref" 
      @saveUser="saveUser"
    />
    <div v-if="isLoading" class="overlay">
      <i class="fas fa-2x fa-sync-alt fa-spin"></i>
    </div>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import UserEdit from './UserEdit.vue';
import database from '@/scripts/database.js';
import DataUpdater from '@/scripts/DataUpdater.js';
import InfoList from '@/scripts/ListManager.js';

let infoList = new InfoList();

export default {
  name: 'Users',
  components: {
    DataTable,
    UserEdit
  },
  data() {
    return {
      ref: "users/",
      isEditing: false,
      isLoading: true,
      users: {
        list: []
      },
      editingUser: {},
      tableData: [],
      usersTableSettings: {
        title: "Список пользователей",
        props: {
          id: "ID",
          registrationDate: "Дата регистрации",
          bornDate: "Дата рождения",
          email: "E-mail",
          phone: "Номер телефона",
          name: "Имя",
          surname: "Фамилия",
          nickname: "Псевдоним",
          city: "Город",
        },
        hasSearch: true,
        showIndexes: true,
        hasEdit: true,
        hasDelete: true,
      }
    }
  },
  methods: {
    addUser() {
      let user = {
        ukr: {
          id: this.users.list.length,
          registrationDate: this.currentDate,
          bornDate: this.currentDate,
          email: "E-mail не указан",
          phone: "Телефон не указан",
          name: "Имя не указано",
          surname: "Фамимилия не указана",
          nickname: "Псевдоним не указан",
          city: "Город не указан",
        },
      }

      this.users.list = this.users.list || [];
      this.users.list.push(user);

      this.save();
    },
    editUser(user) {
      this.editingUser = user;
      this.isEditing = true;
    },
    deleteUser(user) {
      infoList.deleteItem(this.users.list, user);
      this.save();
    },
    searchUser(list, input) {
      this.tableData = this.users.list.filter(value => value.ukr.nickname.indexOf(input) === 0);
    },
    saveUser(user) {
      this.editingUser.ukr = user.ukr;

      this.isEditing = false;
      this.save();
    },
    save() {
      this.handleData();
    },
    handleData() {
      database.writeData(this.ref, this.users);
    },
    updateBox(list) {
      if(list !== null && list !== undefined) {
        this.users.list = list.list;
      }

      this.users.list = this.users.list || [];
      this.tableData = this.users.list;
      this.isLoading = false;
    }
  },
  computed: {
    currentDate() {
      let date = new Date();
      let month = date.getMonth();
      month = month.toString().length === 1 ? "0" + month : month;

      return `${date.getDate()}.${month}.${date.getFullYear()}`;
    }
  },
  mounted() {
    database.listenData(this.ref, this.updateBox.bind(this));
  }
}
</script>

<style lang="scss" scoped>
.users {
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
