<template>
  <v-app>
    <v-app-nav />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import vAppNav from "./components/v-app-nav/v-app-nav";
export default {
  name: "App",
  components: {
    vAppNav
  }
};
</script>
