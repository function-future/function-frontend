import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'feeds',
  data () {
    return {
      stickyNote: {
        title: '',
        description: '',
        updatedAt: ''
      },
      announcements: [],
      paging: {
        page: 1,
        size: 5
      },
      isLoadingAnnouncement: true
    }
  },
  created () {},
  computed: {
    ...mapGetters([
      'stickyNotes',
      'announcementList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchStickyNotes',
      'fetchAnnouncements'
    ])
  }
}
