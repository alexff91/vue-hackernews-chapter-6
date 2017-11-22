jest.mock('../../api/api')
import actions from '../actions'
import { fetchIdsByType, fetchItems, fetchUser } from '../../api/api'
import flushPromises from 'flush-promises'

describe('actions', () => {
  test('fetchListData calls commit with setActiveType and the type', () => {
    const type = 'top'
    const context = {
      commit: jest.fn(),
      getters: {},
      dispatch: jest.fn()
    }
    actions.fetchListData(context, { type })
    expect(context.commit).toHaveBeenCalledWith('setActiveType', { type })
  })

  test('fetchListData calls commit with setList and the result of fetchIdsByType', async () => {
    const ids = [{}, {}, {}]
    const type = 'top'
    fetchIdsByType.mockImplementation(calledWith => calledWith === type ? Promise.resolve(ids) : Promise.resolve()) // #B
    const context = {
      commit: jest.fn(),
      getters: {},
      dispatch: jest.fn()
    }
    actions.fetchListData(context, { type })
    await flushPromises()
    expect(context.commit).toHaveBeenCalledWith('setList', { type, ids })
  })

  test('fetchListData calls dispatch with setList and the result of getters.activeIds', async () => {
    const ids = [{}, {}, {}]
    const type = 'top'
    const context = {
      commit: jest.fn(),
      getters: {activeIds: ['id1', 'id2']},
      dispatch: jest.fn()
    }
    fetchIdsByType.mockImplementation(calledWith => calledWith === type ? Promise.resolve(ids) : Promise.resolve())
    actions.fetchListData(context, { type })
    await flushPromises()
    expect(context.dispatch).toHaveBeenCalledWith('fetchItems', { ids: context.getters.activeIds })
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
    const context = {
      commit: jest.fn(),
      state
    }
    function calledWithIds (filteredIds) {
      return filteredIds.every((id, i) => id === ids[i])
    }
    fetchItems.mockImplementation(calledWith => calledWithIds(calledWith) ? Promise.resolve(items) : Promise.resolve())
    actions.fetchItems(context, { ids })
    await flushPromises()
    expect(context.commit).toHaveBeenCalledWith('setItems', { items })
  })

  test('fetchItems does not call commit if ids exist in state', async () => {
    const ids = ['a1', 'a2']
    const state = {
      items: {
        a1: {},
        a2: {}
      }
    }
    const context = {
      commit: jest.fn(),
      state
    }
    actions.fetchItems(context, { ids })
    await flushPromises()
    expect(context.commit).not.toHaveBeenCalled()
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
    const context = {
      commit: jest.fn(),
      state
    }
    fetchUser.mockImplementation(calledWith => calledWith === id ? Promise.resolve(user) : Promise.resolve())
    actions.fetchUser(context, { id })
    await flushPromises
    expect(context.commit).toHaveBeenCalledWith('setUser', { id, user })
  })
})
