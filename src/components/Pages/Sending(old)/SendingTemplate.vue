<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
    </div>
    <div class="card-body">
      <SendingModeSelection @selectUsers="selectUsers" />
      <SmsSendingContent ref="sms" :setPropertyNotifier="setPropertyNotifier"></SmsSendingContent>
      <div class="controls">
        <button class="btn btn-default">Начать рассылку</button>
      </div>
    </div>
  </div>
</template>

<script>
import SendingModeSelection from "./SendingModeSelection.vue";
import SmsSendingContent from "./SmsSendingContent.vue";

export default {
  name: "SendingTemplate",
  props: ["title"],
  components: {
    SendingModeSelection,
    SmsSendingContent
  },
  data() {
    return {
      notifier: {
        callback: null
      },
      selectedUsers: [],
      sentMessagesAmount: 0,
      totalMessagesAmount: 0,
    };
  },
  methods: {
    pushUser(user) {
      this.selectedUsers.push(user);
      this.totalMessagesAmount++;
      this.notify();
    },
    selectUsers() {
      this.$emit("selectUsers", user => this.pushUser(user));
    },
    setPropertyNotifier(callback) {
      this.notifier.callback = callback;
    },
    notify() {
      // if(this.notifier.callback) {
      //   this.notifier.callback(this.sentMessagesAmount, this.totalMessagesAmount);
      // }
      console.log(this.$refs) // this.$refs.sms.totalMessagesAmount = 233;
    }
  }
};
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 15px;
}
</style>