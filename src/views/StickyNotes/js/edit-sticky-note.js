import { mapActions, mapGetters } from 'vuex'
const Editor = () => import('@/components/editor/Editor')

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
      'initialState',
      'toast',
      'showBottomNavBar',
      'hideBottomNavBar'
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
      this.toast({
        data: {
          message: 'Fail to load sticky note detail, , please refresh the page',
          type: 'is-danger'
        }
      })
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
      this.isSubmitting = false
      this.toast({
        data: {
          message: 'Successfully created new sticky note',
          type: 'is-success'
        }
      })
    },
    failPostStickyNotes () {
      this.toast({
        data: {
          message: 'Fail to create new sticky note',
          type: 'is-danger'
        }
      })
      this.isSubmitting = false
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
