<template>
  <div class="users-table">
    <DataTable
        ref="table"
        :list="tableData"
        :settings="usersTableSettings"
        :lang="'ukr'"
        @search="searchUser"
    />
    <div v-if="isLoading" class="overlay">
      <i class="fas fa-2x fa-sync-alt fa-spin"></i>
    </div>
  </div>
  <div class="controls">
    <div @click="sendUsers" class="btn btn-default">Отправить выбранным</div>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import database from '@/scripts/database.js';

export default {
  name: 'Users',
  components: {
    DataTable,
  },
  data() {
    return {
      ref: "users/",
      isLoading: true,
      users: {
        list: []
      },
      tableData: [],
      usersTableSettings: {
        title: "Список пользователей",
        props: {
          id: "ID",
          registrationDate: "Дата регистрации",
          bornDate: "Дата рождения",
          email: "E-mail",
          phone: "Телефона",
          name: "Имя",
          surname: "Фамилия",
          nickname: "Псевдоним",
          city: "Город",
        },
        hasAdd: false,
        hasSelecting: true,
        hasSearch: true,
        showIndexes: true,
      }
    }
  },
  methods: {
    searchUser(list, input) {
      this.tableData = this.users.list.filter(value => value.ukr.nickname.indexOf(input) === 0);
    },
    sendUsers() {
      this.$emit('getSelectedUsers', Array.from(this.$refs.table.selectedItems));
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
  mounted() {
    database.listenData(this.ref, this.updateBox.bind(this));
  }
}
</script>

<style lang="scss" scoped>
.users-table {
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

.controls {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  padding-bottom: 40px;
}
</style>
