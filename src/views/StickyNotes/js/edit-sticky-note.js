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
      stickyNote: {
        title: '',
        description: ''
      }
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
      this.setStickyNote()
    },
    getStickyNoteDetail () {
      this.fetchStickyNotes({
        callback: () => {},
        fail: this.failFetchingStickyNotes
      })
    },
    failFetchingStickyNotes () {
      this.$toasted.error('Fail to load sticky note detail, , please refresh the page')
    },
    setStickyNote () {
      this.stickyNote = { ...this.stickyNotes }
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    postStickyNote () {
      this.setStickyNote()
      let data = { ...this.stickyNote }

      this.validateBeforeSubmit(this.validationSuccess(data))
    },
    validationSuccess (data) {
      this.postStickyNotes({
        data,
        callback: this.successPostStickyNotes,
        fail: this.failPostStickyNotes
      })
    },
    successPostStickyNotes () {
      this.initialState()
      this.$router.push({ name: 'stickyNotes' })
      this.$toasted.success('Successfully created new sticky note')
    },
    failPostStickyNotes () {
      this.$toasted.error('Fail to create new sticky note')
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
