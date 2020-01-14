import store from '@/store/modules/student-quiz'
import api from '@/api/controller/student-quiz'

jest.mock('@/api/controller/student-quiz')

describe('actions', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('fetchQuestionBankList', () => {
    api.getQuizzes = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "paging": {
          "page": 1,
          "size": 12,
          "totalRecords": 13
        },
        "data": [
          {
            "id": "sample-id",
            "quiz": {
              "id": "QZ0001",
              "title": "Quiz 2",
              "description": "Description for Quiz 2",
              "startDate": 15000000,
              "endDate": 15000000,
              "timeLimit": 3600,
              "trials": 3,
              "questionCount": 10,
              "questionBanks": [
                "QNK00001"
              ],
              "batchCode": "3"
            }
          },
          {
            "id": "sample-id",
            "quiz": {
              "id": "QZ0001",
              "title": "Quiz 2",
              "description": "Description for Quiz 2",
              "startDate": 15000000,
              "endDate": 15000000,
              "timeLimit": 3600,
              "trials": 3,
              "questionCount": 10,
              "questionBanks": [
                "QNK00001"
              ],
              "batchCode": "3"
            }
          }
        ]
      })
    }
    const data = {
      page: 1,
      pageSize: 10
    }
    const commit = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.fetchStudentQuizList({ commit }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('GET_STUDENT_QUIZ_LIST', [
      {
        "id": "sample-id",
        "quiz": {
          "id": "QZ0001",
          "title": "Quiz 2",
          "description": "Description for Quiz 2",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batchCode": "3"
        }
      },
      {
        "id": "sample-id",
        "quiz": {
          "id": "QZ0001",
          "title": "Quiz 2",
          "description": "Description for Quiz 2",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batchCode": "3"
        }
      }
    ])
  })

  test('fetchStudentQuizDetail', () => {
    api.getQuizDetail = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "sample-id",
          "quiz": {
            "id": "QZ0001",
            "title": "Quiz 2",
            "description": "Description for Quiz 2",
            "startDate": 15000000,
            "endDate": 15000000,
            "timeLimit": 3600,
            "trials": 3,
            "questionCount": 10,
            "questionBanks": [
              "QNK00001"
            ],
            "batchCode": "3"
          }
        }
      })
    }
    const data = {}
    const commit = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.fetchStudentQuizDetail({ commit }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_STUDENT_QUIZ_DETAIL', {
      "id": "sample-id",
      "quiz": {
        "id": "QZ0001",
        "title": "Quiz 2",
        "description": "Description for Quiz 2",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batchCode": "3"
      }
    })
  })

  test('fetchStudentQuizQuestions', () => {
    api.getQuestions = (success) => {
      success({
        "code" : 200,
        "status" : "OK",
        "data" : {
          "questions": [
            {
              "number" : 1,
              "text" : "Question Example 1",
              "options" : [
                {
                  "optionId" : "OptionId1",
                  "label" : "Answer Example 1"
                },
                {
                  "optionId" : "OptionId2",
                  "label" : "Answer Example 2"
                },
                {
                  "optionId" : "OptionId3",
                  "label" : "Answer Example 3"
                },
                {
                  "optionId" : "OptionId4",
                  "label" : "Answer Example 4"
                }
              ]
            },
            {
              "number" : 2,
              "text" : "Question Example 2",
              "options" : [
                {
                  "optionId" : "OptionId1",
                  "label" : "Answer Example 5"
                },
                {
                  "optionId" : "OptionId2",
                  "label" : "Answer Example 6"
                },
                {
                  "optionId" : "OptionId3",
                  "label" : "Answer Example 7"
                },
                {
                  "optionId" : "OptionId4",
                  "label" : "Answer Example 8"
                }
              ]
            },
          ]
        }
      })
    }
    const data = {}
    const commit = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.fetchStudentQuizQuestions({ commit }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_STUDENT_QUIZ_QUESTIONS', {
      "questions": [
        {
          "number" : 1,
          "text" : "Question Example 1",
          "options" : [
            {
              "optionId" : "OptionId1",
              "label" : "Answer Example 1"
            },
            {
              "optionId" : "OptionId2",
              "label" : "Answer Example 2"
            },
            {
              "optionId" : "OptionId3",
              "label" : "Answer Example 3"
            },
            {
              "optionId" : "OptionId4",
              "label" : "Answer Example 4"
            }
          ]
        },
        {
          "number" : 2,
          "text" : "Question Example 2",
          "options" : [
            {
              "optionId" : "OptionId1",
              "label" : "Answer Example 5"
            },
            {
              "optionId" : "OptionId2",
              "label" : "Answer Example 6"
            },
            {
              "optionId" : "OptionId3",
              "label" : "Answer Example 7"
            },
            {
              "optionId" : "OptionId4",
              "label" : "Answer Example 8"
            }
          ]
        },
      ]
    })
  })

  test('fetchStudentQuizQuestions', () => {
    api.getTimeLimit = (success) => {
      success({
        "code" : 200,
        "status" : "OK",
        "data" : 10
      })
    }
    const data = {}
    const state = {}
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.fetchStudentQuizTimeLimit({ state }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toBeCalled()
  })


  test('submitAnswers', () => {
    api.postQuizAnswer = (success) => {
      success({
        "code": 201,
        "status": "CREATED",
        "data": {
          "point": 100
        }
      })
    }
    const payload = {}
    const data = {}
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.submitAnswers({ commit }, { payload, data, callback, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})

describe('getters', () => {
  const state = {
    studentQuizList: [],
    studentQuizDetail: {},
    studentQuizQuestions: {
      questions: []
    }
  }

  test('questionBanks', () => {
    expect(store.getters.studentQuizList(state)).toEqual(state.studentQuizList)
  })

  test('questionBank', () => {
    expect(store.getters.studentQuizDetail(state)).toEqual(state.studentQuizDetail)
  })

  test('questionList', () => {
    expect(store.getters.studentQuizQuestions(state)).toEqual(state.studentQuizQuestions)
  })
})

describe('mutations', () => {
  const state = {
    studentQuizList: [],
    studentQuizDetail: {},
    studentQuizQuestions: {
      questions: []
    }
  }
  test('GET_STUDENT_QUIZ_LIST', () => {
    store.mutations.GET_STUDENT_QUIZ_LIST(state, [
      {
        "id": "sample-id",
        "quiz": {
          "id": "QZ0001",
          "title": "Quiz 2",
          "description": "Description for Quiz 2",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batchCode": "3"
        }
      },
      {
        "id": "sample-id",
        "quiz": {
          "id": "QZ0001",
          "title": "Quiz 2",
          "description": "Description for Quiz 2",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batchCode": "3"
        }
      }
    ])
    expect(state.studentQuizList).toEqual([
      {
        "id": "sample-id",
        "quiz": {
          "id": "QZ0001",
          "title": "Quiz 2",
          "description": "Description for Quiz 2",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batchCode": "3"
        }
      },
      {
        "id": "sample-id",
        "quiz": {
          "id": "QZ0001",
          "title": "Quiz 2",
          "description": "Description for Quiz 2",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batchCode": "3"
        }
      }
    ])
  })

  test('SET_STUDENT_QUIZ_DETAIL', () => {
    store.mutations.SET_STUDENT_QUIZ_DETAIL(state, {
      "id": "sample-id",
      "quiz": {
        "id": "QZ0001",
        "title": "Quiz 2",
        "description": "Description for Quiz 2",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batchCode": "3"
      }
    })
    expect(state.studentQuizDetail).toEqual({
      "id": "sample-id",
      "quiz": {
        "id": "QZ0001",
        "title": "Quiz 2",
        "description": "Description for Quiz 2",
        "startDate": 15000000,
        "endDate": 15000000,
        "timeLimit": 3600,
        "trials": 3,
        "questionCount": 10,
        "questionBanks": [
          "QNK00001"
        ],
        "batchCode": "3"
      }
    })
  })

  test('SET_STUDENT_QUIZ_QUESTIONS', () => {
    store.mutations.SET_STUDENT_QUIZ_QUESTIONS(state, {
      "questions": [
        {
          "number" : 1,
          "text" : "Question Example 1",
          "options" : [
            {
              "optionId" : "OptionId1",
              "label" : "Answer Example 1"
            },
            {
              "optionId" : "OptionId2",
              "label" : "Answer Example 2"
            },
            {
              "optionId" : "OptionId3",
              "label" : "Answer Example 3"
            },
            {
              "optionId" : "OptionId4",
              "label" : "Answer Example 4"
            }
          ]
        },
        {
          "number" : 2,
          "text" : "Question Example 2",
          "options" : [
            {
              "optionId" : "OptionId1",
              "label" : "Answer Example 5"
            },
            {
              "optionId" : "OptionId2",
              "label" : "Answer Example 6"
            },
            {
              "optionId" : "OptionId3",
              "label" : "Answer Example 7"
            },
            {
              "optionId" : "OptionId4",
              "label" : "Answer Example 8"
            }
          ]
        },
      ]
    })
    expect(state.studentQuizQuestions).toEqual({
      "questions": [
        {
          "number" : 1,
          "text" : "Question Example 1",
          "options" : [
            {
              "optionId" : "OptionId1",
              "label" : "Answer Example 1"
            },
            {
              "optionId" : "OptionId2",
              "label" : "Answer Example 2"
            },
            {
              "optionId" : "OptionId3",
              "label" : "Answer Example 3"
            },
            {
              "optionId" : "OptionId4",
              "label" : "Answer Example 4"
            }
          ]
        },
        {
          "number" : 2,
          "text" : "Question Example 2",
          "options" : [
            {
              "optionId" : "OptionId1",
              "label" : "Answer Example 5"
            },
            {
              "optionId" : "OptionId2",
              "label" : "Answer Example 6"
            },
            {
              "optionId" : "OptionId3",
              "label" : "Answer Example 7"
            },
            {
              "optionId" : "OptionId4",
              "label" : "Answer Example 8"
            }
          ]
        },
      ]
    })
  })
})
