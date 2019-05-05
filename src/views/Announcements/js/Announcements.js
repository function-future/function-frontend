// @ is an alias to /src
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'announcements',
  components: {
    BaseButton,
    BaseCard
  },
  data () {
    return {
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
  methods: {
    goToAnnouncementDetail (id) {
      this.$router.push({
        name: 'announcementDetail',
        params: { id: id }
      })
    },

    goToEditAnnouncement (id) {
      this.$router.push({
        name: 'editAnnouncement',
        params: { id: id }
      })
    },

    setAnnouncementsList (response) {
      if (response.code === 200) {
        this.announcements = response.data
      }
    }
  }
}
