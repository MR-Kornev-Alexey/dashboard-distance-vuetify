<template>
  <v-app-bar app color="#222c56" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        :src="require('@/assets/logo_green.png')"
        transition="scale-transition"
        width="60"
      />
    </div>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: "v-app-nav"
};
</script>

<style scoped></style>
