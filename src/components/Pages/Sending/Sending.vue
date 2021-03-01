<template>
  <template v-if="!isSelectingUsers">
    <SendingTemplate :title="'SMS'" :selectedUsers="selectedUsers" @selectUsers="selectUsers">

    </SendingTemplate>
    <SendingTemplate :title="'E-mail'" @selectUsers="selectUsers">

    </SendingTemplate>
  </template>
  <UsersSelectingForm v-else-if="isSelectingUsers" @getSelectedUsers="getSelectedUsers" />
  <ul>
    <li :key="item" v-for="item in selectedUsers">{{ item.ukr.nickname }}</li>
  </ul>
</template>

<script>
import SendingTemplate from "./SendingTemplate.vue";
// import SmsSendingContent from "./SmsSendingContent.vue";
import UsersSelectingForm from "./UsersSelectingForm.vue";

export default {
  name: "Sending",
  components: {
    SendingTemplate,
    // SmsSendingContent,
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
    selectUsers(callback) {
      this.isSelectingUsers = true;
      this.selectedUsersCallback = callback;
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