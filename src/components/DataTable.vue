<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title data-container__title">{{ settings.title }}</div>
      <button @click="$emit('addItem')" class="btn btn-default">Добавить</button>
    </div>
    <div class="card-body p-0">
      <table class="table table-bordered">
        <thead>
          <tr class="table__row">
            <th :key="prop" v-for="prop in settings.props" class="table__cell">{{ prop }}</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="item" v-for="item in list" class="table__row">
            <td :key="key" v-for="(prop, key) in settings.props" class="table__cell table__data">
              {{ item[lang][key] }}
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
  props: ["list", "settings", "lang"]
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

  .table {
    border: 0;
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