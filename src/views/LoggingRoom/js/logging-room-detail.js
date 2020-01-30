import ParticipantCard from '@/views/LoggingRoom/ParticipantCard'
import TopicCard from '@/views/LoggingRoom/TopicCard'
import InfiniteLoading from 'vue-infinite-loading'
import loggingRoomApi from '@/api/controller/logging-room'
import ModalAddQuestion from '@/views/Questionnaire/ModalAddQuestion'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import MenuCard from '@/views/LoggingRoom/MenuCard'

import Breakpoint from '@/mixins/Breakpoint'
import { mapActions,mapGetters } from 'vuex'

export default {
  name: 'logging-room-detail',
  components: {
    ParticipantCard,
    TopicCard,
    loggingRoomApi,
    InfiniteLoading,
    ModalAddQuestion,
    ModalDeleteConfirmation,
    MenuCard
  },
  mixins: [
    Breakpoint
  ],
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
      },
      iconMenuMembers: 'user',
      iconMenuMembersTitle: 'Members',
      iconMenuTopics: 'list',
      iconMenuTopicsTitle: 'Topics'
    }
  },
  computed: {
    ...mapGetters([
      'accessList'
    ])
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
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
      this.toast({
        data: {
          message: 'something error',
          type: 'is-danger'
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
      loggingRoomApi.createTopic(response => {
        this.toast({
          data: {
            message: 'success create topic',
            type: 'is-success'
          }
        })
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
        this.toast({
          data: {
            message: 'success delete the topic',
            type: 'is-danger'
          }
        })
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
    },
    callShowMembers () {
      this.$router.push({
        name: 'loggingRoomMembersPage',
        params: {
          loggingRoomId: this.$route.params.loggingRoomId
        }
      })
    },
    callShowTopics () {
      this.$router.push({
        name: 'loggingRoomTopicsPage',
        params: {
          loggingRoomId: this.$route.params.loggingRoomId
        }
      })
    }
  },
  created () {
    this.setLoggingRoom()
  }
}
