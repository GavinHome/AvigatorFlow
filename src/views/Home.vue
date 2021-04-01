<template>
  <div class="home">
    <Portal title="AvigatorFlow" />
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
