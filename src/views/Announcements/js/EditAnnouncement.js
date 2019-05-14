import { mapActions, mapGetters } from 'vuex'
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
      announcementDetail: {}
    }
  },
  created () {
    this.getAnnouncementDetail()
  },
  computed: {
    ...mapGetters([
      'announcement'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAnnouncementById',
      'createAnnouncement'
    ]),
    initPage () {
      this.getAnnouncementDetail()
      this.setAnnouncementDetail()
    },
    getAnnouncementDetail () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }
      this.fetchAnnouncementById({ data })
    },
    setAnnouncementDetail () {
      this.announcementDetail = { ...this.announcement }
    },
    sendAnnouncement () {
      this.setAnnouncementDetail()
      let data = { ...this.announcementDetail }
      this.createAnnouncement({ data })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
