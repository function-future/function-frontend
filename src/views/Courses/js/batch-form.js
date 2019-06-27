import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  name: 'masterCourseForm',
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea
  },
  data () {
    return {
      batch: {
        code: '',
        name: ''
      }
    }
  },
  props: [
    'editMode'
  ],
  created () {
    this.initPage()
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'fetchBatchById',
      'createBatch',
      'updateBatch'
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
      this.$toasted.error('Fail to load batch detail, please refresh the page')
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    sendBatch () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
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
      this.$router.push({ name: 'courseBatches' })
      let msg = ''
      this.editMode ? msg = 'edit' : msg = 'created new'
      this.$toasted.success('Successfully ' + msg + ' batch')
    },
    failCreateOrEditBatch () {
      let msg = ''
      this.editMode ? msg = 'edit' : msg = 'create new'
      this.$toasted.error('Fail to ' + msg + ' batch')
    },
    cancel () {
      this.$router.push({ name: 'courseBatches' })
    }
  }
}
