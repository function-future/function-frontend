import store from '@/store/modules/util'

describe('util store module', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  describe('courses actions', () => {
    test('toast > 1023', () => {
      global.innerWidth = 1920
      const Toast = jest.fn()
      const commit = jest.fn()
      const data = {}
      store.actions.toast({ commit }, { data })
      expect(Toast).not.toHaveBeenCalled()
    })

    test('toast < 1023', () => {
      global.innerWidth = 600
      const Toast = jest.fn()
      const commit = jest.fn()
      const data = {}
      store.actions.toast({ commit }, { data })
      expect(Toast).not.toHaveBeenCalled()
    })
  })
})
