import headerComp from '@/components/skeletons/HeaderComp'
import { shallowMount } from '@vue/test-utils'

describe('HeaderComp', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(headerComp)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('showGrades computed works correctly', () => {
    const wrapper = shallowMount(headerComp)
    expect(wrapper.vm.gradesSubmenuVisibility).toBe(false)
    expect(wrapper.vm.showGrades).toBe(false)
    wrapper.vm.gradesSubmenuVisibility = true
    expect(wrapper.vm.showGrades).toBe(true)
  })

  test('ToggleGradesMenu', () =>{
    const wrapper = shallowMount(headerComp)
    expect(wrapper.vm.gradesSubmenuVisibility).toBe(false)
    wrapper.vm.toggleGradesMenu()
    expect(wrapper.vm.gradesSubmenuVisibility).toBe(true)
  })
})
