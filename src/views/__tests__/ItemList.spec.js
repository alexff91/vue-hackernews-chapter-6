jest.mock('../../api/api.js')
jest.useRealTimers()

import { mount } from 'vue-test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import { fetchItems } from '../../api/api'

describe('ItemList.vue', () => {
  let items
  beforeEach(() => {
    return fetchItems().then((returnedItems) => {
      items = returnedItems
    })
  })

  test('renders an Item for each item returned by fetchItems', (done) => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const wrapper = mount(ItemList, {intercept: {$bar}})
    setTimeout(() => {
      expect(wrapper.findAll(Item).length).toEqual(items.length)
      done()
    }, 0)
  })

  test('passes an item object to each Item component', () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const wrapper = mount(ItemList, {intercept: {$bar}})
    const Items = wrapper.findAll(Item)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(window.items[i])
    })
  })

  test('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    }
    mount(ItemList, {intercept: {$bar}})
    expect($bar.start).toHaveBeenCalled()
  })

  test('calls $bar finish when load succesful', (done) => {
    const $bar = {
      start: () => {},
      finish: jest.fn()
    }
    mount(ItemList, {intercept: {$bar}})
    setTimeout(() => {
      expect($bar.finish).toHaveBeenCalled()
      done()
    }, 0)
  })
})
