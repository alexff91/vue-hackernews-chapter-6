jest.mock('../../api/api')
import actions from '../actions'
import { fetchIdsByType, fetchItems, fetchUser } from '../../api/api'
import flushPromises from 'flush-promises'

describe('actions', () => {
  test('fetchListData calls commit with setActiveType and the type', () => {
    const commit = jest.fn()
    const type = 'top'
    actions.fetchListData({commit, getters: {}, dispatch: jest.fn()}, { type })
    expect(commit).toHaveBeenCalledWith('setActiveType', { type })
  })

  test('fetchListData calls commit with setList and the result of fetchIdsByType', async () => {
    const ids = [{}, {}, {}]
    const getters = {
      activeIds: ''
    }
    fetchIdsByType.mockReturnValue(Promise.resolve(ids))
    const commit = jest.fn()
    const type = 'top'
    actions.fetchListData({
      commit, getters, dispatch: jest.fn()
    }, { type, ids })
    await flushPromises()
    expect(commit).toHaveBeenCalledWith('setList', { type, ids })
  })

  test('fetchListData calls dispatch with setList and the result of fetchIdsByType', async () => {
    const ids = [{}, {}, {}]
    const getters = {activeIds: ['sad', 'asd']}
    const dispatch = jest.fn()
    fetchIdsByType.mockReturnValue(Promise.resolve(ids))
    const type = 'top'
    actions.fetchListData({
      commit: jest.fn(), getters, dispatch
    }, { type, ids })
    await flushPromises()
    expect(dispatch).toHaveBeenCalledWith('fetchItems', { ids: getters.activeIds })
  })

  test('fetchItems returns a Promise resolve if ids is an empty array', () => {
    return expect(actions.fetchItems({}, {ids: []})).resolves.toBe()
  })

  test('fetchItems calls commit with ids returned by fetchItems if they do not exist in state', async () => {
    const ids = ['a1', 'a2']
    const state = {
      items: {}
    }
    const items = ['asd', 'asd']
    fetchItems.mockReturnValue(Promise.resolve(items))
    const commit = jest.fn()
    actions.fetchItems({ commit, state }, { ids })
    await flushPromises()
    expect(commit).toHaveBeenCalledWith('setItems', { items })
  })

  test('fetchItems does not call commit if ids exist in state', async () => {
    const ids = ['a1', 'a2']
    const state = {
      items: {
        a1: {},
        a2: {}
      }
    }
    const commit = jest.fn()
    actions.fetchItems({ commit, state }, { ids })
    await flushPromises()
    expect(commit).not.toHaveBeenCalled()
  })

  test('fetchUser resolves with state.user matching id if it exists', () => {
    const id = 'a1'
    const state = {
      users: {
        a1: { name: 'Edd' }
      }
    }
    return expect(actions.fetchUser({ state }, { id })).resolves.toBe(state.users.a1)
  })

  test('fetchUser calls commit with the result of fetchUser if it does not exist in state', async () => {
    const id = 'a1'
    const user = { name: 'Edd' }
    const state = {
      users: {}
    }
    const commit = jest.fn()
    fetchUser.mockReturnValue(Promise.resolve(user))
    actions.fetchUser({ state, commit }, { id })
    await flushPromises
    expect(commit).toHaveBeenCalledWith('setUser', { id, user })
  })
})
