<template>
  <v-container>
    <h1 class="mt-4 mb-4">Таблица</h1>
    <v-table-distance />
  </v-container>
</template>

<script>
import vTableDistance from "./v-table-distance/v-table-distance";
export default {
  name: "v-main-wrap",
  components: {
    vTableDistance
  },
  data: () => ({})
};
</script>

<style lang="scss" scoped></style>
