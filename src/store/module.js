import { NewsMutAtion } from './mutations.js'
import { NewsAction } from './actions.js'
import { newGetters } from './getters.js'

const state = {
	pageTotal:0,
	aaa:"aaaa"
}

export default{
	state,
    actions: NewsAction,
    getters: newGetters,
    mutations: NewsMutAtion
}