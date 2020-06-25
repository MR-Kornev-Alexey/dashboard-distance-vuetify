import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    distances: [],
    number: 0,
    isSortingCity: false,
    isSortingNumber: false,
    isSortingDistance: false
  },
  mutations: {
    SET_DISTANCES_TO_STATE(state, payload) {
      state.distances = payload;
    },
    SET_NUMBER_DIST_TO_STATE(state, payload) {
      state.number = payload;
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
    GET_NUMBER_DIST_FROM_API({ commit }) {
      const url = "http://localhost:3000/getnumberdist";
      return axios
        .get(url)
        .then(resp => {
          commit("SET_NUMBER_DIST_TO_STATE", resp.data);
          return resp.data;
        })
        .catch(error => {
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
          commit("SET_DISTANCES_TO_STATE", response.data);
          commit("CLEAR_IS_SORTING_ALL_TO_STATE");
          return response;
        })
        .catch(error => {
          console.log(error);
          return error;
        });
    }
  },
  getters: {
    DISTANCES: state => state.distances,
    NUMBER: state => state.number.counter,
    IS_SORTING_CITY: state => state.isSortingCity,
    IS_SORTING_NUMBER: state => state.isSortingNumber,
    IS_SORTING_DISTANCE: state => state.isSortingDistance
  }
});
