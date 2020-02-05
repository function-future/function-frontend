import { mapActions } from 'vuex'

export default {
  name: 'batchForm',
  data () {
    return {
      batch: {
        code: '',
        name: ''
      },
      isSubmitting: false
    }
  },
  props: [
    'editMode'
  ],
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchBatchById',
      'createBatch',
      'updateBatch',
      'toast',
      'showBottomNavBar',
      'hideBottomNavBar'
    ]),
    initPage () {
      if (this.editMode) {
        this.fetchBatch()
      }
    },
    fetchBatch () {
      let data = {
        id: this.$route.params.id
      }
      this.fetchBatchById({
        data,
        callback: this.successFetchBatchById,
        fail: this.failFetchBatchById
      })
    },
    successFetchBatchById (res) {
      this.batch = res
    },
    failFetchBatchById () {
      this.toast({
        data: {
          message: 'Fail to load batch detail, please refresh the page',
          type: 'is-danger'
        }
      })
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    save () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
      this.isSubmitting = true
      const data = {
        id: this.$route.params.id,
        content: { ...this.batch }
      }
      if (this.editMode) {
        this.updateBatch({
          data,
          callback: this.successCreateOrEditBatch,
          fail: this.failCreateOrEditBatch
        })
      } else {
        this.createBatch({
          data,
          callback: this.successCreateOrEditBatch,
          fail: this.failCreateOrEditBatch
        })
      }
    },
    successCreateOrEditBatch () {
      this.$router.push({ name: 'batches' })
      let msg = ''
      this.editMode ? msg = 'edit' : msg = 'created new'
      this.toast({
        data: {
          message: 'Successfully ' + msg + ' batch',
          type: 'is-success'
        }
      })
    },
    failCreateOrEditBatch () {
      this.isSubmitting = false
      let msg = ''
      this.editMode ? msg = 'edit' : msg = 'create new'
      this.toast({
        data: {
          message: 'Fail to ' + msg + ' batch',
          type: 'is-danger'
        }
      })
    },
    cancel () {
      this.$router.push({ name: 'batches' })
    }
  }
}
