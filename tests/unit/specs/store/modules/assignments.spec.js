import store from '@/store/modules/assignments'
import api from '@/api/controller/assignments'

jest.mock('@/api/controller/assignments')

describe('actions', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('fetchAssignmentList', () => {
    api.getAssignmentsList = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': [
          {
            'id': 'ASG0001',
            'title': 'Assignments 1',
            'description': 'Description Number 1',
            'deadline': 15000000,
            'batch': 3,
            'uploadedDate': 15000000000
          },
          {
            'id': 'ASG0002',
            'title': 'Assignments 2',
            'description': 'Description Number 2',
            'deadline': 30000000,
            'batch': 3,
            'uploadedDate': 30000000000
          }
        ],
        'paging': {
          'page': 1,
          'size': 12,
          'totalRecords': 13
        }
      })
    }
    const data = {
      batchCode: 'futur3',
      page: 0,
      pageSize: 10
    }
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchAssignmentList({ commit }, { data, fail })
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('GET_ASSIGNMENT_LIST', [
      {
        'id': 'ASG0001',
        'title': 'Assignments 1',
        'description': 'Description Number 1',
        'deadline': 15000000,
        'batch': 3,
        'uploadedDate': 15000000000
      },
      {
        'id': 'ASG0002',
        'title': 'Assignments 2',
        'description': 'Description Number 2',
        'deadline': 30000000,
        'batch': 3,
        'uploadedDate': 30000000000
      }
    ])
  })

  test('createAssignment', () => {
    api.createAssignment = (success) => {
      success({
        'code': 201,
        'status': 'CREATED',
        'data': {
          'id': 'ASG0001',
          'title': 'Assignments 1',
          'description': 'Description Number 1',
          'deadline': 1500000000,
          'file': 'function-static.com/fileName.docx',
          'batch': 3
        }
      })
    }
    const payload = {
      'id': 'ASG0001',
      'title': 'Assignments 1',
      'description': 'Description Number 1',
      'deadline': 1500000000,
      'file': 'function-static.com/fileName.docx',
      'batch': 3
    }
    const data = {
      batchCode: 'futur3',
      page: 0,
      pageSize: 10
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.createAssignment({ commit }, { payload, callback, data, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenLastCalledWith('SET_ASSIGNMENT', payload)
  })
})

describe('getters', () => {
  const state = {
    assignmentList: []
  }

  test('assignmentList', () => {
    expect(store.getters.assignmentList(state)).toEqual(state.assignmentList)
  })
})

describe('mutations', () => {
  const state = {
    assignmentList: [],
    assignment: {}
  }

  test('GET_ASSIGNMENT_LIST', () => {
    store.mutations.GET_ASSIGNMENT_LIST(state, [
      {
        'id': 'ASG0001',
        'title': 'Assignments 1',
        'description': 'Description Number 1',
        'deadline': 15000000,
        'batch': 3,
        'uploadedDate': 15000000000
      },
      {
        'id': 'ASG0002',
        'title': 'Assignments 2',
        'description': 'Description Number 2',
        'deadline': 30000000,
        'batch': 3,
        'uploadedDate': 30000000000
      }
    ])
    expect(state.assignmentList).toEqual([
      {
        'id': 'ASG0001',
        'title': 'Assignments 1',
        'description': 'Description Number 1',
        'deadline': 15000000,
        'batch': 3,
        'uploadedDate': 15000000000
      },
      {
        'id': 'ASG0002',
        'title': 'Assignments 2',
        'description': 'Description Number 2',
        'deadline': 30000000,
        'batch': 3,
        'uploadedDate': 30000000000
      }
    ])
  })

  test('SET_ASSIGNMENT', () => {
    store.mutations.SET_ASSIGNMENT(state, {
      'id': 'ASG0001',
      'title': 'Assignments 1',
      'description': 'Description Number 1',
      'deadline': 1500000000,
      'file': 'function-static.com/fileName.docx',
      'batch': 3
    })
    expect(state.assignment).toEqual({
      'id': 'ASG0001',
      'title': 'Assignments 1',
      'description': 'Description Number 1',
      'deadline': 1500000000,
      'file': 'function-static.com/fileName.docx',
      'batch': 3
    })
  })
})
