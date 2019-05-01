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
      stickyNotes: {
        noteTitle: '',
        noteDescription: '',
        updatedAt: ''
      }
    }
  },
  created () {
    this.$http.get(config.api.core.stickyNotes.get)
      .then(res => (this.stickyNotes = res.data.data))
      .catch(err => console.log(err))
  },
  methods: {
    postStickyNote () {
      let payload = {
        noteTitle: this.stickyNotes.noteTitle,
        noteDescription: this.stickyNotes.noteDescription
      }

      this.$http.post(config.api.core.stickyNotes.post, payload)
        .then(res => { this.$router.push({ name: 'stickyNotes' }) })
        .catch(err => console.log(err)) // TODO: add error modal
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
