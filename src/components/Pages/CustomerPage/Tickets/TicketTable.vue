<template>
  <div class="ticket-table">
    <table class="ticket-table__container">
      <thead class="ticket-table__head">
      <tr class="ticket-table__head-row">
        <th
            v-for="item in settings.props"
            :key="item"
            class="ticket-table__cell"
        >{{ item }}</th>
      </tr>
      </thead>
      <tbody class="ticket-table__body">
      <tr
          v-for="(item, index) in tickets"
          :key="index"
          class="ticket-table__row"
      >
        <td
            v-for="(value, key) in settings.props"
            class="ticket-table__cell"
        >{{ item[key] }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TicketTable",
  props: ["lang", "settings", "tickets"],
};
</script>

<style lang="scss" scoped>
.ticket-table {
  border-top: black 1px solid;
  border-left: black 1px solid;
  border-right: black 1px solid;
  border-radius: 0.25rem;
  overflow: hidden;
}

.ticket-table__container {
  width: 100%;
}

.ticket-table__row {
  border-bottom: black 1px solid;
}

.ticket-table__row:nth-child(2n + 1) {
  background-color: #e7e7e7;
}

.ticket-table__head-row {
  border-bottom: black 2px solid;
}

.ticket-table__cell {
  padding: 16px 20px;
  text-align: center;
  width: 227.6px;
}
</style>