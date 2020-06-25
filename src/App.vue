<template>
  <v-app>
    <v-app-nav />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import vAppNav from "./components/v-app-nav/v-app-nav";

export default {
  name: "App",

  components: {
    vAppNav
  },

  data: () => ({
    //
  })
};
</script>
