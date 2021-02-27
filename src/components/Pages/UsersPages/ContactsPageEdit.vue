<template>
  <CinemaInfo
      v-for="item in list"
      :key="item"
      :page="item"
      :sourceRef="sourceRef"
  />
</template>

<script>
import CinemaInfo from "./CinemaInfo";

export default {
  name: "ContactsPageEdit",
  props: ["sourceRef", "list"],
  components: {
    CinemaInfo
  },
  data() {
    return {

    }
  }
}
</script>