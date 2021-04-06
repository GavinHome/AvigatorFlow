<template>
  <div class="home">
    <Flow
      :isSilentMode="false"
      :bodyStyle="{
        'padding-left': '50px',
        'padding-right': '50px',
        height: '85%',
      }"
    >
      <h3 slot="title" class="text-center" style="margin: 20px">
        AvigatorFlow
      </h3>
    </Flow>
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
