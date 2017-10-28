export default {
  activeIds (state) {
    const { activeType, lists } = state

    if (!activeType) {
      return []
    }
    return lists[activeType].slice(0, 20)
  },

  activeItems (state, getters) {
    return getters.activeIds.map(id => state.items[id]).filter(_ => _)
  }
}
