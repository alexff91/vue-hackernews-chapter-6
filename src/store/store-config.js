import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  activeType: null,
  itemsPerPage: 20,
  items: {},
  users: {},
  lists: {
    top: []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
