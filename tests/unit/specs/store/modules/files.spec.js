import store from '@/store/modules/files'
import api from '@/api/controller/files'

jest.mock('@/api/controller/files')

describe('files store module', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  describe('files actions', () => {
    test('fetchFiles', () => {
      const expectedData = {
        'code': 200,
        'status': 'OK',
        'data': {
          'paths': [
            {
              'id': 'root',
              'name': 'root'
            },
            {
              'id': 'parent-id',
              'name': 'Parent ID'
            }
          ],
          'content': [
            {
              'id': 'parent-id-1',
              'type': 'FOLDER',
              'name': 'Parent Id 1',
              'parentId': 'parent-id',
              'author': {
                'id': 'sample-id',
                'name': 'name'
              }
            },
            {
              'id': 'id-5',
              'type': 'FILE',
              'name': 'File Name This',
              'file': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
              'versions': {
                '2': {
                  'timestamp': 1555980050616,
                  'url': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png'
                },
                '1': {
                  'timestamp': 1555980050616,
                  'url': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png'
                }
              },
              'parentId': 'parent-id',
              'author': {
                'id': 'sample-id',
                'name': 'name'
              }
            }
          ]
        }
      }

      api.getFileList = (success) => {
        success(expectedData)
      }

      const data = {
        parentId: 'parent-id',
        page: 1,
        size: 10
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.fetchFiles({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_FILES', expectedData.data)
    })

    test('createFolder', () => {
      api.createFolder = (success) => {
        success({
          'code': 201,
          'status': 'CREATED',
          'data': {
            'id': 'id',
            'type': 'FOLDER',
            'name': 'Name 2',
            'parentId': 'parent-id'
          }
        })
      }
      const data = {
        'id': 'id',
        'type': 'FOLDER',
        'name': 'Name 2',
        'parentId': 'parent-id'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      const configuration = { headers: { 'Content-Type': 'multipart/form-data' } }
      store.actions.createFolder({ commit }, { data, configuration, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('uploadFile', () => {
      api.uploadFile = (success) => {
        success({
          'code': 201,
          'status': 'CREATED',
          'data': {
            'id': 'id',
            'type': 'FOLDER',
            'name': 'Name 2',
            'parentId': 'parent-id'
          }
        })
      }
      const data = {
        'id': 'id',
        'type': 'FOLDER',
        'name': 'Name 2',
        'parentId': 'parent-id'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      const configuration = { headers: { 'Content-Type': 'multipart/form-data' } }
      store.actions.uploadFile({ commit }, { data, configuration, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('deleteFile', () => {
      api.deleteFile = (success) => {
        success({
          'code': 200,
          'status': 'OK'
        })
      }
      const data = {
        parentId: 'sample-id',
        id: 'code'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.deleteFile({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('downloadFile', () => {
      api.downloadFile = (success) => {
        success({
          'code': 200,
          'status': 'OK'
        })
      }
      const data = {
        parentId: 'sample-id',
        id: 'code'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      const configuration = { headers: { 'Content-Type': 'multipart/form-data' } }
      store.actions.downloadFile({ commit }, { data, configuration, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('files setter getters', () => {
    const state = {
      files: []
    }

    test('SET_FILES & files', () => {
      store.mutations.SET_FILES(state, {
        'paths': [
          {
            'id': 'root',
            'name': 'root'
          },
          {
            'id': 'parent-id',
            'name': 'Parent ID'
          }
        ],
        'content': [
          {
            'id': 'parent-id-1',
            'type': 'FOLDER',
            'name': 'Parent Id 1',
            'parentId': 'parent-id',
            'author': {
              'id': 'sample-id',
              'name': 'name'
            }
          },
          {
            'id': 'id-5',
            'type': 'FILE',
            'name': 'File Name This',
            'file': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
            'versions': {
              '2': {
                'timestamp': 1555980050616,
                'url': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png'
              },
              '1': {
                'timestamp': 1555980050616,
                'url': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png'
              }
            },
            'parentId': 'parent-id',
            'author': {
              'id': 'sample-id',
              'name': 'name'
            }
          }
        ]
      })
      expect(store.getters.files(state)).toEqual(state.files)
    })
  })
})
