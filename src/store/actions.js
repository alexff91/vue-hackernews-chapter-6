import {
  fetchUser,
  fetchItems,
  fetchIdsByType
} from '../api/api'

export default {
  fetchListData: ({ commit, dispatch, state, getters }, { type }) => {
    commit('setActiveType', { type })
    return fetchIdsByType(type)
      .then(ids => commit('setList', { type, ids }))
      .then(() => dispatch('fetchItems', {
        ids: getters.activeIds
      }))
  },

  fetchItems: ({ commit, state }, { ids }) => {
    const filteredIds = ids.filter(id => !state.items[id])
    if (filteredIds.length) {
      return fetchItems(filteredIds).then(items => {
        commit('setItems', { items })
      })
    } else {
      return Promise.resolve()
    }
  },

  fetchUser: ({ commit, state }, { id }) => {
    return state.users[id]
      ? Promise.resolve(state.users[id])
      : fetchUser(id).then(user => commit('setUser', { id, user }))
  }
}
