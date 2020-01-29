import QuestionnaireCard from '@/views/Questionnaire/QuestionnaireCard'
import { shallowMount } from '@vue/test-utils'
import moment from 'moment'

describe('QuestionnaireCard', () => {
  let wrapper

  function initWrapper (propsData) {
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(QuestionnaireCard, {
      stubs: [
        'BaseButton'
      ],
      propsData: {
        title: 'title',
        description: 'description',
        ...propsData
      },
      mocks: {
        $router
      }
    })
  }

  test('goToEdit isDisabled = true', () => {
    initWrapper({
      isDisable: true
    })
    wrapper.vm.goToEdit()
    expect(wrapper.vm.$router.push).not.toHaveBeenCalled()
  })

  test('goToEdit isDisabled = false', () => {
    initWrapper({
      isDisable: false
    })
    wrapper.vm.goToEdit()
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })

  test('computedTitle case 1', () => {
    const spy = jest.spyOn(QuestionnaireCard.computed, 'computedTitle')
    const title = 'Lorem ipsum dolor sit amet orci aliquam.'
    initWrapper({
      title
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedTitle).toEqual(title.substring(0, 35).concat('...'))
  })

  test('computedTitle case 2', () => {
    const spy = jest.spyOn(QuestionnaireCard.computed, 'computedTitle')
    const title = 'Lorem ipsum'
    initWrapper({
      title
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedTitle).toEqual(title)
  })

  test('computedDescription case 1', () => {
    const spy = jest.spyOn(QuestionnaireCard.computed, 'computedTitle')
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis dolor magna, eleifend ' +
      'vulputate felis malesuada id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus ' +
      'mus. Suspendisse dapibus non mi eu accumsan. Cras eu felis finibus, consectetur diam quis metus.'
    initWrapper({
      description
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedDescription).toEqual(description.substring(0, 200).concat('...'))
  })

  test('computedDescription case 2', () => {
    const spy = jest.spyOn(QuestionnaireCard.computed, 'computedTitle')
    const description = 'Lorem ipsum'
    initWrapper({
      description
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedDescription).toEqual(description)
  })

  test('computedStartDate', () => {
    const spy = jest.spyOn(QuestionnaireCard.computed, 'computedStartDate')
    const startDate = Date.now()
    initWrapper({
      startDate
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedStartDate).toEqual(moment(startDate).format('DD/MMM/YYYY, h:mm a'))
  })

  test('computedDueDate', () => {
    const spy = jest.spyOn(QuestionnaireCard.computed, 'computedDueDate')
    const dueDate = Date.now()
    initWrapper({
      dueDate
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedDueDate).toEqual(moment(dueDate).format('DD/MM/YYYY,  h:mm a'))
  })
})
