jest.mock('../../api/api')
jest.mock('vue', () => ({set: jest.fn()}))

import Vue from 'vue'
import mutations from '../mutations'

describe('mutations', () => {
  test('setActiveType sets state to type', () => {
    const type = 'top'
    const state = {}
    mutations.setActiveType(state, { type })
    expect(state.activeType).toBe(type)
  })

  test('setList sets state.lists of type to ids', () => {
    const type = 'top'
    const ids = [1, 2, 3]
    const state = {
      lists: {
        top: []
      }
    }
    mutations.setList(state, { type, ids })
    expect(state.lists.top).toBe(ids)
  })

  test('setItems calls Vue.set with each item in items', () => {
    Vue.set.mockReset()

    const items = [{id: 1}, {id: 2}]
    const state = {
      items: []
    }
    mutations.setItems(state, { items })
    items.forEach(item => {
      expect(Vue.set).toHaveBeenCalledWith(state.items, item.id, item)
    })
  })

  test('setItems does not call Vue.set if item is undefined', () => {
    Vue.set.mockReset()

    const items = [undefined]
    const state = {
      items: []
    }
    mutations.setItems(state, { items })
    expect(Vue.set).not.toHaveBeenCalled()
  })

  test('setUser calls Vue.set with user and id', () => {
    Vue.set.mockReset()

    const user = {
      name: 'Edd'
    }
    const id = 4
    const state = {
      users: []
    }
    mutations.setUser(state, { user, id })
    expect(Vue.set).toHaveBeenCalledWith(state.users, id, user)
  })

  test('setUser calls Vue.set with false and id if user is undefined', () => {
    Vue.set.mockReset()

    const user = undefined
    const id = 4
    const state = {
      users: []
    }
    mutations.setUser(state, { user, id })
    expect(Vue.set).toHaveBeenCalledWith(state.users, id, false)
  })
})
