import Vuex from 'vuex'

import State from './Global/state'
import Getters from './Global/getters'
import Mutations from './Global/mutations'
import Actions from './Global/actions'

import Salat from './Salat'

export default () => {
  return new Vuex.Store({
    modules: {
      Salat
    },
    state: State,
    getters: Getters,
    mutations: Mutations,
    actions: Actions
  })
}
