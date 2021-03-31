<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Portal msg="Welcome to Your AvigatorFlow App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Portal from "@/components/Portal.vue";

export default {
  name: "Home",
  components: {
    Portal,
  },
};
</script>
