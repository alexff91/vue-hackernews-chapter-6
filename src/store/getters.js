export default {
  // ids of the items that should be currently displayed based on
  // current list type and current pagination
  activeIds (state) {
    const { activeType, lists } = state

    if (!activeType) {
      return []
    }
    return lists[activeType].slice(0, 20)
  },

  // items that should be currently displayed.
  // this Array may not be fully fetched.
  activeItems (state, getters) {
    return state.items
  }
}
