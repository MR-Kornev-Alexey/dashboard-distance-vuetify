<template>
  <v-container>
    <v-row justify="center">
      <h1 class="mt-4 mb-4 ">Таблица данных</h1>
    </v-row>
    <v-filter/>
   <v-table-distance />
  </v-container>
</template>

<script>
import vTableDistance from "./v-table-distance/v-table-distance";
import vFilter from "./v-select/v-filter"
export default {
  name: "v-main-wrap",
  components: {
    vTableDistance,
    vFilter
   },
   data() {
     return {
       search: "",
      }
   },
   };
</script>

<style lang="scss" scoped>
  .input {
    height: 32px;
  }
</style>
