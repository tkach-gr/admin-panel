<template>
  <div class="sms-sending">
    <div class="text-area sms-sending__item">
      <div class="text-area__head">
        <div class="text-area__title">Текст SMS</div>
        <div class="text-area__symbols">Символов: {{ messageLength }}</div>
      </div>
      <textarea
          v-model="message"
          @input="isSentEmptyMessage = false"
          :class="{ emptymessage: isSentEmptyMessage }"
          class="form-control"
          rows="10"
          placeholder="Введите текст"
      >
        {{ message }}
      </textarea>
    </div>
    <div class="sending-progress sms-sending__item">
      <div class="sending-progress__row">
        <div class="sending-progress__row-title">Кол-во SMS:</div>
        <div class="sending-progress__row-value">{{ sentMessagesAmount }} из {{ totalMessagesAmount }}</div>
      </div>
      <div class="sending-progress__row">
        <div class="sending-progress__row-title">Рассылка выполнена на:</div>
        <div class="sending-progress__row-value">{{ progress }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmsSendingContent",
  props: ["selectedUsers", "sendingEvent"],
  data() {
    return {
      sourceRef: "sending/sms",
      message: "",
      messageLength: 0,
      progress: 0,
      sentMessagesAmount: 0,
      totalMessagesAmount: 0,
      isSentEmptyMessage: false,
    };
  },
  methods: {
    calculateProgress() {
      if(this.sentMessagesAmount !== 0) {
        this.progress = Math.floor(this.sentMessagesAmount / this.totalMessagesAmount * 100);
      } else {
        this.progress = 0;
      }
    },
    notify() {
      if(this.message !== "") {
        return { ref: this.sourceRef, message: this.message };
      } else {
        this.isSentEmptyMessage = true;
        return { ref: this.sourceRef, message: null};
      }
    }
  },
  watch: {
    message(newValue) {
      this.messageLength = newValue.length;
    },
    sentMessagesAmount(newValue) {
      this.calculateProgress();
    },
    totalMessagesAmount(newValue) {
      this.calculateProgress();
    },
  },
  mounted() {
    if(this.selectedUsers !== undefined) {
      this.totalMessagesAmount = this.selectedUsers.length;
    }

    this.sendingEvent.subscribe(num => this.sentMessagesAmount = num);
    this.sendingEvent.setInformant(() => this.notify());
  }
};
</script>

<style lang="scss" scoped>
.sms-sending {
  display: flex;
  justify-content: space-between;
}

.emptymessage {
  border-color: rgb(255, 0, 0) !important;
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