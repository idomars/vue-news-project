import { INIT_PAGETOTAL } from './type.js'

export const NewsAction = {
    initPageTotal({ commit, state }, param) {
      
        commit(INIT_PAGETOTAL,param);
    }
}
