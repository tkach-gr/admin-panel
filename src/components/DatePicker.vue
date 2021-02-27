<template>
  <datepicker 
    v-model="picked"
    class="datepicker form-control" />
</template>

<script>
import Datepicker from 'vue3-datepicker';

function getDate(str) {
  let cells = str.split('.');
  cells[1] -= 1;
  return new Date(...cells.reverse());
}

export default {
  name: "DatePicker",
  props: ['date'],
  components: {
    Datepicker
  },
  data() {
    return {
      picked: new Date()
    }
  },
  watch: {
    picked(newValue) {
      this.$emit('changeDate', newValue);
    }
  },
  mounted() {
    this.picked = getDate(this.date);
  }
}
</script>

<style lang="scss" scoped>
.v3dp__datepicker {
  --elem-hover-bg-color: var(--vdp-hover-bg-color, #007BFF);
  --elem-selected-bg-color: var(--vdp-selected-bg-color, #007BFF);
}
</style>