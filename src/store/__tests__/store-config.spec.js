jest.mock('../../api/api')

import Vuex from 'vuex'
import { createLocalVue } from 'vue-test-utils'
import flushPromises from 'flush-promises'
import storeConfig from '../store-config'
import {
  fetchItems,
  fetchIdsByType
} from '../../api/api'

function createIds () {
  const arr = new Array(22)
  return arr.fill().map((item, i) => `a${i}`)
}

function createItems () {
  const arr = new Array(22)
  return arr.fill().map((item, i) => ({id: `a${i}`, name: 'item'}))
}

describe('store-config', () => {
  test('calling fetchListData with the type returns top 20 activeItems from activeItems getter', async () => {
    const ids = createIds()
    const items = createItems()
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(storeConfig)
    const type = 'top'
    fetchIdsByType.mockImplementation(() => Promise.resolve(ids))
    fetchItems.mockImplementation(() => Promise.resolve(items))
    store.dispatch('fetchListData', { type })

    await flushPromises()

    expect(store.getters.activeItems).toHaveLength(20)
    expect(store.getters.activeItems.every((item, i) => item === items[i])).toBe(true)
  })
})
