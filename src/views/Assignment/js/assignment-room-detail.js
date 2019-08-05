import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import BaseInput from '@/components/BaseInput'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import InfiniteLoading from 'vue-infinite-loading'
let marked = require('marked')

export default {
  name: 'AssignmentRoomDetail',
  components: {
    BaseCard,
    BaseButton,
    BaseTextArea,
    BaseInput,
    ModalDeleteConfirmation,
    InfiniteLoading
  },
  data () {
    return {
      roomDetail: {
        id: '',
        student: {},
        point: '',
        assignment: {
          description: ''
        }
      },
      discussions: [],
      discussion: {
        comment: ''
      },
      discussionPaging: {
        page: 1,
        size: 4,
        totalRecords: 0
      },
      state: '',
      isLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'room',
      'comments',
      'accessList'
    ]),
    descriptionCompiledMarkdown: function () {
      return marked(this.roomDetail.assignment.description)
    },
    isDeadlineHasPassed: function () {
      return this.roomDetail.assignment.deadline <= new Date()
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchRoomDetail',
      'fetchComments',
      'postComment',
      'postAssignmentScore'
    ]),
    initPage () {
      this.fetchRoomDetail({
        data: {
          batchCode: this.$route.params.batchCode,
          assignmentId: this.$route.params.assignmentId,
          roomId: this.$route.params.roomId
        },
        callback: this.successFetchRoomById,
        fail: this.failFetchRoomById
      })
    },
    successFetchRoomById () {
      this.roomDetail = this.room
      this.isLoading = false
    },
    failFetchRoomById () {
      this.$toasted.error('Something went wrong')
    },
    initDiscussion ($state) {
      this.state = $state
      let data = {
        batchCode: this.$route.params.batchCode,
        assignmentId: this.$route.params.assignmentId,
        roomId: this.$route.params.roomId,
        page: this.discussionPaging.page,
        pageSize: this.discussionPaging.size
      }
      this.fetchComments({
        data,
        callback: this.successFetchComments,
        fail: this.failFetchComments
      })
    },
    successFetchComments (response, paging) {
      this.discussionPaging = {
        page: paging.page,
        size: paging.size,
        totalRecords: paging.totalRecords
      }
      this.discussions.push(...response)
      if (response.length) {
        this.discussionPaging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
    },
    failFetchComments () {
      this.$toasted.error('Something went wrong')
    },
    submitComment () {
      const data = {
        batchCode: this.$route.params.batchCode,
        assignmentId: this.$route.params.assignmentId,
        roomId: this.$route.params.roomId
      }
      const payload = this.discussion
      this.postComment({
        data,
        payload,
        callback: this.successSubmitComment,
        fail: this.failSubmitComment
      })
    },
    successSubmitComment (response) {
      this.$toasted.success(`Successfully commented on discussion ${this.$route.params.assignmentId}`)
      this.discussion.comment = ''
      this.discussions.unshift(response)
    },
    failSubmitComment () {
      this.$toasted.error('Something went wrong')
    },
    updateScore () {
      let payload = {
        point: this.roomDetail.point
      }
      this.postAssignmentScore({
        data: {
          batchCode: this.$route.params.batchCode,
          assignmentId: this.$route.params.assignmentId,
          roomId: this.$route.params.roomId
        },
        payload,
        callback: this.successUpdatingScore,
        fail: this.failedUpdatingScore
      })
    },
    successUpdatingScore () {
      this.$toasted.success('Successfully updated score')
    },
    failedUpdatingScore () {
      this.$toasted.error('Something went wrong')
    }
  }
}
