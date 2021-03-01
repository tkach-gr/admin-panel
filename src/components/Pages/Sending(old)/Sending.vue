<template>
  <template v-if="!isSelectingUsers">
    <SendingTemplate :title="'SMS'" @selectUsers="selectUsers">
<!--      <template v-slot:default="setPropertyNotifier">-->
<!--        <SmsSendingContent :setPropertyNotifier="setPropertyNotifier" class="template-content" />-->
<!--      </template>-->
    </SendingTemplate>
    <SendingTemplate :title="'E-mail'" @selectUsers="selectUsers">

    </SendingTemplate>
  </template>
  <UsersSelectingForm v-else-if="isSelectingUsers" @getSelectedUsers="getSelectedUsers" />
</template>

<script>
import SendingTemplate from "./SendingTemplate.vue";
import UsersSelectingForm from "./UsersSelectingForm.vue";
import SmsSendingContent from "./SmsSendingContent.vue";

export default {
  name: "Sending",
  components: {
    SendingTemplate,
    UsersSelectingForm,
    SmsSendingContent
  },
  data() {
    return {
      isSelectingUsers: false,
      selectedUsersCallback: null
    };
  },
  methods: {
    selectUsers(callback) {
      this.isSelectingUsers = true;
      this.selectedUsersCallback = callback;
    },
    getSelectedUsers(selectedUsers) {
      selectedUsers.map(item => this.selectedUsersCallback(item));

      this.isSelectingUsers = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.template-content {
  margin-top: 40px;
}
</style>