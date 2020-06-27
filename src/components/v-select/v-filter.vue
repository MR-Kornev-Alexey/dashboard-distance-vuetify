<template>
  <div>
    <v-row justify="center">
      <v-alert
        :value="error"
        border="right"
        color="blue-grey"
        type="warning"
        dark
      >
        {{ ERROR_MESSAGE }}
      </v-alert>
    </v-row>
    <v-row justify="center">
      <form class="d-flex" @submit.prevent="filterData">
        <v-col class="d-flex v-select" cols="3">
          <v-select
            :v-model="selectItem"
            :items="items"
            label="Выберите колонку"
            outlined
            @change.capture="onChange($event, 0)"
          ></v-select>
        </v-col>
        <v-col class="d-flex v-select" cols="3">
          <v-select
            :v-model="selectCompare"
            :items="compareItem"
            label="Выберите условие"
            outlined
            @change.capture="onChange($event, 1)"
          ></v-select>
        </v-col>
        <div class=" d-flex flex-column ml-5 col-3">
          <label for="custom"></label>
          <input
            class="input"
            id="custom"
            required
            v-model="search"
            name="search"
            type="text"
            placeholder="...поиск"
          />
          <small class="form-text text-muted ">введите данные</small>
        </div>
        <div class="col-3">
          <v-btn large type="submit">Фильтр</v-btn>
        </div>
      </form>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-filter",
  computed: {
    ...mapGetters(["GET_ERROR", "ERROR_MESSAGE", "PAGE_NUMBER"]),
    error() {
      return this.GET_ERROR;
    }
  },
  data: () => ({
    search: "",
    selectItem: "",
    selectCompare: "",
    selected: [],
    items: ["Название", "Количество", "Расстояние"],
    compareItem: ["Равно", "Содержит", "Больше", "Меньше"],
    filterTypeDistance: {
      Название: "city",
      Количество: "number",
      Расстояние: "distance"
    },
    filterCompareDistance: {
      Равно: "=",
      Содержит: "contains",
      Больше: ">",
      Меньше: "<"
    }
  }),
  methods: {
    ...mapActions(["FILTER_FROM_API"]),
    onChange(event, index) {
      this.selected[index] = event;
    },
    filterData() {
      const searchData = this.search,
        typeData = this.filterTypeDistance[this.selected[0]],
        compareData = this.filterCompareDistance[this.selected[1]];
      this.FILTER_FROM_API({
        searchData,
        typeData,
        compareData,
        pageNumber: this.PAGE_NUMBER,
        distPerPage: 10
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-select {
  width: 300px;
}

.input {
  height: 32px;
}
</style>
