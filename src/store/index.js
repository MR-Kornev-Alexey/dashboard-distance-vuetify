import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageNumber: 1,
    error: null,
    error_message: "",
    distances: [],
    number: 0,
    isSortingCity: false,
    isSortingNumber: false,
    isSortingDistance: false,
    isFilteringCity: false
  },
  mutations: {
    CLEAR_ERROR_FILTER(state){
      state.error_message = ""
      state.error = false
    },
    SET_ERROR_FILTER(state,message){
      state.error_message = message
      state.error = true
    },
    SET_DISTANCES_TO_STATE(state, payload) {
      state.distances = payload
    },
    SET_NUMBER_DIST_TO_STATE(state, payload) {
      state.number = payload;
    },
    SET_IS_FILTERING_CITY_TO_STATE(state){
      state.isFilteringCity = true;
    },
    SET_IS_SORTING_CITY_TO_STATE(state) {
      state.isSortingCity = true;
      state.isSortingNumber = false;
      state.isSortingDistance = false;
    },
    SET_IS_SORTING_NUMBER_TO_STATE(state) {
      state.isSortingCity = false;
      state.isSortingNumber = true;
      state.isSortingDistance = false;
    },
    SET_IS_SORTING_DIST_TO_STATE(state) {
      state.isSortingCity = false;
      state.isSortingNumber = false;
      state.isSortingDistance = true;
    },
    CLEAR_IS_SORTING_ALL_TO_STATE(state) {
      state.isSortingCity = false;
      state.isSortingNumber = false;
      state.isSortingDistance = false;
    }
  },
  actions: {
    FILTER_FROM_API({ commit }, searchData,typeData,compareData,pageNumber, distPerPage){
      commit("CLEAR_ERROR_FILTER")
      const url = "http://localhost:3000/filterdist";
      const data = {
        searchData: searchData,
        typeData: typeData,
        compareData: compareData,
        pageNumber: pageNumber,
        distPerPage: distPerPage
      };
      if(searchData.typeData === 'city'&& (searchData.compareData === ">" || searchData.compareData === "<")){
        commit("SET_ERROR_FILTER", "Для колонки НАЗВАНИЕ  работают только условие СОДЕРЖИТ или РАВНО")
        return false
      }

      return axios
          .post(url, data)
          .then(response => {
            commit("SET_DISTANCES_TO_STATE", response.data.distances);
            commit("CLEAR_IS_SORTING_ALL_TO_STATE");
            commit("SET_IS_FILTERING_CITY_TO_STATE");
            commit("SET_NUMBER_DIST_TO_STATE", response.data.count);
            })
              .catch(error => {
                  console.log(error);
                  return error;
                });

    },
    SORTING_FROM_API({ commit }, { pageNumber, distPerPage, SortingType }) {
      const url = "http://localhost:3000/sortingdist";
      const data = {
        pageNumber: pageNumber,
        distPerPage: distPerPage,
        SortingType: SortingType
      };
      return axios
        .post(url, data)
        .then(response => {
          commit("SET_DISTANCES_TO_STATE", response.data);
          if (SortingType === "city") {
            commit("SET_IS_SORTING_CITY_TO_STATE");
          } else if (SortingType === "number") {
            commit("SET_IS_SORTING_NUMBER_TO_STATE");
          } else if (SortingType === "distance") {
            commit("SET_IS_SORTING_DIST_TO_STATE");
          } else {
            commit("CLEAR_IS_SORTING_ALL_TO_STATE");
          }
          return response;
        })
        .catch(error => {
          console.log(error);
          return error;
        });
    },

    GET_DISTANCES_FROM_API({ commit }, { pageNumber, distPerPage }) {
      const url = "http://localhost:3000/getfaker";
      const data = { pageNumber: pageNumber, distPerPage: distPerPage };
      return axios
        .post(url, data)
        .then(response => {
          commit("SET_DISTANCES_TO_STATE", response.data.distances);
          commit("CLEAR_IS_SORTING_ALL_TO_STATE");
          commit("SET_NUMBER_DIST_TO_STATE", response.data.count);
          return response;
        })
        .catch(error => {
          console.log(error);
          return error;
        });
    }
  },
  getters: {
    PAGE_NUMBER:state => state.pageNumber,
    ERROR_MESSAGE:state => state.error_message,
    DISTANCES: state => state.distances,
    NUMBER: state => state.number,
    IS_SORTING_CITY: state => state.isSortingCity,
    IS_SORTING_NUMBER: state => state.isSortingNumber,
    IS_SORTING_DISTANCE: state => state.isSortingDistance,
    IS_FILTERING_CITY: state => state.isFilteringCity,
    GET_ERROR: state => state.error
  }
});
