import Vue from 'vue'

export default {
  setActiveType: (state, { type }) => {
    state.activeType = type
  },

  setList: (state, { type, ids }) => {
    state.lists[type] = ids
  },

  setItems: (state, { items }) => {
    items.forEach(item => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },

  setUser: (state, { id, user }) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  }
}
