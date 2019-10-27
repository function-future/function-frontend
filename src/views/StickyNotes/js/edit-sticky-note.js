import { mapActions, mapGetters } from 'vuex'
import Editor from '@/components/editor/Editor'

export default {
  components: {
    Editor
  },
  data () {
    return {
      stickyNote: {
        title: '',
        description: ''
      },
      isSubmitting: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'stickyNotes'
    ])
  },
  methods: {
    ...mapActions([
      'fetchStickyNotes',
      'postStickyNotes',
      'initialState'
    ]),
    initPage () {
      this.getStickyNoteDetail()
    },
    getStickyNoteDetail () {
      this.fetchStickyNotes({
        callback: this.setStickyNote,
        fail: this.failFetchingStickyNotes
      })
    },
    failFetchingStickyNotes () {
      this.$toasted.error('Fail to load sticky note detail, , please refresh the page')
    },
    setStickyNote () {
      this.stickyNote = { ...this.stickyNotes[0] }
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then(callback)
    },
    postStickyNote () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess (result) {
      if (result) {
        this.isSubmitting = true
        let data = { ...this.stickyNote }
        this.postStickyNotes({
          data,
          callback: this.successPostStickyNotes,
          fail: this.failPostStickyNotes
        })
      }
    },
    successPostStickyNotes () {
      this.initialState()
      this.$router.push({ name: 'stickyNotes' })
      this.$toasted.success('Successfully created new sticky note')
      this.isSubmitting = false
    },
    failPostStickyNotes () {
      this.$toasted.error('Fail to create new sticky note')
      this.isSubmitting = false
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
