<template>
  <template v-if="!isSelectingUsers">
    <SendingTemplate :title="'SMS'" :selectedUsers="selectedUsers" @selectUsers="selectUsers">
      <template v-slot:default="slotProps">
        <SmsSendingContent
            :selectedUsers="slotProps.selectedUsers"
            :sendingEvent="slotProps.sendingEvent"
        />
      </template>
    </SendingTemplate>
    <SendingTemplate :title="'E-mail'" @selectUsers="selectUsers">

    </SendingTemplate>
  </template>
  <UsersSelectingForm v-else-if="isSelectingUsers" @getSelectedUsers="getSelectedUsers" />
</template>

<script>
import SendingTemplate from "./SendingTemplate.vue";
import SmsSendingContent from "./SmsSendingContent.vue";
import UsersSelectingForm from "./UsersSelectingForm.vue";

export default {
  name: "Sending",
  components: {
    SendingTemplate,
    SmsSendingContent,
    UsersSelectingForm
  },
  data() {
    return {
      isSelectingUsers: false,
      selectedUsersCallback: null,
      selectedUsers: [],
    };
  },
  methods: {
    selectUsers() {
      this.isSelectingUsers = true;
    },
    getSelectedUsers(selectedUsers) {
      this.isSelectingUsers = false;
      this.selectedUsers = selectedUsers;
    },
  },
};
</script>

<style lang="scss" scoped>
.template-content {
  margin-top: 40px;
}
</style>