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
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: false,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: false,
        help: true,
        undo: false,
        redo: false,
        trash: false,
        save: false,
        navigation: true,
        alignleft: true,
        subfield: true,
        preview: true
      },
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
        callback: () => {
          this.setAnnouncementDetail()
        },
        fail: () => {
          this.$toasted.error('Fail to load announcement detail')
        }
      })
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
        callback: () => {
          this.initialState()
          this.$router.push({ name: 'announcements' })
          this.$toasted.success('Successfully created new announcement')
        },
        fail: () => {
          this.$toasted.error('Fail to create new announcement')
        }
      })
    },
    sendUpdateAnnouncementData (data) {
      this.updateAnnouncement({
        data,
        callback: () => {
          this.$router.push({
            name: 'announcementDetail',
            params: { id: this.announcementDetail.id }
          })
          this.$toasted.success('Successfully update announcement')
          this.initialState()
        },
        fail: () => {
          this.$toasted.error('Fail to update announcement')
        }
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
