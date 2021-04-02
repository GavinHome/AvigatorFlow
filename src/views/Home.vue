<template>
  <div class="home">
    <Flow title="AvigatorFlow" :isSilentMode="false" />
  </div>
</template>

<script>
// @ is an alias to /src
import Flow from "@/components/Flow.vue";

export default {
  name: "Home",
  components: {
    Flow,
  },
};
</script>
