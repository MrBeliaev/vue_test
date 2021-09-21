import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import getPayments from '../mocks/getPayments';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: false,
    keepData: [],
  }),

  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
      state.keepData = state.data;
    },
    filterRows(state, money) {
      state.data = state.keepData.filter((row) => row.money <= money);
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      commit('setState', { isLoading: true });
      try {
        let res = null;
        // if getitem localStorage
        if (process.env.NODE_ENV === 'production') {
          res = await api.getPayments(params);
        } else {
          res = await getPayments(params);
        }
        const { data } = res;
        if (Array.isArray(data)) {
          commit('setState', { data });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },
  },
});
