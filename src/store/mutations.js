import { INIT_PAGETOTAL } from './type.js'

export const NewsMutAtion = {
   [INIT_PAGETOTAL](state,action){
   		state.pageTotal = action.pageTotal
   }
}
