import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import config from '@/config/index'

export default {
  name: 'editAnnouncement',
  components: {
    BaseInput,
    BaseButton,
    BaseTextArea
  },
  data () {
    return {
      announcement: {
        id: 'f532e5f8-1036-42cd-8f22-d10fd7fd6bb2',
        title: 'Announcement 1',
        summary: 'Summary goes here. Maximum 70 characters?',
        description: 'Description goes here. Currently there is no limit to description length.',
        fileUrl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
        createdAt: 1555980050616,
        updatedAt: 1555980050616
      }
    }
  },
  created () {
  },
  methods: {
    getAnnouncementDetail () {
      this.$http.get(config.api.core.announcements.get + '/')
        .then(res => this.setAnnouncementDetail(res.data))
        .catch(err => console.log(err))
    },

    setAnnouncementDetail (response) {
      if (response.code === 200) {
        this.announcement = response.data
      }
    },

    postAnnouncement () {
      let payload = {}
    },

    cancel () {
      this.$router.go(-1)
    }
  }
}
