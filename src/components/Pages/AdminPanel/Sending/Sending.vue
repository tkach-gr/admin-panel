<template>
  <template v-if="!isSelectingUsers">
    <SendingTemplate :title="'SMS'" :selectedUsers="selectedSmsUsers" @selectUsers="selectUsers('sms')">
      <template v-slot:default="slotProps">
        <SmsSendingContent
            :selectedUsers="slotProps.selectedUsers"
            :sendingEvent="slotProps.sendingEvent"
        />
      </template>
    </SendingTemplate>
    <SendingTemplate :title="'E-mail'" :selectedUsers="selectedMailUsers" @selectUsers="selectUsers('mail')">
      <template v-slot:default="slotProps">
        <MailSendingContent
            :selectedUsers="slotProps.selectedUsers"
            :sendingEvent="slotProps.sendingEvent"
        />
      </template>
    </SendingTemplate>
  </template>
  <UsersSelectingForm v-else-if="isSelectingUsers" @getSelectedUsers="getSelectedUsers" />
</template>

<script>
import SendingTemplate from "./SendingTemplate.vue";
import SmsSendingContent from "./SmsSendingContent.vue";
import MailSendingContent from "./MailSendingContent.vue";
import UsersSelectingForm from "./UsersSelectingForm.vue";

export default {
  name: "Sending",
  components: {
    SendingTemplate,
    SmsSendingContent,
    MailSendingContent,
    UsersSelectingForm
  },
  data() {
    return {
      isSelectingUsers: false,
      selectedSmsUsers: [],
      selectedMailUsers: [],
      selectionCustomer: null
    };
  },
  methods: {
    selectUsers(customer) {
      this.isSelectingUsers = true;
      this.selectionCustomer = customer;
    },
    getSelectedUsers(selectedUsers) {
      this.isSelectingUsers = false;

      if(this.selectionCustomer === "sms") {
        this.selectedSmsUsers = selectedUsers;
      } else if(this.selectionCustomer === "mail") {
        this.selectedMailUsers = selectedUsers;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.template-content {
  margin-top: 40px;
}
</style>