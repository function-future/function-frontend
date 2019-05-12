import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import config from '@/config/index'

export default {
  name: 'stickyNotes',
  components: {
    BaseCard
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
      'fetchStickyNotes'
    ]),
    initPage(){
      this.fetchStickyNotes()
    },
    goToAddStickyNote () {
      this.$router.push({ name: 'editStickyNote' })
    }
  }
}
