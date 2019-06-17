import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  name: 'announcementForm',
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
    this.initPage()
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
      'updateAnnouncement',
      'initialState'
    ]),
    initPage () {
      this.initialState()
      if (this.editMode) {
        this.getAnnouncementDetail()
      }
    },
    getAnnouncementDetail () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }
      this.fetchAnnouncementById({
        data,
        callback: this.successFetchAnnouncementById,
        fail: this.failFetchAnnouncementById
      })
    },
    successFetchAnnouncementById () {
      this.setAnnouncementDetail()
    },
    failFetchAnnouncementById () {
      this.$toasted.error('Fail to load announcement detail')
    },
    setAnnouncementDetail () {
      this.announcementDetail = {
        id: this.announcement.id || '',
        title: this.announcement.title || '',
        summary: this.announcement.summary || '',
        description: this.announcement.description || ''
      }
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then(callback)
    },
    sendAnnouncement () {
      let data = { ...this.announcementDetail }

      this.validateBeforeSubmit((result) => {
        if (result) {
          if (this.editMode) {
            this.sendUpdateAnnouncementData(data)
          } else {
            this.sendCreateAnnouncementData(data)
          }
        }
      })
    },
    sendCreateAnnouncementData (data) {
      this.createAnnouncement({
        data,
        callback: this.successSendCreateAnnouncementData,
        fail: this.failSendCreateAnnouncementData
      })
    },
    successSendCreateAnnouncementData () {
      this.initialState()
      this.$router.push({ name: 'announcements' })
      this.$toasted.success('Successfully created new announcement')
    },
    failSendCreateAnnouncementData () {
      this.$toasted.error('Fail to create new announcement')
    },
    sendUpdateAnnouncementData (data) {
      this.updateAnnouncement({
        data,
        callback: this.successSendUpdateAnnouncementData,
        fail: this.failSendUpdateAnnouncementData
      })
    },
    successSendUpdateAnnouncementData () {
      this.$router.push({
        name: 'announcementDetail',
        params: { id: this.announcementDetail.id }
      })
      this.$toasted.success('Successfully update announcement')
      this.initialState()
    },
    failSendUpdateAnnouncementData () {
      this.$toasted.error('Fail to update announcement')
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
