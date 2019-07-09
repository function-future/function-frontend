import store from '@/store/modules/question-banks'
import api from '@/api/controller/question-banks'

jest.mock('@/api/controller/question-banks')

describe('actions', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('fetchQuestionBankList', () => {
    api.getQuestionBankList = (success) => {
      success({
        "code" : 200,
        "status" : "OK",
        "data" : [
          {
            "id" : "QNK0001",
            "title" : "Question Bank 1",
            "description" : "Question Bank Number 1"
          },
          {
            "id" : "QNK0002",
            "title" : "Question Bank 2",
            "description" : "Question Bank Number 2"
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
      page: 1,
      pageSize: 10
    }
    const commit = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.fetchQuestionBankList({ commit }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('GET_QUESTION_BANK_LIST', [
      {
        "id" : "QNK0001",
        "title" : "Question Bank 1",
        "description" : "Question Bank Number 1"
      },
      {
        "id" : "QNK0002",
        "title" : "Question Bank 2",
        "description" : "Question Bank Number 2"
      }
    ])
  })

  test('createQuestionBank', () => {
    api.createQuestionBank = (success) => {
      success({
        "code": 201,
        "status": "CREATED",
        "data": {
          "id": "QNK0001",
          "title": "Question Bank #2",
          "description": "Question Bank Number 2"
        }
      })
    }
    const payload = {
      "id": "QNK0001",
      "title": "Question Bank #2",
      "description": "Question Bank Number 2"
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.createQuestionBank({ commit }, { payload, callback, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenLastCalledWith('SET_QUESTION_BANK', payload)
  })

  test('fetchQuestionBankDetail', () => {
    api.getQuestionBankById = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "QNK0001",
          "title": "Question Bank #2",
          "description": "Question Bank Number 2"
        }
      })
    }
    const data = {
      bankId: 'QNK0001'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.fetchQuestionBankDetail({ commit }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_QUESTION_BANK', {
      "id": "QNK0001",
      "title": "Question Bank #2",
      "description": "Question Bank Number 2"
    })
  })

  test('updateQuestionBank', () => {
    api.updateQuestionBank = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "QNK0001",
          "title": "Question Bank #2",
          "description": "Question Bank Number 2"
        }
      })
    }
    const payload = {
      "id": "QNK0001",
      "title": "Question Bank #2",
      "description": "Question Bank Number 2"
    }
    const data = {
      bankId: 'QNK0001'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.updateQuestionBank({ commit }, { payload, callback, data, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenLastCalledWith('SET_QUESTION_BANK', payload)
  })

  test('fetchQuestionBankQuestionList', () => {
    api.getQuestionList = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": [
          {
            "id": "QST0001",
            "text": "Question Sample 1",
            "options": [
              {
                "id": "OPT0001",
                "label": "Answer Sample 1-1"
              },
              {
                "id": "OPT0002",
                "label": "Answer Sample 1-2"
              },
              {
                "id": "OPT0003",
                "label": "Answer Sample 1-3"
              },
              {
                "id": "OPT0004",
                "label": "Answer Sample 1-4",
                "correct": true
              }
            ]
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
      bankId: 'QNK0001'
    }
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchQuestionBankQuestionList({ commit }, { data, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenLastCalledWith('SET_QUESTION_LIST', [
      {
        "id": "QST0001",
        "text": "Question Sample 1",
        "options": [
          {
            "id": "OPT0001",
            "label": "Answer Sample 1-1"
          },
          {
            "id": "OPT0002",
            "label": "Answer Sample 1-2"
          },
          {
            "id": "OPT0003",
            "label": "Answer Sample 1-3"
          },
          {
            "id": "OPT0004",
            "label": "Answer Sample 1-4",
            "correct": true
          }
        ]
      }
    ])
  })

  test('createQuestion', () => {
    api.createQuestion = (success) => {
      success({
        "code": 201,
        "status": "CREATED",
        "data": {
          "id": "QST0001",
          "text": "Question Sample 1",
          "options": [
            {
              "id": "OPT0001",
              "label": "Answer Sample 1-1"
            },
            {
              "id": "OPT0002",
              "label": "Answer Sample 1-2"
            },
            {
              "id": "OPT0003",
              "label": "Answer Sample 1-3",
              "correct": true
            },
            {
              "id": "OPT0004",
              "label": "Answer Sample 1-4"
            }
          ]
        }
      })
    }
    const payload = {
      "id": "QST0001",
      "text": "Question Sample 1",
      "options": [
        {
          "id": "OPT0001",
          "label": "Answer Sample 1-1"
        },
        {
          "id": "OPT0002",
          "label": "Answer Sample 1-2"
        },
        {
          "id": "OPT0003",
          "label": "Answer Sample 1-3",
          "correct": true
        },
        {
          "id": "OPT0004",
          "label": "Answer Sample 1-4"
        }
      ]
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.createQuestion({ commit }, { payload, callback, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenLastCalledWith('SET_QUESTION', payload)
  })

  test('fetchQuestionDetail', () => {
    api.getQuestionById = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "QST0001",
          "text": "Question Example 1",
          "options": [
            {
              "id": "OPT0001",
              "label": "Answer Example 1-1"
            },
            {
              "id": "OPT0002",
              "label": "Answer Example 1-2"
            },
            {
              "id": "OPT0003",
              "label": "Answer Example 1-3",
              "correct": true
            },
            {
              "id": "OPT0004",
              "label": "Answer Example 1-4"
            }
          ]
        }
      })
    }
    const data = {
      bankId: 'QNK0001',
      questionId: 'QST0001'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.fetchQuestionDetail({ commit }, { data, callback, fail })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_QUESTION', {
      "id": "QST0001",
      "text": "Question Example 1",
      "options": [
        {
          "id": "OPT0001",
          "label": "Answer Example 1-1"
        },
        {
          "id": "OPT0002",
          "label": "Answer Example 1-2"
        },
        {
          "id": "OPT0003",
          "label": "Answer Example 1-3",
          "correct": true
        },
        {
          "id": "OPT0004",
          "label": "Answer Example 1-4"
        }
      ]
    })
  })

  test('updateQuestion', () => {
    api.updateQuestion = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "QST0001",
          "questionText": "Question Example 1",
          "options": [
            {
              "id": "OPT0001",
              "optionText": "Answer Example 1-1",
              "correct": false
            },
            {
              "id": "OPT0002",
              "optionText": "Answer Example 1-2",
              "correct": false
            },
            {
              "id": "OPT0003",
              "optionText": "Answer Example 1-3",
              "correct": true
            },
            {
              "id": "OPT0004",
              "optionText": "Answer Example 1-4",
              "correct": false
            }
          ]
        }
      })
    }
    const payload = {
      "id": "QST0001",
      "questionText": "Question Example 1",
      "options": [
        {
          "id": "OPT0001",
          "optionText": "Answer Example 1-1",
          "correct": false
        },
        {
          "id": "OPT0002",
          "optionText": "Answer Example 1-2",
          "correct": false
        },
        {
          "id": "OPT0003",
          "optionText": "Answer Example 1-3",
          "correct": true
        },
        {
          "id": "OPT0004",
          "optionText": "Answer Example 1-4",
          "correct": false
        }
      ]
    }
    const data = {
      bankId: 'QNK0001',
      questionId: 'QST0001'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.updateQuestion({ commit }, { payload, callback, data, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenLastCalledWith('SET_QUESTION', payload)
  })
})

describe('getters', () => {
  const state = {
    questionBanks: [],
    questionBank: {},
    questionList: [],
    question: {}
  }

  test('questionBanks', () => {
    expect(store.getters.questionBanks(state)).toEqual(state.questionBanks)
  })

  test('questionBank', () => {
    expect(store.getters.questionBank(state)).toEqual(state.questionBank)
  })

  test('questionList', () => {
    expect(store.getters.questionList(state)).toEqual(state.questionList)
  })

  test('question', () => {
    expect(store.getters.question(state)).toEqual(state.question)
  })
})

describe('mutations', () => {
  const state = {
    questionBanks: [],
    questionBank: {},
    questionList: [],
    question: {}
  }
  test('GET_QUESTION_BANK_LIST', () => {
    store.mutations.GET_QUESTION_BANK_LIST(state, [
      {
        "id" : "QNK0001",
        "title" : "Question Bank 1",
        "description" : "Question Bank Number 1"
      },
      {
        "id" : "QNK0002",
        "title" : "Question Bank 2",
        "description" : "Question Bank Number 2"
      }
    ])
    expect(state.questionBanks).toEqual([
      {
        "id" : "QNK0001",
        "title" : "Question Bank 1",
        "description" : "Question Bank Number 1"
      },
      {
        "id" : "QNK0002",
        "title" : "Question Bank 2",
        "description" : "Question Bank Number 2"
      }
    ])
  })

  test('SET_QUESTION_BANK', () => {
    store.mutations.SET_QUESTION_BANK(state, {
      "id": "QNK0001",
      "title": "Question Bank #2",
      "description": "Question Bank Number 2"
    })
    expect(state.questionBank).toEqual({
      "id": "QNK0001",
      "title": "Question Bank #2",
      "description": "Question Bank Number 2"
    })
  })

  test('SET_QUESTION_LIST', () => {
    store.mutations.SET_QUESTION_LIST(state, [
      {
        "id": "QST0001",
        "text": "Question Sample 1",
        "options": [
          {
            "id": "OPT0001",
            "label": "Answer Sample 1-1"
          },
          {
            "id": "OPT0002",
            "label": "Answer Sample 1-2"
          },
          {
            "id": "OPT0003",
            "label": "Answer Sample 1-3"
          },
          {
            "id": "OPT0004",
            "label": "Answer Sample 1-4",
            "correct": true
          }
        ]
      }
    ])
    expect(state.questionList).toEqual([
      {
        "id": "QST0001",
        "text": "Question Sample 1",
        "options": [
          {
            "id": "OPT0001",
            "label": "Answer Sample 1-1"
          },
          {
            "id": "OPT0002",
            "label": "Answer Sample 1-2"
          },
          {
            "id": "OPT0003",
            "label": "Answer Sample 1-3"
          },
          {
            "id": "OPT0004",
            "label": "Answer Sample 1-4",
            "correct": true
          }
        ]
      }
    ])
  })

  test('SET_QUESTION', () => {
    store.mutations.SET_QUESTION(state, {
      "id": "QST0001",
      "text": "Question Example 1",
      "options": [
        {
          "id": "OPT0001",
          "label": "Answer Example 1-1"
        },
        {
          "id": "OPT0002",
          "label": "Answer Example 1-2"
        },
        {
          "id": "OPT0003",
          "label": "Answer Example 1-3",
          "correct": true
        },
        {
          "id": "OPT0004",
          "label": "Answer Example 1-4"
        }
      ]
    })
    expect(state.question).toEqual({
      "id": "QST0001",
      "text": "Question Example 1",
      "options": [
        {
          "id": "OPT0001",
          "label": "Answer Example 1-1"
        },
        {
          "id": "OPT0002",
          "label": "Answer Example 1-2"
        },
        {
          "id": "OPT0003",
          "label": "Answer Example 1-3",
          "correct": true
        },
        {
          "id": "OPT0004",
          "label": "Answer Example 1-4"
        }
      ]
    })
  })
})
