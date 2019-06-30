import store from '@/store/modules/courses'
import api from '@/api/controller/courses'
import resourceApi from '@/api/controller/resources'

jest.mock('@/api/controller/courses')

describe('courses store module', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  describe('courses actions', () => {
    test('fetchCourses', () => {
      const expectedData = {
        'code': 200,
        'status': 'OK',
        'data': [
          {
            'id': 'sample-id-1',
            'title': 'Course Title 1',
            'description': 'Course Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          },
          {
            'id': 'sample-id-2',
            'title': 'Course Title 2',
            'description': 'Course Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          },
          {
            'id': 'sample-id-3',
            'title': 'Course Title 3',
            'description': 'Course Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          },
          {
            'id': 'sample-id-4',
            'title': 'Course Title 4',
            'description': 'Course Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          }
        ],
        'paging': {
          'page': 1,
          'size': 10,
          'totalRecords': 40
        }
      }
      api.getCourseList = (success) => {
        success(expectedData)
      }

      const data = {
        code: 'sample-code',
        id: 'sample-id-1'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.fetchCourses({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_COURSES', expectedData.data)
    })

    test('fetchMasterCourses', () => {
      const expectedData = {
        'code': 200,
        'status': 'OK',
        'data': [
          {
            'id': 'sample-id-1',
            'title': 'Course Title 1',
            'description': 'Course Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          },
          {
            'id': 'sample-id-2',
            'title': 'Course Title 2',
            'description': 'Course Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          },
          {
            'id': 'sample-id-3',
            'title': 'Course Title 3',
            'description': 'Course Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          },
          {
            'id': 'sample-id-4',
            'title': 'Course Title 4',
            'description': 'Course Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          }
        ],
        'paging': {
          'page': 1,
          'size': 10,
          'totalRecords': 40
        }
      }
      api.getMasterCourseList = (success) => {
        success(expectedData)
      }

      const data = {
        code: 'sample-code',
        id: 'sample-id-1'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.fetchMasterCourses({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_MASTER_COURSES', expectedData.data)
    })

    test('fetchCourseById', () => {
      const expectedData = {
        'code': 200,
        'status': 'OK',
        'data': {
          'id': 'sample-id',
          'title': 'Course Title',
          'description': '**Course** Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      }
      api.getCourseDetail = (success) => {
        success(expectedData)
      }

      const data = {
        code: 'sample-code',
        id: 'sample-id-1'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.fetchCourseById({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_COURSE_BY_ID', expectedData.data)
    })

    test('fetchMasterCourseById', () => {
      const expectedData = {
        'code': 200,
        'status': 'OK',
        'data': {
          'id': 'sample-id',
          'title': 'Course Title',
          'description': '**Course** Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      }
      api.getMasterCourseDetail = (success) => {
        success(expectedData)
      }

      const data = {
        id: 'sample-id-1'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.fetchMasterCourseById({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_MASTER_COURSE_BY_ID', expectedData.data)
    })

    test('createCourse', () => {
      api.createCourse = (success) => {
        success({
          'code': 200,
          'status': 'OK',
          'data': {
            'id': 'sample-id',
            'title': 'Course Title',
            'description': '**Course** Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          }
        })
      }
      const data = {
        'id': 'sample-id',
        'title': 'Course Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.createCourse({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('createMasterCourse', () => {
      api.createMasterCourse = (success) => {
        success({
          'code': 200,
          'status': 'OK',
          'data': {
            'id': 'sample-id',
            'title': 'Course Title',
            'description': '**Course** Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          }
        })
      }
      const data = {
        'id': 'sample-id',
        'title': 'Course Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.createMasterCourse({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('updateCourse', () => {
      api.updateCourse = (success) => {
        success({
          'code': 200,
          'status': 'OK',
          'data': {
            'id': 'sample-id',
            'title': 'Course Title',
            'description': '**Course** Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          }
        })
      }
      const data = {
        'id': 'sample-id',
        'title': 'Course Title Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.updateCourse({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('updateMasterCourse', () => {
      api.updateMasterCourse = (success) => {
        success({
          'code': 200,
          'status': 'OK',
          'data': {
            'id': 'sample-id',
            'title': 'Course Title',
            'description': '**Course** Description Goes Here',
            'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
          }
        })
      }
      const data = {
        'id': 'sample-id',
        'title': 'Course Title Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.updateMasterCourse({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('deleteCourseById', () => {
      api.deleteCourse = (success) => {
        success({
          'code': 200,
          'status': 'OK'
        })
      }
      const data = {
        id: 'sample-id',
        code: 'code'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.deleteCourseById({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('deleteMasterCourseById', () => {
      api.deleteMasterCourse = (success) => {
        success({
          'code': 200,
          'status': 'OK'
        })
      }
      const data = {
        id: 'sample-id',
        code: 'code'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.deleteMasterCourseById({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('copyCourse', () => {
      api.copyCourse = (success) => {
        success({
          'code': 201,
          'status': 'CREATED',
          'data': [
            {
              'id': 'sample-id',
              'title': 'Course Title',
              'description': 'Course Description Goes Here',
              'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
            },
            {
              'id': 'sample-id',
              'title': 'Course Title',
              'description': 'Course Description Goes Here',
              'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
            }
          ]
        })
      }
      const data = {
        'originBatch': '3',
        'courses': [
          'sample-id',
          'sample-id'
        ]
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.copyCourse({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('uploadMaterial', () => {
      const response = {
        'code': 201,
        'status': 'CREATED',
        'data': {
          'id': 'sample-id',
          'name': 'File Name',
          'file': {
            'full': 'https://i.pinimg.com/originals/8c/cf/ec/8ccfec7d5cb3c92265cbf153523eb9b5.jpg',
            'thumbnail': null
          }
        }
      }
      resourceApi.uploadResource = (success) => {
        success(response)
      }

      const data = new FormData()
      let configuration = { headers: { 'Content-Type': 'multipart/form-data' } }

      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.uploadMaterial({ commit }, { data, configuration, callback, fail })
      expect(fail).toHaveBeenCalledTimes(0)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('resetCourse', () => {
      const commit = jest.fn()
      store.actions.resetCourse({ commit })
      expect(commit).toHaveBeenCalledWith('SET_COURSE_BY_ID', {})
    })
  })

  describe('courses setter getters', () => {
    const state = {
      courseList: [],
      masterCourseList: []
    }

    test('SET_COURSES & courseList', () => {
      store.mutations.SET_COURSES(state, [
        {
          'id': 'sample-id-1',
          'title': 'Course Title 1',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-2',
          'title': 'Course Title 2',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-3',
          'title': 'Course Title 3',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-4',
          'title': 'Course Title 4',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      ])
      expect(store.getters.courseList(state)).toEqual(state.courseList)
    })

    test('SET_MASTER_COURSES & masterCourseList', () => {
      store.mutations.SET_MASTER_COURSES(state, [
        {
          'id': 'sample-id-1',
          'title': 'Course Title 1',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-2',
          'title': 'Course Title 2',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-3',
          'title': 'Course Title 3',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-4',
          'title': 'Course Title 4',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      ])
      expect(store.getters.masterCourseList(state)).toEqual(state.masterCourseList)
    })

    test('SET_COURSE_BY_ID & course', () => {
      store.mutations.SET_COURSE_BY_ID(state, {
        'code': 200,
        'status': 'OK',
        'data': {
          'id': 'sample-id',
          'title': 'Course Title',
          'description': '**Course** Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      })
      expect(store.getters.course(state)).toEqual(state.course)
    })

    test('SET_MASTER_COURSE_BY_ID & course', () => {
      store.mutations.SET_MASTER_COURSE_BY_ID(state, {
        'code': 200,
        'status': 'OK',
        'data': {
          'id': 'sample-id',
          'title': 'Course Title',
          'description': '**Course** Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      })
      expect(store.getters.masterCourse(state)).toEqual(state.masterCourse)
    })
  })
})
