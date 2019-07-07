import store from '@/store/modules/points'
import api from '@/api/controller/points'

jest.mock('@/api/controller/points')

describe('actions', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('fetchPointList', () => {
    api.getPoints = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "studentName": "Student 1",
          "batchCode": "3",
          "university": "University 1",
          "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "scores": [
            {
              "id": "QZ0001",
              "title": "Quiz 1",
              "type": "QUIZ",
              "point": 80
            },
            {
              "id": "QZ0002",
              "title": "Quiz 2",
              "type": "QUIZ",
              "point": 100
            },
            {
              "id": "QZ0003",
              "title": "Quiz 3",
              "type": "QUIZ",
              "point": 70
            },
            {
              "id": "ASG0001",
              "title": "Assignment 1",
              "type": "ASSIGNMENT",
              "point": 80
            },
            {
              "id": "ASG0002",
              "title": "Assignment 2",
              "type": "ASSIGNMENT",
              "point": 30
            },
            {
              "id": "ASG0003",
              "title": "Assignment 3",
              "type": "ASSIGNMENT",
              "point": 100
            }
          ]
        }
      })
    }
    const commit = jest.fn()
    const fail = jest.fn()
    const data = {
      studentId: 'sample-id'
    }
    store.actions.fetchPointList({ commit }, { data, fail })
    expect(fail).not.toHaveBeenCalled()
    expect(commit).toHaveBeenCalledWith('GET_POINTS', {
      "studentName": "Student 1",
      "batchCode": "3",
      "university": "University 1",
      "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      "scores": [
        {
          "id": "QZ0001",
          "title": "Quiz 1",
          "type": "QUIZ",
          "point": 80
        },
        {
          "id": "QZ0002",
          "title": "Quiz 2",
          "type": "QUIZ",
          "point": 100
        },
        {
          "id": "QZ0003",
          "title": "Quiz 3",
          "type": "QUIZ",
          "point": 70
        },
        {
          "id": "ASG0001",
          "title": "Assignment 1",
          "type": "ASSIGNMENT",
          "point": 80
        },
        {
          "id": "ASG0002",
          "title": "Assignment 2",
          "type": "ASSIGNMENT",
          "point": 30
        },
        {
          "id": "ASG0003",
          "title": "Assignment 3",
          "type": "ASSIGNMENT",
          "point": 100
        }
      ]
    })
  })
})

describe('getters', () => {
  const state = {
    points: {}
  }

  test('points', () => {
    expect(store.getters.points(state)).toEqual(state.points)
  })
})

describe('mutations', () => {
  const state = {
    points: {}
  }
  test('GET_POINTS', () => {
    store.mutations.GET_POINTS(state, {
      "studentName": "Student 1",
      "batchCode": "3",
      "university": "University 1",
      "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      "scores": [
        {
          "id": "QZ0001",
          "title": "Quiz 1",
          "type": "QUIZ",
          "point": 80
        },
        {
          "id": "QZ0002",
          "title": "Quiz 2",
          "type": "QUIZ",
          "point": 100
        },
        {
          "id": "QZ0003",
          "title": "Quiz 3",
          "type": "QUIZ",
          "point": 70
        },
        {
          "id": "ASG0001",
          "title": "Assignment 1",
          "type": "ASSIGNMENT",
          "point": 80
        },
        {
          "id": "ASG0002",
          "title": "Assignment 2",
          "type": "ASSIGNMENT",
          "point": 30
        },
        {
          "id": "ASG0003",
          "title": "Assignment 3",
          "type": "ASSIGNMENT",
          "point": 100
        }
      ]
    })
    expect(state.points).toEqual({
      'studentName': 'Student 1',
      'batchCode': '3',
      'university': 'University 1',
      'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      'scores': [
        {
          'id': 'QZ0001',
          'title': 'Quiz 1',
          'type': 'QUIZ',
          'point': 80
        },
        {
          'id': 'QZ0002',
          'title': 'Quiz 2',
          'type': 'QUIZ',
          'point': 100
        },
        {
          'id': 'QZ0003',
          'title': 'Quiz 3',
          'type': 'QUIZ',
          'point': 70
        },
        {
          'id': 'ASG0001',
          'title': 'Assignment 1',
          'type': 'ASSIGNMENT',
          'point': 80
        },
        {
          'id': 'ASG0002',
          'title': 'Assignment 2',
          'type': 'ASSIGNMENT',
          'point': 30
        },
        {
          'id': 'ASG0003',
          'title': 'Assignment 3',
          'type': 'ASSIGNMENT',
          'point': 100
        }
      ]
    })
  })
})
