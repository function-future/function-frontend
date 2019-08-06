import store from '@/store/modules/assignment-rooms'
import api from '@/api/controller/assignment-rooms'

jest.mock('@/api/controller/assignment-rooms')

describe('actions', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('fetchRoomList', () => {
    api.getAssignmentRooms = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": [
          {
            "id": "ROM0001",
            "point": 80,
            "student": "USR0001"
          },
          {
            "id": "ROM0002",
            "point": 90,
            "student": "USR0002"
          }
        ],
        "paging": {
          "page": 1,
          "size": 12,
          "totalRecords": 13
        }
      })
    }
    const data = {
      batchCode: '1',
      assignmentId: 'ASG0001',
      page: 1,
      pageSize: 10
    }
    const callback = jest.fn()
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchRoomList({ commit }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('GET_ROOM_LIST', [
      {
        "id": "ROM0001",
        "point": 80,
        "student": "USR0001"
      },
      {
        "id": "ROM0002",
        "point": 90,
        "student": "USR0002"
      }
    ])
  })

  test('fetchRoomDetail', () => {
    api.getAssignmentRoomById = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "ROM0001",
          "point": 100,
          "student": "USR0001"
        }
      })
    }
    const data = {
      batchCode: 'futur3',
      assignmentId: 'ASG0001',
      roomId: 'ROM0001'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.fetchRoomDetail({ commit }, { data, callback, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_ROOM', {
      "id": "ROM0001",
      "point": 100,
      "student": "USR0001"
    })
  })

  test('fetchComments', () => {
    api.getAssignmentRoomComments = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": [
          {
            "id": "CMT00001",
            "author": {
              "id": "USR00001",
              "name": "User 1"
            },
            "comment": "Comment Example 1",
            "createdAt": 1500000000
          },
          {
            "id": "CMT00002",
            "author": {
              "id": "USR00001",
              "name": "User 1"
            },
            "comment": "Comment Example 2",
            "createdAt": 1500000000
          }
        ],
        "paging": {
          "page": 1,
          "size": 4,
          "totalRecords": 12
        }
      })
    }
    const data = {
      batchCode: '1',
      assignmentId: 'ASG0001',
      roomId: 'ROM0001',
      page: 1,
      pageSize: 10
    }
    const callback = jest.fn()
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchComments({ commit }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('GET_COMMENTS', [
      {
        "id": "CMT00001",
        "author": {
          "id": "USR00001",
          "name": "User 1"
        },
        "comment": "Comment Example 1",
        "createdAt": 1500000000
      },
      {
        "id": "CMT00002",
        "author": {
          "id": "USR00001",
          "name": "User 1"
        },
        "comment": "Comment Example 2",
        "createdAt": 1500000000
      }
    ])
  })

  test('postComment', () => {
    api.createAssignmentRoomComment = (success) => {
      success({
        "code": 201,
        "status": "CREATED",
        "data": {
          "id": "CMT00002",
          "author": {
            "id": "USR00001",
            "name": "User 1"
          },
          "comment": "Comment Example 2",
          "createdAt": 1500000000
        }
      })
    }
    const data = {
      batchCode: '1',
      assignmentId: 'ASG0001',
      roomId: 'ROM0001',
      page: 1,
      pageSize: 10
    }
    const payload = {}
    const callback = jest.fn()
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.postComment({ commit }, { data, payload, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
  })

  test('postAssignmentScore', () => {
    api.updateAssignmentScore = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "ROM0001",
          "point": 300,
          "student": {
            "id": "sample-id",
            "role": "STUDENT",
            "email": "user@user.com",
            "name": "User Name",
            "phone": "088888888888",
            "address": "Jl. Address 1 Address 2",
            "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            "batch": "3",
            "university": "Bina Nusantara University"
          },
          "assignment": {
            "id": "ASG0001",
            "title": "Assignment 1",
            "description": "Description Number 1",
            "deadline": 15000000,
            "file": "http://function-static.com/ASG0001/fileName.docx",
            "batch": "3"
          }
        }
      })
    }
    const data = {
      batchCode: '1',
      assignmentId: 'ASG0001',
      roomId: 'ROM0001'
    }
    const payload = {
      point: 80
    }
    const callback = jest.fn()
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.postAssignmentScore({ commit }, { data, payload, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
  })
})

describe('getters', () => {
  const state = {
    roomList: [],
    room: {},
    comments: []
  }

  test('roomList', () => {
    expect(store.getters.roomList(state)).toEqual(state.roomList)
  })

  test('room', () => {
    expect(store.getters.room(state)).toEqual(state.room)
  })

  test('comments', () => {
    expect(store.getters.comments(state)).toEqual(state.comments)
  })
})

describe('mutations', () => {
  const state = {
    roomList: [],
    room: {},
    comments: []
  }

  test('GET_ROOM_LIST', () => {
    store.mutations.GET_ROOM_LIST(state, [
      {
        "id": "ROM0001",
        "point": 80,
        "student": "USR0001"
      },
      {
        "id": "ROM0002",
        "point": 90,
        "student": "USR0002"
      }
    ])
    expect(state.roomList).toEqual([
      {
        "id": "ROM0001",
        "point": 80,
        "student": "USR0001"
      },
      {
        "id": "ROM0002",
        "point": 90,
        "student": "USR0002"
      }
    ])
  })

  test('SET_ROOM', () => {
    store.mutations.SET_ROOM(state, {
      "id": "ROM0001",
      "point": 100,
      "student": "USR0001"
    })
    expect(state.room).toEqual({
      "id": "ROM0001",
      "point": 100,
      "student": "USR0001"
    })
  })

  test('GET_COMMENTS', () => {
    store.mutations.GET_COMMENTS(state, [
      {
        "id": "CMT00001",
        "author": {
          "id": "USR00001",
          "name": "User 1"
        },
        "comment": "Comment Example 1",
        "createdAt": 1500000000
      },
      {
        "id": "CMT00002",
        "author": {
          "id": "USR00001",
          "name": "User 1"
        },
        "comment": "Comment Example 2",
        "createdAt": 1500000000
      }
    ])
    expect(state.comments).toEqual([
      {
        "id": "CMT00001",
        "author": {
          "id": "USR00001",
          "name": "User 1"
        },
        "comment": "Comment Example 1",
        "createdAt": 1500000000
      },
      {
        "id": "CMT00002",
        "author": {
          "id": "USR00001",
          "name": "User 1"
        },
        "comment": "Comment Example 2",
        "createdAt": 1500000000
      }
    ])
  })
})
