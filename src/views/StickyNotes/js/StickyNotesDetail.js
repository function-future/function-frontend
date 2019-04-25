import BaseCard from '@/components/BaseCard'
import config from '@/config/index'

export default {
  name: 'stickyNotes',
  components: {
    BaseCard
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
    goToAddStickyNote () {
      this.$router.push({ name: 'editStickyNote' })
    }
  }
}
