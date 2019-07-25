import QuestionnaireResults from '@/views/Questionnaire/QuestionnaireResults'
import { shallowMount } from '@vue/test-utils'

describe('QuestionnaireResults', () => {
  let wrapper
  function initWrapper () {
    const $router = {
      push: jest.fn()
    }

    const $toasted = {
      error: jest.fn()
    }
    wrapper = shallowMount(QuestionnaireResults, {
      stubs: [
        'BaseCard',
        'BaseSelect',
        'BaseButton',
        'BaseInput',
        'ModalSelectBatch',
        'font-awesome-icon'
      ],
      mocks: {
        $router,
        $toasted
      }
    })
  }
  test('goToMembers error', () => {
    initWrapper()
    wrapper.vm.goToMembers()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('goToMembers success', () => {
    initWrapper()
    wrapper.vm.batch = 2
    wrapper.vm.goToMembers()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionnaireResultsMembers',
      params: {
        batchCode: 2
      }
    })
  })

  test('selectBatch', () => {
    initWrapper()
    wrapper.vm.selectBatch(12)
    expect(wrapper.vm.batch).toEqual(12)
    expect(wrapper.vm.showSelectBatchModal).toBe(false)
  })

  test('closeModal', () => {
    initWrapper()
    wrapper.vm.closeModal()
    expect(wrapper.vm.showSelectBatchModal).toBe(false)
  })
})
