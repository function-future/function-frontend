import store from '@/store/modules/auth'
import api from '@/api/controller/auth'
import configApi from '@/api/controller/config'

jest.mock('@/api/controller/auth')

describe('auth store module', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  describe('auth actions', () => {
    test('attemptLogin', () => {
      const expectedData = {
        'code': 200,
        'status': 'OK',
        'data': {
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Name',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      }
      api.attemptLogin = (success) => {
        success(expectedData)
      }

      const data = {
        email: 'email@email.com',
        password: 'password'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.attemptLogin({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_CURRENT_USER', expectedData.data)
    })

    test('getLoginStatus', () => {
      const expectedData = {
        'code': 200,
        'status': 'OK',
        'data': {
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Name',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      }
      api.getLoginStatus = (success) => {
        success(expectedData)
      }

      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.getLoginStatus({ commit }, { callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_CURRENT_USER', expectedData.data)
    })

    test('attemptLogout', () => {
      const expectedData = {
        'code': 200,
        'status': 'OK'
      }
      api.attemptLogout = (success) => {
        success(expectedData)
      }

      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.attemptLogout({ commit }, { callback, fail })
      expect(callback).toHaveBeenCalledTimes(1)
      expect(fail).not.toHaveBeenCalled()
    })

    test('getMenuList', () => {
      const expectedData = {
        'courses': true,
        'files': true,
        'users': true,
        'chatroom': true,
        'questionBanks': true,
        'quizzes': true,
        'assignments': true,
        'comparisons': true,
        'points': true
      }
      configApi.getMenuList = (success) => {
        success(expectedData)
      }

      const commit = jest.fn()
      store.actions.getMenuList({ commit })
      expect(commit).toHaveBeenCalledTimes(1)
    })

    test('getAccessList', () => {
      const expectedData = {
        'add': true,
        'delete': true,
        'edit': true,
        'read': true
      }
      configApi.getAccessList = (success) => {
        success(expectedData)
      }

      const data = '%2Fannouncements'
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.getAccessList({ commit }, { data, callback, fail })
      expect(callback).toHaveBeenCalledTimes(1)
      expect(fail).not.toHaveBeenCalled()
    })

    test('setCurrentUser', () => {
      const data = {}
      const commit = jest.fn()
      store.actions.setCurrentUser({ commit }, { data })
      expect(commit).toHaveBeenCalledTimes(1)
    })

    test('setMenuList', () => {
      const data = {}
      const commit = jest.fn()
      store.actions.setMenuList({ commit }, { data })
      expect(commit).toHaveBeenCalledTimes(1)
    })
  })

  describe('courses setter getters', () => {
    const state = {
      currentUser: {}
    }

    test('SET_CURRENT_USER & currentUser getters', () => {
      store.mutations.SET_CURRENT_USER(state, {
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Name',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      })
      expect(store.getters.currentUser(state)).toEqual(state.currentUser)
    })

    test('SET_MENU_LIST & menuList getters', () => {
      store.mutations.SET_MENU_LIST(state, {
        'courses': true,
        'files': true,
        'users': true,
        'chatroom': true,
        'questionBanks': true,
        'quizzes': true,
        'assignments': true,
        'comparisons': true,
        'points': true
      })
      expect(store.getters.menuList(state)).toEqual(state.menuList)
    })

    test('SET_ACCESS_LIST & accessList getters', () => {
      store.mutations.SET_ACCESS_LIST(state, {
        'courses': true,
        'files': true,
        'users': true,
        'chatroom': true,
        'questionBanks': true,
        'quizzes': true,
        'assignments': true,
        'comparisons': true,
        'points': true
      })
      expect(store.getters.accessList(state)).toEqual(state.accessList)
    })
  })
})
