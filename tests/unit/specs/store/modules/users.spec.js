import store from '@/store/modules/users'
import api from '@/api/controller/users'
import resourceApi from '@/api/controller/resources'

jest.mock('@/api/controller/users')

describe('actions', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Initial state', () => {
    const commit = jest.fn()
    store.actions.initialState({ commit })
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_USER_BY_ID', {})
  })

  test('fetchUsersByRole', () => {
    api.getUserList = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': []
      })
    }
    const data = {
      role: 'student',
      page: 1,
      pageSize: 10
    }
    const commit = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.fetchUsersByRole({ commit }, { data, callback, fail })
    expect(fail).not.toBeCalled()
    expect(callback).toBeCalledTimes(1)
  })

  test('setStudentList', () => {
    const data = {
      'id': 'sample-id-2',
      'role': 'STUDENT',
      'email': 'user@user.com',
      'name': 'User Admin 2',
      'phone': '088888888888',
      'address': 'Jl. Address 1 Address 2',
      'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    }

    const commit = jest.fn()
    store.actions.setStudentList({ commit }, { data })
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_STUDENTS', data)
  })

  test('setAdminList', () => {
    const data = {
      'id': 'sample-id-2',
      'role': 'ADMIN',
      'email': 'user@user.com',
      'name': 'User Admin 2',
      'phone': '088888888888',
      'address': 'Jl. Address 1 Address 2',
      'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    }

    const commit = jest.fn()
    store.actions.setAdminList({ commit }, { data })
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_ADMINS', data)
  })

  test('setMentorList', () => {
    const data = {
      'id': 'sample-id-2',
      'role': 'MENTOR',
      'email': 'user@user.com',
      'name': 'User Admin 2',
      'phone': '088888888888',
      'address': 'Jl. Address 1 Address 2',
      'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    }

    const commit = jest.fn()
    store.actions.setMentorList({ commit }, { data })
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_MENTORS', data)
  })

  test('setJudgeList', () => {
    const data = {
      'id': 'sample-id-2',
      'role': 'JUDGE',
      'email': 'user@user.com',
      'name': 'User Admin 2',
      'phone': '088888888888',
      'address': 'Jl. Address 1 Address 2',
      'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    }

    const commit = jest.fn()
    store.actions.setJudgeList({ commit }, { data })
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_JUDGES', data)
  })

  test('fetchUserById', () => {
    api.getUserDetail = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': []
      })
    }
    const data = {
      role: 'student',
      page: 1,
      pageSize: 10
    }
    const commit = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.fetchUserById({ commit }, { data, callback, fail })
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_USER_BY_ID', [])
    expect(callback).toBeCalledTimes(1)
  })

  test('createUser', () => {
    api.createUser = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': []
      })
    }
    const data = {
      role: 'student',
      page: 1,
      pageSize: 10
    }
    const commit = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.createUser({ commit }, { data, callback, fail })
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_USER_BY_ID', [])
    expect(callback).toBeCalledTimes(1)
  })

  test('updateUser', () => {
    api.updateUser = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': []
      })
    }
    const data = {
      role: 'student',
      page: 1,
      pageSize: 10
    }
    const commit = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.updateUser({ commit }, { data, callback, fail })
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_USER_BY_ID', [])
    expect(callback).toBeCalledTimes(1)
  })

  test('deleteUserById', () => {
    api.deleteUser = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': []
      })
    }
    const data = {
      role: 'student',
      page: 1,
      pageSize: 10
    }
    const state = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.deleteUserById({ state }, { data, callback, fail })
    expect(fail).not.toBeCalled()
    expect(callback).toBeCalledTimes(1)
  })

  test('uploadProfilePicture', () => {
    resourceApi.uploadResource = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': []
      })
    }
    const data = {
      role: 'student',
      page: 1,
      pageSize: 10
    }
    const state = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    const configuration = {}
    store.actions.uploadProfilePicture({ state }, { data, configuration, callback, fail })
    expect(fail).not.toBeCalled()
    expect(callback).toBeCalledTimes(1)
  })
})

describe('getters', () => {
  const state = {
    userList: {
      students: [],
      admins: [],
      mentors: [],
      judges: []
    },
    user: {}
  }

  test('students', () => {
    expect(store.getters.students(state)).toEqual(state.userList.students)
  })

  test('admins', () => {
    expect(store.getters.admins(state)).toEqual(state.userList.students)
  })

  test('mentors', () => {
    expect(store.getters.mentors(state)).toEqual(state.userList.students)
  })

  test('judges', () => {
    expect(store.getters.judges(state)).toEqual(state.userList.students)
  })

  test('user', () => {
    expect(store.getters.user(state)).toEqual(state.user)
  })
})

describe('mutations', () => {
  const state = {
    userList: {
      students: [],
      admins: [],
      mentors: [],
      judges: []
    },
    user: {}
  }

  test('SET_USER_BY_ID', () => {
    store.mutations.SET_USER_BY_ID(state, {
      'id': 'sample-id-admin',
      'role': 'ADMIN',
      'email': 'user@user.com',
      'name': 'User Admin 1',
      'phone': '088888888888',
      'address': 'Jl. Address 1 Address 2',
      'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      'batch': {
        'id': 'sample-id',
        'name': 'Batch Name',
        'code': '3'
      },
      'university': 'Bina Nusantara University'
    })
    expect(state.user).toEqual({
      'id': 'sample-id-admin',
      'role': 'ADMIN',
      'email': 'user@user.com',
      'name': 'User Admin 1',
      'phone': '088888888888',
      'address': 'Jl. Address 1 Address 2',
      'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      'batch': {
        'id': 'sample-id',
        'name': 'Batch Name',
        'code': '3'
      },
      'university': 'Bina Nusantara University'
    })
  })

  test('SET_STUDENTS', () => {
    const data = [
      {
        'id': 'sample-id-student',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Admin 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-2',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Admin 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-3',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Admin 3',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ]
    store.mutations.SET_STUDENTS(state, data)
    expect(state.userList.students).toEqual(data)
  })

  test('SET_ADMINS', () => {
    const data = [
      {
        'id': 'sample-id-admin',
        'role': 'ADMIN',
        'email': 'user@user.com',
        'name': 'User Admin 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-2',
        'role': 'ADMIN',
        'email': 'user@user.com',
        'name': 'User Admin 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-3',
        'role': 'ADMIN',
        'email': 'user@user.com',
        'name': 'User Admin 3',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ]
    store.mutations.SET_ADMINS(state, data)
    expect(state.userList.admins).toEqual(data)
  })

  test('SET_MENTORS', () => {
    const data = [
      {
        'id': 'sample-id-admin',
        'role': 'MENTOR',
        'email': 'user@user.com',
        'name': 'User Admin 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-2',
        'role': 'MENTOR',
        'email': 'user@user.com',
        'name': 'User Admin 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-3',
        'role': 'MENTOR',
        'email': 'user@user.com',
        'name': 'User Admin 3',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ]
    store.mutations.SET_MENTORS(state, data)
    expect(state.userList.mentors).toEqual(data)
  })

  test('SET_JUDGES', () => {
    const data = [
      {
        'id': 'sample-id-admin',
        'role': 'JUDGE',
        'email': 'user@user.com',
        'name': 'User Admin 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-2',
        'role': 'JUDGE',
        'email': 'user@user.com',
        'name': 'User Admin 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-3',
        'role': 'JUDGE',
        'email': 'user@user.com',
        'name': 'User Admin 3',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ]
    store.mutations.SET_JUDGES(state, data)
    expect(state.userList.judges).toEqual(data)
  })
})
