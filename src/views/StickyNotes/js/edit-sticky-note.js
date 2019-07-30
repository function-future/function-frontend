import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import config from '@/config/index'

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea
  },
  data () {
    return {
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: false,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: false,
        help: true,
        undo: false,
        redo: false,
        trash: false,
        save: false,
        navigation: true,
        alignleft: true,
        subfield: true,
        preview: true
      },
      stickyNote: {
        title: '',
        description: ''
      },
      isSubmitting: true
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
      this.isSubmitting = true
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess (result) {
      if (result) {
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
