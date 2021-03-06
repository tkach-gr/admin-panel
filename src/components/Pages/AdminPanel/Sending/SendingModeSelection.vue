<template>
  <div class="selection">
    <div class="selection__title">Выбрать пользователей</div>
    <div class="input-row" @click="mode = 'all'">
      <input
          v-model="mode"
          type="radio"
          value="all"
          class="selection__input"
      >
      <label class="selection__label">Все пользователи</label>
    </div>
    <div class="input-row" @click="mode = 'random'">
      <input
          v-model="mode"
          type="radio"
          value="random"
          class="selection__input"
      >
      <label class="selection__label">Выборочно</label>
    </div>
    <button @click="$emit('selectUsers')" class="btn btn-default selection__btn">Выбрать пользователей</button>
  </div>
</template>

<script>
export default {
  name: "SendingModeSelection",
  data() {
    return {
      mode: "all",
    };
  }
};
</script>

<style lang="scss" scoped>
.selection {
  display: flex;
  align-items: center;
}

.input-row {
  display: flex;
  align-items: center;
  margin-left: 30px;
  cursor: pointer;
}

.selection__input {

}

.selection__label {
  flex-shrink: 0;
  margin-left: 10px;
  margin-bottom: 0;
  cursor: pointer;
}

.selection__btn {
  margin-left: 40px;
}
</style>