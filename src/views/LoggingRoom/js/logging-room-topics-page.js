import InfiniteLoading from 'vue-infinite-loading'
import loggingRoomApi from '@/api/controller/logging-room'
import TopicCard from '@/views/LoggingRoom/TopicCard'
import ModalAddQuestion from '@/views/Questionnaire/ModalAddQuestion'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import { mapGetters } from 'vuex'


export default {
  name: 'logging-room-topics-page',
  components: {
    InfiniteLoading,
    loggingRoomApi,
    ModalAddQuestion,
    ModalDeleteConfirmation,
    TopicCard
  },
  data () {
    return {
      topics: [],
      page: 1,
      size: 10,
      topicModal: false,
      topic: {
        id: '',
        title: '',
        isUpdate: false,
        type: 'Topic'
      },
      modalDeleteConfirmation: {
        show: false,
        title: '',
        id: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'accessList'
    ])
  },
  props: {
    iconMenu: {
      type: String,
      default: 'plus'
    },
    iconTitle: {
      type: String,
      default: 'Title'
    }
  },
  methods: {
    infiniteHandler ($state) {
      loggingRoomApi.getLoggingRoomTopic(response => {
        if (this.page === 1) {
          this.topics = []
        }
        if (response.data.length) {
          this.page += 1
          this.topics.push(...response.data)
          $state.loaded()
        } else {
          $state.complete()
        }
      }, this.errorCallBack, {
        params: {
          page: this.page,
          size: this.size,
          loggingRoomId: this.$route.params.loggingRoomId
        }
      })
    },
    goToLoggingRoom (topicId) {
      this.$router.push({
        name: 'logMessage',
        params: {
          loggingRoomId: this.$route.params.loggingRoomId,
          topicId: topicId
        }
      })
    },
    closeTopicModal () {
      this.topic.id = ''
      this.topic.title = ''
      this.topic.isUpdate = false
      this.topicModal = false
    },
    createTopic (value) {
      loggingRoomApi.createTopic(response => {
        this.$toasted.success('success create question')
        this.page = 1
        this.topics = []
        this.$refs.infiniteLoading.stateChanger.reset()
      }, this.errorCallBack, {
        body: {
          title: value.description
        },
        params: {
          loggingRoomId: this.$route.params.loggingRoomId
        }
      })
    },
    openDeleteModal (topic) {
      this.modalDeleteConfirmation.show = true
      this.modalDeleteConfirmation.id = topic.id
      this.modalDeleteConfirmation.title = topic.title
    },
    resetDeleteModal () {
      this.modalDeleteConfirmation.show = false
      this.modalDeleteConfirmation.id = ''
      this.modalDeleteConfirmation.title = ''
    },
    deleteTopic () {
      loggingRoomApi.deleteTopic(response => {
        this.$toasted.success('success delete topic')
        this.resetDeleteModal()
        this.page = 1
        this.topics = []
        this.$refs.infiniteLoading.stateChanger.reset()
      }, this.errorCallBack, {
        params: {
          loggingRoomId: this.modalDeleteConfirmation.id,
          topicId: this.modalDeleteConfirmation.id
        }
      })
    }
  }
}
