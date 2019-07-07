import store from '@/store/modules/batches'
import api from '@/api/controller/batches'

jest.mock('@/api/controller/batches')

describe('batches store module', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  describe('batches actions', () => {
    test('fetchBatches', () => {
      api.getBatchList = (success) => {
        success({
          'code': 200,
          'status': 'OK',
          'data': [
            {
              'id': 'sample-id-1',
              'code': '1',
              'name': 'Batch 1'
            },
            {
              'id': 'sample-id-2',
              'code': '2',
              'name': 'Batch 2'
            },
            {
              'id': 'sample-id-3',
              'code': '3',
              'name': 'Batch 3'
            },
            {
              'id': 'sample-id-4',
              'code': '4',
              'name': 'Batch 3'
            }
          ],
          'paging': {
            'page': 1,
            'size': 4,
            'totalRecords': 4
          }
        })
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.fetchBatches({ commit }, { callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_BATCHES', [
        {
          'id': 'sample-id-1',
          'code': '1',
          'name': 'Batch 1'
        },
        {
          'id': 'sample-id-2',
          'code': '2',
          'name': 'Batch 2'
        },
        {
          'id': 'sample-id-3',
          'code': '3',
          'name': 'Batch 3'
        },
        {
          'id': 'sample-id-4',
          'code': '4',
          'name': 'Batch 3'
        }
      ])
    })

    test('fetchBatchById', () => {
      api.getBatchDetail = (success) => {
        success({
          'code': 200,
          'status': 'OK',
          'data': {
            'id': 'sample-id-1',
            'code': 'Batch Code 1',
            'name': 'Batch Name'
          }
        })
      }
      const data = {
        id: 'sample-id-1'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.fetchBatchById({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledWith({
        'id': 'sample-id-1',
        'code': 'Batch Code 1',
        'name': 'Batch Name'
      })
    })

    test('createBatch', () => {
      api.createBatch = (success) => {
        success({
          'code': 200,
          'status': 'OK',
          'data': {
            'id': 'sample-id-1',
            'code': 'Batch Code 1',
            'name': 'Batch Name'
          }
        })
      }
      const data = {
        'id': 'sample-id-1',
        'code': 'Batch Code 1',
        'name': 'Batch Name'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.createBatch({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledWith({
        'id': 'sample-id-1',
        'code': 'Batch Code 1',
        'name': 'Batch Name'
      })
    })

    test('updateBatch', () => {
      api.updateBatch = (success) => {
        success({
          'code': 200,
          'status': 'OK',
          'data': {
            'id': 'sample-id-1',
            'code': 'Batch Code 1',
            'name': 'Batch Name'
          }
        })
      }
      const data = {
        id: 'sample-id-1',
        content: {
          'id': 'sample-id-1',
          'code': 'Batch Code 1',
          'name': 'Batch Name'
        }
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.updateBatch({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('deleteBatch', () => {
      api.deleteBatch = (success) => {
        success({
          'code': 200,
          'status': 'OK'
        })
      }
      const data = {
        id: 'sample-id-1'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.deleteBatch({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('batches setter getters', () => {
    const state = {
      batchList: []
    }

    test('SET_BATCHES & batchList', () => {
      store.mutations.SET_BATCHES(state, [
        {
          'id': 'sample-id-1',
          'code': '1',
          'name': 'Batch 1'
        },
        {
          'id': 'sample-id-2',
          'code': '2',
          'name': 'Batch 2'
        },
        {
          'id': 'sample-id-3',
          'code': '3',
          'name': 'Batch 3'
        },
        {
          'id': 'sample-id-4',
          'code': '4',
          'name': 'Batch 3'
        }
      ])

      expect(store.getters.batchList(state)).toEqual(state.batchList)
    })
  })
})
