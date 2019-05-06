import BaseCard from '@/components/BaseCard.vue'
import config from '@/config/index'

export default {
  name: 'feeds',
  components: {
    BaseCard
  },
  data () {
    return {
      stickyNotes: {
        noteTitle: '',
        noteDescription: '',
        updatedAt: ''
      },
      announcements: [
        {
          "id": "f532e5f8-1036-42cd-8f22-d10fd7fd6bb2",
          "title": "Announcement 1",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "createdAt": 1555980050616
        },
        {
          "id": "f532e5f8-1036-42cd-8f22-d10fd7fd6bb3",
          "title": "Announcement 2",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "createdAt": 1556080050616
        },
        {
          "id": "f532e5f8-1036-42cd-8f22-d10fd7fd6bb4",
          "title": "Announcement 3",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "createdAt": 1556180050616
        },
        {
          "id": "f532e5f8-1036-42cd-8f22-d10fd7fd6bb5",
          "title": "Announcement 4",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "createdAt": 1556380070616
        }
      ]
    }
  },
  created () {
    this.$http.get(config.api.core.stickyNotes.get)
      .then(res => this.setStickyNotes(res.data))
      .catch(err => console.log(err))
  },
  methods: {
    goToStickyNotesDetail () {
      this.$router.push({ name: 'stickyNotes' })
    },

    goToAnnouncementPage () {
      this.$router.push({ name: 'announcements' })
    },

    goToAnnouncementDetail (id) {
      this.$router.push({
        name: 'announcementDetail',
        params: { id: id }
      })
    },

    setStickyNotes (response) {
      if (response.code === 404) {
        this.stickyNotes.noteTitle = 'Sticky Notes'
        this.stickyNotes.noteDescription = 'Sticky notes will appear here'
      } else if (response.code === 200) {
        this.stickyNotes = response.data
      }
    },

    setAnnouncementsList (response) {
      if (response.code === 200) {
        this.announcements = response.data
      }
    }
  }
}
