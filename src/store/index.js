import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations'
import getters from "./getters";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pageNumber: 1,
        error: null,
        error_message: "",
        distances: [],
        number: 0,

        isEquallyCity: "",
        isContainsCity: "",

        isFilteringCity: false,
        isFilteringNumber:false,
        isFilteringDistance:false,

        isSortingCity: false,
        isSortingNumber: false,
        isSortingDistance: false,


        isSearchData: "",
        isTypeData: "",
        isCompareData: ""
    },
    mutations,
    actions,
    getters
});
