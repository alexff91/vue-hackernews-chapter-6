import {
  fetchUser,
  fetchItems,
  fetchIdsByType
} from '../api/api'

export default {
  FETCH_LIST_DATA: ({ commit, dispatch, state, getters }, { type }) => {
    commit('SET_ACTIVE_TYPE', { type })
    return fetchIdsByType(type)
      .then(ids => commit('SET_LIST', { type, ids }))
      .then(() => dispatch('FETCH_ITEMS', {
        ids: getters.activeIds
      }))
  },

  FETCH_ITEMS: ({ commit, state }, { ids }) => {
    const fileredIds = ids.filter(id => !state.items[id])
    if (fileredIds.length) {
      return fetchItems(fileredIds).then(items => commit('SET_ITEMS', { items }))
    } else {
      return Promise.resolve()
    }
  },

  FETCH_USER: ({ commit, state }, { id }) => {
    return state.users[id]
      ? Promise.resolve(state.users[id])
      : fetchUser(id).then(user => commit('SET_USER', { id, user }))
  }
}
