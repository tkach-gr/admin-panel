<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title data-container__title">{{ settings.title }}</div>
      <input
          v-if="settings.hasSearch"
          v-model="search"
          @input="$emit('search', list, search)"
          type="text"
          class="form-control search"
          placeholder="Поиск"
      >
      <button
          v-if="settings.hasAdd !== false"
          @click="$emit('addItem')"
          class="btn btn-default btn-add"
      >
        Добавить
      </button>
    </div>
    <div class="card-body p-0">
      <table class="table table-bordered">
        <thead>
          <tr class="table__row">
            <th v-if="settings.hasSelecting"></th>
            <th :key="prop" v-for="prop in settings.props" class="table__cell">{{ prop }}</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="item" v-for="item in list" class="table__row">
            <td v-if="settings.hasSelecting" class="table__checkbox">
              <input
                  @click="toggleSelect(item)"
                  :checked="selectedItems.has(item)"
                  type="checkbox"
              >
            </td>
            <td :key="key" v-for="(prop, key) in settings.props" class="table__cell table__data">
              {{ getContent(item)[key] }}
            </td>
            <td v-if="settings.hasEdit && item.isEditable !== false" class="data__btn">
              <button @click="$emit('editItem', item)" class="btn btn-default">Редактировать</button>
            </td>
            <td v-if="settings.hasDelete && item.isDeletable !== false" class="data__btn">
              <button  @click="$emit('deleteItem', item)" class="btn btn-default">Удаление</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: ["list", "settings", "lang"],
  data() {
    return {
      search: "",
      selectedItems: new Set(),
      lastSelected: null,
    };
  },
  methods: {
    toggleSelect(item) {
      if(this.selectedItems.has(item)) {
        this.selectedItems.delete(item);
      } else {
        this.selectedItems.add(item);
      }
    },
    getContent(item) {
      if(this.lang !== null) return item.ukr;
      return item;
    }
  }
}
</script>

<style lang="scss" scoped>
  
  .card-header {
    display: flex;
    align-items: center;
  }

  .card-title {
    flex: 100px 1 1;
    text-align: left;
  }

  .search {
    max-width: 200px;
    margin-left: 30px;
  }

  .btn-add {
    margin-left: 30px;
  }

  .table {
    border: 0;
  }

  .table__checkbox {
    vertical-align: middle;
  }

  .table__row {
    border: 0;
  }

  .table__cell {
    width: 450px;
    vertical-align: middle;
  }

  .table__row:nth-child(2n + 1) .table__data {
    background-color: #F2F2F2;
  }

  .data__btn {
    border: 0;
    padding: 0 !important;
    vertical-align: middle;
  }

  .data__btn .btn {
    margin-left: 15px;
    margin-right: 15px;
  }
</style>