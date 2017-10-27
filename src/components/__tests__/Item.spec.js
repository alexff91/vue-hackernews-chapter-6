import { mount } from 'vue-test-utils'
import Item from '../Item.vue'

describe('Item.vue', () => {
  test('renders item.score', () => {
    const item = {
      score: 10
    }
    const wrapper = mount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.score)
  })

  test('renders item.by', () => {
    const item = {
      by: 'some author'
    }
    const wrapper = mount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.by)
  })

  test('renders item.url', () => {
    const item = {
      url: 'some title'
    }
    const wrapper = mount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.url)
  })

  test('renders an a tag containing item.title', () => {
    const item = {
      title: 'some title'
    }
    const wrapper = mount(Item, {
      propsData: { item }
    })
    expect(wrapper.find('a').text()).toEqual(item.title)
  })

  it('renders an a tag with href item.url', () => {
    const item = {
      url: 'http://some-url.com'
    }
    const wrapper = mount(Item, {
      propsData: { item }
    })
    const aWrapper = wrapper.find('a')
    expect(aWrapper.element.getAttribute('href')).toBe(item.url)
  })
})
