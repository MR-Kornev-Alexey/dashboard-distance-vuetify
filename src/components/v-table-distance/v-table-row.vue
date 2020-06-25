<template>
  <div class="v-table-row mb-2 align-content-center">
    <div class="dist_time mt-2">
      {{ time }}
    </div>
    <div class="dist_city d-flex justify-start  mt-2">
      {{ row_data.city }}
    </div>
    <div class="dist_city d-flex justify-start mt-2">
      {{ row_data.number }}
    </div>
    <div class="dist_city d-flex justify-start  mt-2">
      {{ row_data.distance }}
    </div>
  </div>
</template>

<script>
export default {
  name: "v-table-row",
  data() {
    return {
      data: ""
    };
  },
  computed: {
    time() {
      return new Date(this.row_data.data);
    }
  },
  props: {
    row_data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style lang="scss">
.v-table-row {
  display: flex;
  justify-content: space-between;
}
</style>
