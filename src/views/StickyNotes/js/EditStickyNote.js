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
      'postStickyNotes'
    ]),
    initPage () {
      this.fetchStickyNotes()
      this.setStickyNote()
    },
    setStickyNote () {
      this.stickyNote = { ...this.stickyNotes }
    },
    postStickyNote () {
      this.setStickyNote()
      let data = { ...this.stickyNote }
      this.postStickyNotes({ data })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
