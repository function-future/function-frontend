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
      page: 1,
      pageSize: 10
    }
    const callback = jest.fn()
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchAssignmentList({ commit }, { data, callback, fail })
    expect(fail).not.toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
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

  test('fetchStudentAssignmentList', () => {
    api.getStudentAssignments = (success) => {
      success({
        "code" : 200,
        "status" : "OK",
        "data" : [
          {
            "id" : "ROM0001",
            "point" : 80,
            "student" : {
              "id": "SDT00001",
              "name": "Oliver Sebastian",
              "phone": "+6285774263075",
              "role": "STUDENT",
              "address": "Tangerang",
              "email": "oliver@gmail.com",
              "avatar": "http://function-src.com/asdasd",
              "batch": "3",
              "university": "BINUS"
            },
            "assignment": {
              "id" : "ASG0001",
              "title" : "Assignment 1",
              "description" : "Description Number 1",
              "deadline" : 15000000,
              "file" : "http://function-static.com/ASG0001/fileName.docx",
              "batchCode" : "3"
            }
          },
          {
            "id" : "ROM0002",
            "point" : 90,
            "student" : {
              "id": "SDT00001",
              "name": "Oliver Sebastian",
              "phone": "+6285774263075",
              "role": "STUDENT",
              "address": "Tangerang",
              "email": "oliver@gmail.com",
              "avatar": "http://function-src.com/asdasd",
              "batch": "3",
              "university": "BINUS"
            },
            "assignment": {
              "id" : "ASG0001",
              "title" : "Assignment 1",
              "description" : "Description Number 1",
              "deadline" : 15000000,
              "file" : "http://function-static.com/ASG0001/fileName.docx",
              "batchCode" : "3"
            }
          }
        ],
        "paging" : {
          "page" : 1,
          "size" : 12,
          "totalRecords" : 13
        }
      })
    }
    const data = {
      batchCode: 'futur3',
      assignmentId: '',
      studentId: '',
      page: 1,
      pageSize: 10
    }
    const callback = jest.fn()
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchStudentAssignmentList({ commit }, { data, callback, fail })
    expect(fail).not.toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('GET_STUDENT_ASSIGNMENT_LIST', [
      {
        "id" : "ROM0001",
        "point" : 80,
        "student" : {
          "id": "SDT00001",
          "name": "Oliver Sebastian",
          "phone": "+6285774263075",
          "role": "STUDENT",
          "address": "Tangerang",
          "email": "oliver@gmail.com",
          "avatar": "http://function-src.com/asdasd",
          "batch": "3",
          "university": "BINUS"
        },
        "assignment": {
          "id" : "ASG0001",
          "title" : "Assignment 1",
          "description" : "Description Number 1",
          "deadline" : 15000000,
          "file" : "http://function-static.com/ASG0001/fileName.docx",
          "batchCode" : "3"
        }
      },
      {
        "id" : "ROM0002",
        "point" : 90,
        "student" : {
          "id": "SDT00001",
          "name": "Oliver Sebastian",
          "phone": "+6285774263075",
          "role": "STUDENT",
          "address": "Tangerang",
          "email": "oliver@gmail.com",
          "avatar": "http://function-src.com/asdasd",
          "batch": "3",
          "university": "BINUS"
        },
        "assignment": {
          "id" : "ASG0001",
          "title" : "Assignment 1",
          "description" : "Description Number 1",
          "deadline" : 15000000,
          "file" : "http://function-static.com/ASG0001/fileName.docx",
          "batchCode" : "3"
        }
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
      page: 1,
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

  test('fetchAssignmentDetail', () => {
    api.getAssignmentById = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "ASG0001",
          "title": "Assignment 1",
          "description": "Description Number 1",
          "deadline": 15000000,
          "file": "http://function-static.com/ASG0001/fileName.docx",
          "batch": 3
        }
      })
    }
    const data = {
      id: 'ASG001',
      batchCode: '3'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.fetchAssignmentDetail({ commit }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_ASSIGNMENT', {
      "id": "ASG0001",
      "title": "Assignment 1",
      "description": "Description Number 1",
      "deadline": 15000000,
      "file": "http://function-static.com/ASG0001/fileName.docx",
      "batch": 3
    })
  })

  test('updateAssignmentDetail', () => {
    api.updateAssignment = (success) => {
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
      "id": "ASG0001",
      "title": "Assignment 1",
      "description": "Description Number 1",
      "deadline": 15000000,
      "file": "http://function-static.com/ASG0001/fileName.docx",
      "batch": 3
    }
    const data = {
      id: 'ASG001',
      batchCode: '3'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.updateAssignmentDetail({ commit }, { payload, callback, data, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenLastCalledWith('SET_ASSIGNMENT', payload)
  })

  test('copyAssignment', () => {
    api.copyAssignment = (success) => {
      success({
        "code": 201,
        "status": "CREATED",
        "data": {
          "id": "ASG0001",
          "title": "Assignment 1",
          "description": "Description Number 1",
          "deadline": 1500000000,
          "file": "function-static.com/fileName.docx",
          "batch": 3
        }
      })
    }
    const payload = {
      id: "ASG0001",
      title: "Assignment 1",
      description: "Description Number 1",
      deadline: 1500000000,
      file: "function-static.com/fileName.docx",
      batch: 3
    }
    const data = {
      bathCode: 'sample-id-3'
    }
    const state = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.copyAssignment({ state }, { payload, data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
  })

  test('deleteAssignmentById', () => {
    api.deleteAssignment = (success) => {
      success({
        "code": 200,
        "status": "OK"
      })
    }
    const data = {
      batchCode: 'futur3',
      assignmentId: 'ASG0001'
    }
    const state = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.deleteAssignmentById({ state }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
  })
})

describe('getters', () => {
  const state = {
    assignmentList: [],
    assignment: {},
    studentAssignments: []
  }

  test('assignmentList', () => {
    expect(store.getters.assignmentList(state)).toEqual(state.assignmentList)
  })

  test('assignment', () => {
    expect(store.getters.assignment(state)).toEqual(state.assignment)
  })

  test('studentAssignments', () => {
    expect(store.getters.studentAssignments(state)).toEqual(state.studentAssignments)
  })
})

describe('mutations', () => {
  const state = {
    assignmentList: [],
    assignment: {},
    studentAssignments: []
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

  test('GET_STUDENT_ASSIGNMENT_LIST', () => {
    store.mutations.GET_STUDENT_ASSIGNMENT_LIST(state, [
      {
        "id" : "ROM0001",
        "point" : 80,
        "student" : {
          "id": "SDT00001",
          "name": "Oliver Sebastian",
          "phone": "+6285774263075",
          "role": "STUDENT",
          "address": "Tangerang",
          "email": "oliver@gmail.com",
          "avatar": "http://function-src.com/asdasd",
          "batch": "3",
          "university": "BINUS"
        },
        "assignment": {
          "id" : "ASG0001",
          "title" : "Assignment 1",
          "description" : "Description Number 1",
          "deadline" : 15000000,
          "file" : "http://function-static.com/ASG0001/fileName.docx",
          "batchCode" : "3"
        }
      },
      {
        "id" : "ROM0002",
        "point" : 90,
        "student" : {
          "id": "SDT00001",
          "name": "Oliver Sebastian",
          "phone": "+6285774263075",
          "role": "STUDENT",
          "address": "Tangerang",
          "email": "oliver@gmail.com",
          "avatar": "http://function-src.com/asdasd",
          "batch": "3",
          "university": "BINUS"
        },
        "assignment": {
          "id" : "ASG0001",
          "title" : "Assignment 1",
          "description" : "Description Number 1",
          "deadline" : 15000000,
          "file" : "http://function-static.com/ASG0001/fileName.docx",
          "batchCode" : "3"
        }
      }
    ])
    expect(state.studentAssignments).toEqual([
      {
        "id" : "ROM0001",
        "point" : 80,
        "student" : {
          "id": "SDT00001",
          "name": "Oliver Sebastian",
          "phone": "+6285774263075",
          "role": "STUDENT",
          "address": "Tangerang",
          "email": "oliver@gmail.com",
          "avatar": "http://function-src.com/asdasd",
          "batch": "3",
          "university": "BINUS"
        },
        "assignment": {
          "id" : "ASG0001",
          "title" : "Assignment 1",
          "description" : "Description Number 1",
          "deadline" : 15000000,
          "file" : "http://function-static.com/ASG0001/fileName.docx",
          "batchCode" : "3"
        }
      },
      {
        "id" : "ROM0002",
        "point" : 90,
        "student" : {
          "id": "SDT00001",
          "name": "Oliver Sebastian",
          "phone": "+6285774263075",
          "role": "STUDENT",
          "address": "Tangerang",
          "email": "oliver@gmail.com",
          "avatar": "http://function-src.com/asdasd",
          "batch": "3",
          "university": "BINUS"
        },
        "assignment": {
          "id" : "ASG0001",
          "title" : "Assignment 1",
          "description" : "Description Number 1",
          "deadline" : 15000000,
          "file" : "http://function-static.com/ASG0001/fileName.docx",
          "batchCode" : "3"
        }
      }
    ])
  })
})
