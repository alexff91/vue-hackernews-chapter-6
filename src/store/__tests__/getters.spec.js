import getters from '../getters'

describe('getters', () => {
  test('activeIds returns an empty array when state.lists is undefined', () => {
    const result = getters.activeIds({ activeType: undefined, lists: undefined })
    expect(result).toEqual([])
  })

  test('activeIds returns the first items from the list matching state.activeType', () => {
    const activeType = 'top'
    var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const lists = {
      top: [...numberArray]
    }
    const result = getters.activeIds({ activeType, lists })
    expect(result.length).toEqual(20)
    for (let i = 0; i < 20; i++) {
      expect(result[i]).toEqual(numberArray[i])
    }
  })

  test('activeItems returns state.items that match the activeIds', () => {
    const activeIds = ['a', 'b']
    const state = {
      items: {
        'a': {id: 1},
        'b': {id: 2}
      }
    }
    const activeItems = getters.activeItems(state, { activeIds })
    expect(activeItems[0]).toBe(state.items.a)
    expect(activeItems[1]).toBe(state.items.b)
  })
})
