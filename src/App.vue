<template>
  <RouterView/>
</template>

<script>
import AccountManager from "@/scripts/AccountManager.js";

let accountManager = new AccountManager();
accountManager.getMail();

export default {
  name: "App",

};
</script>

<style lang="scss">

</style>
