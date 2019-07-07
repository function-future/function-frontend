import courseCard from '@/components/courses/CourseCard'
import { shallowMount } from '@vue/test-utils'

describe('BaseCard', () => {
  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(courseCard, {
      propsData: {
        course: {
          title: 'course title',
          id: 'sample-id-1'
        }
      },
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon'
      ]
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
  test('copy', () => {
    const wrapper = shallowMount(courseCard, {
      propsData: {
        course: {
          title: 'course title',
          id: 'sample-id-1'
        }
      },
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon'
      ]
    })
    wrapper.vm.copy()
    expect(wrapper.emitted().copy.length).toBe(1)
  })

  test('edit', () => {
    const wrapper = shallowMount(courseCard, {
      propsData: {
        course: {
          title: 'course title',
          id: 'sample-id-1'
        }
      },
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon'
      ]
    })
    wrapper.vm.edit()
    expect(wrapper.emitted().edit.length).toBe(1)
  })

  test('deleteCourse', () => {
    const wrapper = shallowMount(courseCard, {
      propsData: {
        course: {
          title: 'course title',
          id: 'sample-id-1'
        }
      },
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon'
      ]
    })
    wrapper.vm.deleteCourse()
    expect(wrapper.emitted().delete.length).toBe(1)
  })

  test('computed title', () => {
    const wrapper = shallowMount(courseCard, {
      propsData: {
        course: {
          title: 'course title',
          id: 'sample-id-1'
        }
      },
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon'
      ]
    })
    expect(wrapper.vm.title).toEqual('course title')
  })

  test('computed title > 40', () => {
    const wrapper = shallowMount(courseCard, {
      propsData: {
        course: {
          title: 'course title course title course title course title course title course title course title',
          id: 'sample-id-1'
        }
      },
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon'
      ]
    })

    expect(wrapper.vm.title).toEqual(wrapper.vm.title.slice(0, 40) + '...')
  })
})
