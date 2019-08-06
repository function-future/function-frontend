import store from '@/store/modules/final-judging'
import api from '@/api/controller/final-judging'

jest.mock('@/api/controller/final-judging')

describe('actions', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('fetchJudgingList', () => {
    api.getJudgingList = (success) => {
      success({
        "code" : 200,
        "status" : "OK",
        "data" : [
          {
            "id" : "FNC0001",
            "title" : "Final Comparison #1",
            "description" : "Final Comparison of Students",
            "studentCount" : 4,
            "uploadedDate" : 15000000000,
            "usedAt" : 15000000000
          },
          {
            "id" : "FNC0002",
            "title" : "Final Comparison #2",
            "description" : "Final Comparison of Students",
            "studentCount" : 3,
            "uploadedDate" : 15000000000,
            "usedAt" : 15000000000
          }
        ],
        "paging": {
          "page": 1,
          "size": 10,
          "totalRecords": 13
        }
      })
    }
    const data = {
      page: 1,
      pageSize: 10
    }
    const callback = jest.fn()
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchJudgingList({ commit }, { data, callback, fail })
    expect(fail).not.toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('GET_JUDGING_LIST', [
      {
        "id" : "FNC0001",
        "title" : "Final Comparison #1",
        "description" : "Final Comparison of Students",
        "studentCount" : 4,
        "uploadedDate" : 15000000000,
        "usedAt" : 15000000000
      },
      {
        "id" : "FNC0002",
        "title" : "Final Comparison #2",
        "description" : "Final Comparison of Students",
        "studentCount" : 3,
        "uploadedDate" : 15000000000,
        "usedAt" : 15000000000
      }
    ])
  })

  test('fetchJudgingDetail', () => {
    api.getJudgingDetail = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "FNC0001",
          "name": "Final Comparison 1",
          "description": "Final Comparison of Students",
          "batchCode": "3",
          "uploadedDate": 15000000000,
          "studentCount": 3,
          "students": [
            {
              'id': 'sample-id-student',
              'role': 'STUDENT',
              'email': 'user@user.com',
              'name': 'User Student 1',
              'phone': '088888888888',
              'address': 'Jl. Address 1 Address 2',
              'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
              'batch': {
                'id': 'sample-id',
                'name': 'Batch Name',
                'code': '3'
              },
              'university': 'Bina Nusantara University'
            },
            {
              'id': 'sample-id-2',
              'role': 'STUDENT',
              'email': 'user@user.com',
              'name': 'User Student 2',
              'phone': '088888888888',
              'address': 'Jl. Address 1 Address 2',
              'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
              'batch': {
                'id': 'sample-id',
                'name': 'Batch Name',
                'code': '3'
              },
              'university': 'Bina Nusantara University'
            }
          ]
        }
      })
    }
    const data = {
      batchCode: '1',
      judgingId: 'FNC0001'
    }
    const callback = jest.fn()
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchJudgingDetail({ commit }, { data, callback, fail })
    expect(fail).not.toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('GET_JUDGING', {
      "id": "FNC0001",
      "name": "Final Comparison 1",
      "description": "Final Comparison of Students",
      "batchCode": "3",
      "uploadedDate": 15000000000,
      "studentCount": 3,
      "students": [
        {
          'id': 'sample-id-student',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 1',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        },
        {
          'id': 'sample-id-2',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 2',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        }
      ]
    })
  })

  test('fetchComparison', () => {
    api.getComparison = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data" : [
          {
            "studentId": "student-id-1",
            "studentName" : "Student 1",
            "batchCode" : "1",
            "university": "Binus University",
            "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            "point": 100,
            "scores" : [
              {
                "title" : "Quiz #1",
                "type": "QUIZ",
                "point" : 100
              },
              {
                "title" : "Quiz #2",
                "type": "QUIZ",
                "point" : 80
              },
              {
                "title" : "Assignment #1",
                "type": "ASSIGNMENT",
                "point" : 80
              },
              {
                "title" : "Quiz #1",
                "type": "QUIZ",
                "point" : 100
              },
              {
                "title" : "Quiz #2",
                "type": "QUIZ",
                "point" : 80
              },
              {
                "title" : "Assignment #1",
                "type": "ASSIGNMENT",
                "point" : 80
              }
            ]
          },
          {
            "studentId": "student-id-2",
            "studentName" : "Student 2",
            "batchCode" : "1",
            "university": "Binus University",
            "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
            "point": 100,
            "scores" : [
              {
                "title" : "Quiz #1",
                "type": "QUIZ",
                "point" : 100
              },
              {
                "title" : "Quiz #2",
                "type": "QUIZ",
                "point" : 80
              },
              {
                "title" : "Assignment #1",
                "type": "ASSIGNMENT",
                "point" : 80
              }
            ]
          }
        ]
      })
    }
    const data = {
      batchCode: '1',
      judgingId: 'FNC0001'
    }
    const callback = jest.fn()
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchComparison({ commit }, { data, callback, fail })
    expect(fail).not.toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('GET_COMPARISON', [
      {
        "studentId": "student-id-1",
        "studentName" : "Student 1",
        "batchCode" : "1",
        "university": "Binus University",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "point": 100,
        "scores" : [
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          },
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          }
        ]
      },
      {
        "studentId": "student-id-2",
        "studentName" : "Student 2",
        "batchCode" : "1",
        "university": "Binus University",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "point": 100,
        "scores" : [
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          }
        ]
      }
    ])
  })

  test('createJudging', () => {
    api.createJudging = (success) => {
      success({
        "code": 201,
        "status": "CREATED",
        "data": {
          "id": "FNC0001",
          "name": "Final Comparison #1",
          "description": "Final Comparison Decription #1",
          "batchCode": "3",
          "studentCount": 3,
          "uploadedDate": 15000000000,
          "students": [
            {
              "studentId": "student-id",
              "studentName": "Student",
              "university": "University",
              "avatar": "http://localhost:8080/avatar.png",
              "batchCode": "3"
            },
            {
              "studentId": "student-id-2",
              "studentName": "Student 2",
              "university": "University",
              "avatar": "http://localhost:8080/avatar-2.png",
              "batchCode": "3"
            }
          ]
        }
      })
    }
    const payload = {
      "name": "Final Comparison #1",
      "description": "Final Comparison Decription #1",
      "students": [
        "student-id",
        "student-id-2"
      ]
    }
    const data = {
      batchCode: 'futur3'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.createJudging({ commit }, { payload, callback, data, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('submitScore', () => {
    api.postFinalScore = (success) => {
      success({
        "code": 201,
        "status": "CREATED",
        "data": [
          {
            "studentId": "SDT0001",
            "score": 90
          },
          {
            "studentId": "SDT0002",
            "score": 80
          },
          {
            "studentId": "SDT0003",
            "score": 70
          }
        ]
      })
    }
    const payload = {
      "scores": [
        {
          "studentId": "student-id-1",
          "score": 90
        },
        {
          "studentId": "student-id-2",
          "score": 80
        },
        {
          "studentId": "student-id-3",
          "score": 70
        }
      ]
    }
    const data = {
      batchCode: 'futur3'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.submitScore({ commit }, { payload, callback, data, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('updateJudging', () => {
    api.updateJudgingDetail = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "FNC0001",
          "title": "Final Comparison 1",
          "description": "Final Comparison of Students",
          "usedAt": 150000000,
          "batchCode": "3",
          "studentIds": [
            "USR0001",
            "USR0002",
            "USR0003"
          ],
          "studentCount": 3
        }
      })
    }
    const payload = {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "FNC0001",
        "title": "Final Comparison 1",
        "description": "Final Comparison of Students",
        "uploadedAt": 150000000,
        "batchCode": "3",
        "studentCount": 3,
        "students": [
          {
            "studentId": "student-id",
            "studentName": "Student",
            "university": "University",
            "avatar": "http://localhost:8080/avatar.png",
            "batchCode": "3"
          },
          {
            "studentId": "student-id-2",
            "studentName": "Student 2",
            "university": "University",
            "avatar": "http://localhost:8080/avatar-2.png",
            "batchCode": "3"
          }
        ]
      }
    }
    const data = {
      judgingId: 'FNC0001',
      batchCode: '3'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.updateJudging({ commit }, { payload, callback, data, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('deleteJudging', () => {
    api.deleteJudging = (success) => {
      success({
        "code": 200,
        "status": "OK"
      })
    }
    const data = {
      batchCode: 'futur3',
      judgingId: 'FNC0001'
    }
    const state = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.deleteJudging({ state }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toHaveBeenCalled()
  })
})

describe('getters', () => {
  const state = {
    judgingList: [],
    judging: {},
    comparison: [],
    score: []
  }

  test('judgingList', () => {
    expect(store.getters.judgingList(state)).toEqual(state.judgingList)
  })

  test('judging', () => {
    expect(store.getters.judging(state)).toEqual(state.judging)
  })

  test('comparison', () => {
    expect(store.getters.comparison(state)).toEqual(state.comparison)
  })

  test('score', () => {
    expect(store.getters.score(state)).toEqual(state.score)
  })
})

describe('mutations', () => {
  const state = {
    judgingList: [],
    judging: {},
    comparison: [],
    score: []
  }

  test('GET_JUDGING_LIST', () => {
    store.mutations.GET_JUDGING_LIST(state, [
      {
        "id" : "FNC0001",
        "title" : "Final Comparison #1",
        "description" : "Final Comparison of Students",
        "studentCount" : 4,
        "uploadedDate" : 15000000000,
        "usedAt" : 15000000000
      },
      {
        "id" : "FNC0002",
        "title" : "Final Comparison #2",
        "description" : "Final Comparison of Students",
        "studentCount" : 3,
        "uploadedDate" : 15000000000,
        "usedAt" : 15000000000
      }
    ])
    expect(state.judgingList).toEqual([
      {
        "id" : "FNC0001",
        "title" : "Final Comparison #1",
        "description" : "Final Comparison of Students",
        "studentCount" : 4,
        "uploadedDate" : 15000000000,
        "usedAt" : 15000000000
      },
      {
        "id" : "FNC0002",
        "title" : "Final Comparison #2",
        "description" : "Final Comparison of Students",
        "studentCount" : 3,
        "uploadedDate" : 15000000000,
        "usedAt" : 15000000000
      }
    ])
  })

  test('GET_JUDGING', () => {
    store.mutations.GET_JUDGING(state, {
      "id": "FNC0001",
      "name": "Final Comparison 1",
      "description": "Final Comparison of Students",
      "batchCode": "3",
      "uploadedDate": 15000000000,
      "studentCount": 3,
      "students": [
        {
          'id': 'sample-id-student',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 1',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        },
        {
          'id': 'sample-id-2',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 2',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        }
      ]
    })
    expect(state.judging).toEqual({
      "id": "FNC0001",
      "name": "Final Comparison 1",
      "description": "Final Comparison of Students",
      "batchCode": "3",
      "uploadedDate": 15000000000,
      "studentCount": 3,
      "students": [
        {
          'id': 'sample-id-student',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 1',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        },
        {
          'id': 'sample-id-2',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 2',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        }
      ]
    })
  })

  test('GET_COMPARISON', () => {
    store.mutations.GET_COMPARISON(state, [
      {
        "studentId": "student-id-1",
        "studentName" : "Student 1",
        "batchCode" : "1",
        "university": "Binus University",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "point": 100,
        "scores" : [
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          },
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          }
        ]
      },
      {
        "studentId": "student-id-2",
        "studentName" : "Student 2",
        "batchCode" : "1",
        "university": "Binus University",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "point": 100,
        "scores" : [
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          }
        ]
      }
    ])
    expect(state.comparison).toEqual([
      {
        "studentId": "student-id-1",
        "studentName" : "Student 1",
        "batchCode" : "1",
        "university": "Binus University",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "point": 100,
        "scores" : [
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          },
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          }
        ]
      },
      {
        "studentId": "student-id-2",
        "studentName" : "Student 2",
        "batchCode" : "1",
        "university": "Binus University",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "point": 100,
        "scores" : [
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          }
        ]
      }
    ])
  })
})
