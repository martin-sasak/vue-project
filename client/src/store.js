import Vue from 'vue';
import Vuex from 'vuex';

import { defaultClient as apolloClient } from './main';
import { GET_TRANSPORTERS, GET_CONSIGNMENTS, CREATE_CONSIGNMENT } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    transporters: [],
    consignments: [],
  },
  mutations: {
    setTransporters: (state, payload) => {
      state.transporters = payload;
    },
    setConsignments: (state, payload) => {
      state.consignments = payload;
    },
  },
  actions: {
    getTransporters: ({ commit }) => {
      apolloClient
        .query({
          query: GET_TRANSPORTERS,
        })
        .then(({ data }) => {
          commit('setTransporters', data.getTransporters);
        })
        .catch(error => console.error(error));
    },
    getConsignments: ({ commit }) => {
      apolloClient
        .query({
          query: GET_CONSIGNMENTS,
        })
        .then(({ data }) => {
          commit('setConsignments', data.getConsignments);
        })
        .catch(error => console.error(error));
    },
    createConsignment: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: CREATE_CONSIGNMENT,
          variables: payload
        })
        .then(({ data }) => {
          console.log('som tu');
          console.log(data.createConsignment);
        })
        .catch(error => console.error(error));
    }
  },
  getters: {
    transporters: state => {
      return state.transporters;
    },
    consignments: state => {
      return state.consignments;
    },
  }
});
