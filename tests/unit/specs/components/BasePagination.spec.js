import BasePagination from '@/components/BasePagination'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('BasePagination', () => {
  let wrapper
  function initComponent () {
    wrapper = shallowMount(BasePagination, {
      propsData: {
        paging: {
          page: 1,
          size: 10
        }
      }
    })
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('previousButtonDisabled is true', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 0
      }
    })
    expect(wrapper.vm.previousButtonDisabled).toEqual(true)
  })

  test('previousButtonDisabled is false', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 1
      }
    })
    expect(wrapper.vm.previousButtonDisabled).toEqual(false)
  })

  test('nextButtonDisabled is true', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 9,
        totalRecords: 100,
        size: 10
      }
    })
    expect(wrapper.vm.nextButtonDisabled).toEqual(true)
  })

  test('nextButtonDisabled is false', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 1,
        totalRecords: 100,
        size: 10
      }
    })
    expect(wrapper.vm.nextButtonDisabled).toEqual(false)
  })

  test('totalPage', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 1,
        totalRecords: 100,
        size: 10
      }
    })
    expect(wrapper.vm.totalPage).toEqual(10)
  })

  test('paginations pageCount is less than visiblePagesCount', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 1,
        totalRecords: 30,
        size: 10
      }
    })
    expect(wrapper.vm.paginations).toEqual(3)
  })

  test('paginations pageCount is less visiblePagesThreshold', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 1,
        totalRecords: 100,
        size: 10
      }
    })
    expect(wrapper.vm.paginations).toEqual([1, 2, 3, 4, 5, 6, 7, 10])
  })

  test('paginations currentPage is more than pageCount - visibleThreshold', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 8,
        totalRecords: 100,
        size: 10
      }
    })
    expect(wrapper.vm.paginations).toEqual([1, 4, 5, 6, 7, 8, 9, 10])
  })

  test('paginations default behaviour', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 10,
        totalRecords: 300,
        size: 10
      }
    })
    expect(wrapper.vm.paginations).toEqual([1, 7, 8, 9, 10, 11, 12, 30])
  })

  test('activePage', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 0,
        totalRecords: 30,
        size: 10
      }
    })
    expect(wrapper.vm.activePage(1)).toEqual(true)
  })

  test('previousPage', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 0,
        totalRecords: 30,
        size: 10
      }
    })
    wrapper.vm.previousPage()
    expect(wrapper.emitted().previousPage).toBeTruthy()
  })

  test('nextPage', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 0,
        totalRecords: 30,
        size: 10
      }
    })
    wrapper.vm.nextPage()
    expect(wrapper.emitted().nextPage).toBeTruthy()
  })

  test('goToPage', () => {
    initComponent()
    wrapper.setProps({
      paging: {
        page: 0,
        totalRecords: 30,
        size: 10
      }
    })
    wrapper.vm.goToPage(10)
    expect(wrapper.emitted().loadPage[0]).toEqual([9])
  })
})
