<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
    </div>
    <div class="card-body">
      <SendingModeSelection ref="modeSelection" @selectUsers="selectUsers" />
      <div class="template-body">
        <slot ref="content" :selectedUsers="selectedUsers" :sendingEvent="sendingEvent"></slot>
      </div>
      <div class="controls">
        <button @click="send" class="btn btn-default">Начать рассылку</button>
      </div>
    </div>
  </div>
</template>

<script>
import SendingModeSelection from "./SendingModeSelection.vue";
import SmsSendingContent from "./SmsSendingContent.vue";
import database from "@/scripts/database";
import Event from "@/scripts/Event";

let sendingEvent = new Event();

export default {
  name: "SendingTemplate",
  props: ["title", "selectedUsers"],
  components: {
    SendingModeSelection,
    SmsSendingContent
  },
  data() {
    return {
      sendingEvent: sendingEvent
    };
  },
  methods: {
    selectUsers() {
      this.$emit("selectUsers");
    },
    send() {
      const info = this.sendingEvent.getInfo();

      if(info.message === null || this.selectedUsers.length === 0) { return; }

      const data = {
        message: info.message,
        mode: this.$refs.modeSelection.mode,
        users: this.selectedUsers,
      };

      database.pushData(info.ref, data)

      this.imitateStatistics();
    },
    imitateStatistics() {
      let count = 0;
      let amount = this.selectedUsers.length;
      let notifier = () => {
        if(count < amount) {
          this.sendingEvent.notify(++count);
          setTimeout(notifier, 1000);
        }
      }

      setTimeout(notifier, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.template-body {
  margin-top: 30px;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 15px;
}
</style>