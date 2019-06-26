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
      batchCode: 'futur3',
      assignmentId: 'ASG0001',
      page: 0,
      pageSize: 10
    }
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchRoomList({ commit }, { data, fail })
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
})

describe('getters', () => {
  const state = {
    roomList: [],
    room: {}
  }

  test('roomList', () => {
    expect(store.getters.roomList(state)).toEqual(state.roomList)
  })

  test('room', () => {
    expect(store.getters.room(state)).toEqual(state.room)
  })
})

describe('mutations', () => {
  const state = {
    roomList: [],
    room: {}
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
})
