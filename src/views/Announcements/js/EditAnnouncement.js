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
  props: [
    'editMode'
  ],
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
      'createAnnouncement',
      'updateAnnouncement'
    ]),
    initPage () {
      if (this.editMode) {
        this.getAnnouncementDetail()
        this.setAnnouncementDetail()
      }
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

      if (this.editMode) {
        this.updateAnnouncement({ data })
      } else {
        this.createAnnouncement({ data })
        this.$router.push({ name: 'announcements' })
      }
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
