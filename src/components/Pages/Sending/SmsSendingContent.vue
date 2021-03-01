<template>
  <div class="sms-sending">
    <div class="text-area sms-sending__item">
      <div class="text-area__head">
        <div class="text-area__title">Текст SMS</div>
        <div class="text-area__symbols">Символов: {{ messageLength }}</div>
      </div>
      <textarea v-model="message" rows="10" class="form-control" placeholder="Введите текст">
        {{ message }}
      </textarea>
    </div>
    <div class="sending-progress sms-sending__item">
      <div class="sending-progress__row">
        <div class="sending-progress__row-title">Кол-во SMS:</div>
        <div class="sending-progress__row-value">{{ sentMessagesAmount }} из {{ totalMessagesAmount }}</div>
        <input class="form-control" type="text" v-model="totalMessagesAmount">
      </div>
      <div class="sending-progress__row">
        <div class="sending-progress__row-title">Рассылка выполнена на:</div>
        <div class="sending-progress__row-value">{{ progress }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmsSendingContent",
  props: ["setPropertyNotifier"],
  data() {
    return {
      message: "",
      messageLength: 0,
      progress: 0,
      sentMessagesAmount: 0,
      totalMessagesAmount: 0,
    };
  },
  methods: {
    calculateProgress() {
      if(this.sentMessagesAmount !== 0) {
        this.progress = this.totalMessagesAmount / this.sentMessagesAmount;
      } else {
        this.progress = 0;
      }
    }
  },
  watch: {
    message(newValue) {
      this.messageLength = newValue.length;
    }
  },
  mounted() {
    this.setPropertyNotifier((sent, total) => {
      console.log({sent, total})
      this.sentMessagesAmount = sent;
      this.totalMessagesAmount = total;
      console.log(this);
    });
    console.log("123");
  }
};
</script>

<style lang="scss" scoped>
.sms-sending {
  display: flex;
  justify-content: space-between;
}

.sms-sending__item {
  flex: 48% 0 0;
}

.text-area__head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
}

.sending-progress {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sending-progress__row {
  display: flex;
  margin-top: 10px;
}

.sending-progress__row:first-child {
  margin-top: 0;
}

.sending-progress__row-value {
  margin-left: 10px;
}
</style>