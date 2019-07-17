import store from '@/store/modules/user'
import api from '@/api/controller/user'
import resourceApi from '@/api/controller/resources'

jest.mock('@/api/controller/user')
jest.mock('@/api/controller/resources')

describe('courses store module', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  describe('courses actions', () => {
    test('fetchProfile', () => {
      const expectedData = {
        'code': 200,
        'status': 'OK',
        'data': {
          'id': 'sample-id',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Name',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'deleted': false,
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        }
      }
      api.getProfileData = (success) => {
        success(expectedData)
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.fetchProfile({ commit }, { callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_PROFILE', expectedData.data)
    })

    test('changePassword', () => {
      const expectedData = {
        'code': 200,
        'status': 'OK'
      }
      api.changePassword = (success) => {
        success(expectedData)
      }
      const data = {
        oldPassword: 'oldPassword',
        newPassword: 'newPassword'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.changePassword({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('uploadProfilePicture', () => {
      resourceApi.uploadResource = (success) => {
        success({
          'code': 200,
          'status': 'OK',
          'data': {}
        })
      }
      const data = {
        origin: 'user'
      }
      const state = jest.fn()
      const fail = jest.fn()
      const callback = jest.fn()
      const configuration = {}
      store.actions.uploadProfilePicture({ state }, { data, configuration, callback, fail })
      expect(fail).not.toBeCalled()
      expect(callback).toBeCalledTimes(1)
    })

    test('sendProfilePictureId ', () => {
      const expectedData = {
        'code': 200,
        'status': 'OK',
        'data': {
          avatar: ['sample-id']
        }
      }
      api.updateProfilePicture = (success) => {
        success(expectedData)
      }
      const data = {
        avatar: ['sample-id']
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.sendProfilePictureId({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('courses setter getters', () => {
    const state = {
      profile: {}
    }

    test('SET_COURSES & courseList', () => {
      store.mutations.SET_PROFILE(state, {
        'id': 'sample-id',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Name',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'deleted': false,
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      })
      expect(store.getters.profile(state)).toEqual(state.profile)
    })
  })
})
