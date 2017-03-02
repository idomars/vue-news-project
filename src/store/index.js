import Vue from 'vue'
import Vuex from 'vuex'
import state from './module.js'
import createLogger from 'vuex/dist/logger'
import { NewsMutAtion } from './mutations.js'
import { NewsAction } from './actions.js'
import { newGetters } from './getters.js'

Vue.use(Vuex);


const store = new Vuex.Store({
	state,
	actions: NewsAction,
    getters: newGetters,
    mutations: NewsMutAtion,
	plugins: [createLogger()],
 	strict: process.env.NODE_ENV !== 'production'
});

// if (module.hot) {
//   module.hot.accept(['./modules'], () => {
//     const newMutations = require('./modules').default

//     store.hotUpdate({
//       mutations: newMutations
//     })
//   })
// }

export default store