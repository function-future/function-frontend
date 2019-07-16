import ChatroomCard from '@/views/Chatrooms/ChatroomCard'
import { shallowMount } from '@vue/test-utils'
import moment from 'moment'

describe('ChatroomCard', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('toDateList method', () => {
    const wrapper = shallowMount(ChatroomCard)
    const timeNow = Date.now()
    const formattedDate = [moment(timeNow).year(), moment(timeNow).month(), moment(timeNow).date()]
    expect(wrapper.vm.toDateList(timeNow)).toEqual(formattedDate)
  })

  test('computedName PRIVATE', () => {
    const name = 'Priagung Satyagama Satyagama Satyagama'
    const wrapper = shallowMount(ChatroomCard, {
      propsData: {
        type: 'PRIVATE',
        lastMessage: 'Last message test',
        name: name
      }
    })

    const computedName = name.substring(0, 12) + '...'
    expect(wrapper.vm.computedName).toEqual(computedName)
  })

  test('computedName GROUP', () => {
    const name = 'Priagung Satyagama Satyagama Satyagama'
    const wrapper = shallowMount(ChatroomCard, {
      propsData: {
        type: 'GROUP',
        lastMessage: 'Last message test',
        name: name
      }
    })

    const computedName = name.substring(0, 17) + '...'
    expect(wrapper.vm.computedName).toEqual(computedName)
  })

  test('computedName short', () => {
    const name = 'Priagung'
    const wrapper = shallowMount(ChatroomCard, {
      propsData: {
        type: 'PRIVATE',
        lastMessage: 'Last message test',
        name: name
      }
    })
    expect(wrapper.vm.computedName).toEqual(name)
  })

  test('computedLastMessage PRIVATE', () => {
    const lastMessage = 'Last message panjang banget lah pokoknya'
    const wrapper = shallowMount(ChatroomCard, {
      propsData: {
        type: 'PRIVATE',
        lastMessage: lastMessage,
        name: 'Priagung'
      }
    })
    const computedLastMessage = lastMessage.substring(0, 17) + '...'
    expect(wrapper.vm.computedLastMessage).toEqual(computedLastMessage)
  })

  test('computedLastMessage GROUP', () => {
    const lastMessage = 'Last message panjang banget lah pokoknya'
    const wrapper = shallowMount(ChatroomCard, {
      propsData: {
        type: 'GROUP',
        lastMessage: lastMessage,
        name: 'Priagung'
      }
    })
    const computedLastMessage = lastMessage.substring(0, 27) + '...'
    expect(wrapper.vm.computedLastMessage).toEqual(computedLastMessage)
  })

  test('computedLastMessage short', () => {
    const lastMessage = 'Last message'
    const wrapper = shallowMount(ChatroomCard, {
      propsData: {
        type: 'GROUP',
        lastMessage: lastMessage,
        name: 'Priagung'
      }
    })
    expect(wrapper.vm.computedLastMessage).toEqual(lastMessage)
  })

  test('convertClock when time not null and day is same', () => {
    const time = Date.now()
    const wrapper = shallowMount(ChatroomCard, {
      propsData: {
        type: 'GROUP',
        lastMessage: 'lastMessage',
        name: 'Priagung',
        time: time
      }
    })

    expect(wrapper.vm.convertClock).toEqual(moment(time).format('HH:mm'))
  })

  test('convertClock when time not null and day is different', () => {
    const time = Date.now() - 86400001
    const wrapper = shallowMount(ChatroomCard, {
      propsData: {
        type: 'GROUP',
        lastMessage: 'lastMessage',
        name: 'Priagung',
        time: time
      }
    })

    expect(wrapper.vm.convertClock).toEqual(moment(time).format('DD MMM'))
  })

  test('convertClock when time is null', () => {
    const wrapper = shallowMount(ChatroomCard, {
      propsData: {
        type: 'GROUP',
        lastMessage: 'lastMessage',
        name: 'Priagung',
      }
    })

    expect(wrapper.vm.convertClock).toEqual('')
  })
})
