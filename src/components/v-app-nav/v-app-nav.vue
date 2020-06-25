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
    <v-btn text v-if="isUserAuthentication">
      <span class="mr-2">Контакты</span>
      <v-icon>mdi-account-box-multiple</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: "v-app-nav",
  data() {
    return {
      checkAuthorization: false
    };
  },
  computed: {
    isUserAuthentication: function() {
      return this.$store.getters.IS_USER_AUTHENTICATED;
    }
  }
};
</script>

<style scoped></style>
