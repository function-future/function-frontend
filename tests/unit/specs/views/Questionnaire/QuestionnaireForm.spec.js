import QuestionnaireForm from '@/views/Questionnaire/QuestionnaireForm'
import { shallowMount } from '@vue/test-utils'
import moment from 'moment'

describe('QuestionnaireForm', () => {
  let wrapper
  function initWrapper () {
    wrapper = shallowMount(QuestionnaireForm, {
      stubs: [
        'BaseCard',
        'BaseTextArea',
        'BaseInput',
        'Datepicker',
        'font-awesome-icon'
      ],
      propsData: {
        value: {}
      }
    })
  }

  test('value', () => {
    const spy = jest.spyOn(QuestionnaireForm.watch, 'value')
    initWrapper()
    wrapper.vm.value = { title: 'title' }
    expect(spy).toHaveBeenCalled()
    expect(wrapper.emitted('input')).toBeTruthy()
  })

  test('dateToString', () => {
    initWrapper()
    const res = moment(5).format('DD MMM YYYY, h:mm a')
    expect(wrapper.vm.dateToString(5)).toEqual(res)
  })
})
