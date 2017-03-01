import Vue from 'vue'
import Vuex from 'vuex'
import state from './module.js'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);


const store = new Vuex.Store({
	modules:{
		state
	},
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