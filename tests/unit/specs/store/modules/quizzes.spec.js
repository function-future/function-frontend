import store from '@/store/modules/quizzes'
import api from '@/api/controller/quizzes'

jest.mock('@/api/controller/quizzes')

describe('actions', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('fetchQuizList', () => {
    api.getQuizList = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "quizzes": [
            {
              "id": "QZ00001",
              "title": "Quiz Number 1",
              "description": "Description Number 1",
              "startDate": 15000000,
              "endDate": 15000000,
              "timeLimit": 3600,
              "trials": 3,
              "questionCount": 10,
              "questionBanks": [
                "QNK00001"
              ],
              "batch": 3
            },
            {
              "id": "QZ00002",
              "title": "Quiz Number 2",
              "description": "Description Number 2",
              "startDate": 15000000,
              "endDate": 15000000,
              "timeLimit": 3600,
              "trials": 3,
              "questionCount": 10,
              "questionBanks": [
                "QNK00001"
              ],
              "batch": 3
            },
            {
              "id": "QZ00003",
              "title": "Quiz Number 3",
              "description": "Description Number 3",
              "startDate": 15000000,
              "endDate": 15000000,
              "timeLimit": 3600,
              "trials": 3,
              "questionCount": 10,
              "questionBanks": [
                "QNK00001"
              ],
              "batch": 3
            },
            {
              "id": "QZ00004",
              "title": "Quiz Number 4",
              "description": "Description Number 4",
              "startDate": 15000000,
              "endDate": 15000000,
              "timeLimit": 3600,
              "trials": 3,
              "questionCount": 10,
              "questionBanks": [
                "QNK00001"
              ],
              "batch": 3
            }
          ]
        },
        "paging": {
          "page": 1,
          "size": 12,
          "totalRecords": 13
        }
      })
    }
    const data = {
      batchCode: 'futur3',
      page: 1,
      pageSize: 10
    }
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchQuizList({ commit }, { data, fail })
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('GET_QUIZ_LIST', [
      {
        "id": "QZ00001",
        "title": "Quiz Number 1",
        "description": "Description Number 1",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      },
      {
        "id": "QZ00002",
        "title": "Quiz Number 2",
        "description": "Description Number 2",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      },
      {
        "id": "QZ00003",
        "title": "Quiz Number 3",
        "description": "Description Number 3",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      },
      {
        "id": "QZ00004",
        "title": "Quiz Number 4",
        "description": "Description Number 4",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      }
    ])
  })

  test('createQuiz', () => {
    api.createQuiz = (success) => {
      success({
        "code": 201,
        "status": "CREATED",
        "data": {
          "id": "QZ00002",
          "title": "Quiz 1",
          "description": "Description Number 1",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 5,
          "questionBankId": [
            "QNK0001"
          ],
          "questions": 10
        }
      })
    }
    const payload = {
      "id": "QZ00002",
      "title": "Quiz 1",
      "description": "Description Number 1",
      "startDate": 15000000,
      "endDate": 15000000,
      "timeLimit": 3600,
      "trials": 5,
      "questionBankId": [
        "QNK0001"
      ],
      "questions": 10
    }
    const data = {
      batchCode: 'futur3'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.createQuiz({ commit }, { payload, callback, data, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenLastCalledWith('SET_QUIZ', payload)
  })

  test('fetchQuizById', () => {
    api.getQuizById = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "QZ0001",
          "title": "Quiz Title 1",
          "description": "Description Number 1",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batch": 3
        }
      })
    }
    const data = {
      id: 'QZ0001',
      batchCode: '3'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.fetchQuizById({ commit }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_QUIZ', {
      "id": "QZ0001",
      "title": "Quiz Title 1",
      "description": "Description Number 1",
      "startDate": 15000000,
      "endDate": 15000000,
      "timeLimit": 3600,
      "trials": 3,
      "questionCount": 10,
      "questionBanks": [
        "QNK00001"
      ],
      "batch": 3
    })
  })

  test('updateQuizDetail', () => {
    api.updateQuiz = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "QZ0001",
          "title": "Quiz 1",
          "description": "Description Number 1",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 6000,
          "trials": 2,
          "questionBankId": [
            "QNK0002"
          ],
          "questions": 15
        }
      })
    }
    const payload = {
      "title": "Quiz 1",
      "description": "Description Number 1",
      "startDate": 15000000,
      "endDate": 15000000,
      "timeLimit": 6000,
      "trials": 2,
      "questionCount": 10,
      "questionBanks": [
        "QNK00001"
      ],
      "batch": 3
    }
    const data = {
      id: 'QZ0001',
      batchCode: '3'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.updateQuizDetail({ commit }, { payload, callback, data, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenLastCalledWith('SET_QUIZ', payload)
  })
})

describe('getters', () => {
  const state = {
    quizList: [],
    quiz: {}
  }

  test('quizList', () => {
    expect(store.getters.quizList(state)).toEqual(state.quizList)
  })

  test('quiz', () => {
    expect(store.getters.quiz(state)).toEqual(state.quiz)
  })
})

describe('mutations', () => {
  const state = {
    quizList: [],
    quiz: {}
  }

  test('GET_QUIZ_LIST', () => {
    store.mutations.GET_QUIZ_LIST(state, [
      {
        "id": "QZ00001",
        "title": "Quiz Number 1",
        "description": "Description Number 1",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      },
      {
        "id": "QZ00002",
        "title": "Quiz Number 2",
        "description": "Description Number 2",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      },
      {
        "id": "QZ00003",
        "title": "Quiz Number 3",
        "description": "Description Number 3",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      },
      {
        "id": "QZ00004",
        "title": "Quiz Number 4",
        "description": "Description Number 4",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      }
    ])
    expect(state.quizList).toEqual([
      {
        "id": "QZ00001",
        "title": "Quiz Number 1",
        "description": "Description Number 1",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      },
      {
        "id": "QZ00002",
        "title": "Quiz Number 2",
        "description": "Description Number 2",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      },
      {
        "id": "QZ00003",
        "title": "Quiz Number 3",
        "description": "Description Number 3",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      },
      {
        "id": "QZ00004",
        "title": "Quiz Number 4",
        "description": "Description Number 4",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batch": 3
      }
    ])
  })

  test('SET_QUIZ', () => {
    store.mutations.SET_QUIZ(state, {
      "id": "QZ0001",
      "title": "Quiz Title 1",
      "description": "Description Number 1",
      "startDate": 15000000,
      "endDate": 15000000,
      "timeLimit": 3600,
      "trials": 3,
      "questionCount": 10,
      "questionBanks": [
        "QNK00001"
      ],
      "batch": 3
    })
    expect(state.quiz).toEqual({
      "id": "QZ0001",
      "title": "Quiz Title 1",
      "description": "Description Number 1",
      "startDate": 15000000,
      "endDate": 15000000,
      "timeLimit": 3600,
      "trials": 3,
      "questionCount": 10,
      "questionBanks": [
        "QNK00001"
      ],
      "batch": 3
    })
  })
})
