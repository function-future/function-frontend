import ParticipantCard from '@/views/LoggingRoom/ParticipantCard'
import TopicCard from '@/views/LoggingRoom/TopicCard'
import InfiniteLoading from 'vue-infinite-loading'
import loggingRoomApi from '@/api/controller/logging-room'
import BaseButton from '@/components/BaseButton'
import ModalAddQuestion from '@/views/Questionnaire/ModalAddQuestion'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'


export default {
  name: 'logging-room-detail',
  components: {
    ParticipantCard,
    TopicCard,
    loggingRoomApi,
    InfiniteLoading,
    BaseButton,
    ModalAddQuestion,
    ModalDeleteConfirmation
  },
  data () {
    return {
      topics: [],
      page: 1,
      size: 10,
      loggingRoom: {},
      topic: {
        id: '',
        title: '',
        isUpdate: false,
        type: 'Topic'
      },
      topicModal: false,
      modalDeleteConfirmation: {
        show: false,
        title: '',
        id: ''
      }
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
    errorCallBack (err) {
      console.log(err)
      this.$toasted.error('Something Error')
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
    setLoggingRoom () {
      loggingRoomApi.getLoggingRoom(response => {
        this.loggingRoom = response.data
      }, this.errorCallBack, {
        params: {
          loggingRoomId: this.$route.params.loggingRoomId
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
      console.log(value)
      alert('hold')
      loggingRoomApi.createTopic(response => {
        this.$toasted.success('success create question')
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
      }, this.errorCallBack, {
        params: {
          loggingRoomId: this.modalDeleteConfirmation.id,
          topicId: this.modalDeleteConfirmation.id
        }
      })
    }
  },
  created () {
    this.setLoggingRoom()
  }
}
