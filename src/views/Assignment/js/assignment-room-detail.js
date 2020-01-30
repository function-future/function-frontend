import { mapActions, mapGetters } from 'vuex'
import ListItem from '@/components/list/ListItem'
import InfiniteLoading from 'vue-infinite-loading'
let marked = require('marked')

export default {
  name: 'AssignmentRoomDetail',
  components: {
    ListItem,
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
      'accessList',
      'currentUser'
    ]),
    descriptionCompiledMarkdown: function () {
      return marked(this.roomDetail.assignment.description)
    },
    isDeadlineHasPassed: function () {
      return this.roomDetail.assignment.deadline <= new Date()
    },
    disableCommentBox: function  () {
      return this.currentUser.role === 'ADMIN'
    },
    commentBoxPlaceholder: function () {
      return this.currentUser.role === 'ADMIN' ? 'I\'m sorry, but you can\'t participate in this discussion' : 'Ask a question...'
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
      'postAssignmentScore',
      'toast'
    ]),
    initPage () {
      this.fetchRoomDetail({
        data: {
          batchCode: this.$route.params.batchCode,
          assignmentId: this.$route.params.assignmentId,
          studentId: this.$route.params.studentId
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
      this.toast({
        data: {
          message: 'Fail to load assignment room\'s detail',
          type: 'is-danger'
        }
      })
    },
    initDiscussion ($state) {
      this.state = $state
      let data = {
        batchCode: this.$route.params.batchCode,
        assignmentId: this.$route.params.assignmentId,
        studentId: this.$route.params.studentId,
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
        size: 4,
        totalRecords: paging.totalRecords
      }
      this.discussions.unshift(...response.reverse())
      if (response.length) {
        this.discussionPaging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
    },
    failFetchComments () {
      this.toast({
        data: {
          message: 'Fail to load comments',
          type: 'is-danger'
        }
      })
    },
    submitComment () {
      const data = {
        batchCode: this.$route.params.batchCode,
        assignmentId: this.$route.params.assignmentId,
        studentId: this.$route.params.studentId
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
      this.toast({
        data: {
          message: 'Successfully posted comment on this discussion',
          type: 'is-success'
        }
      })
      this.discussion.comment = ''
      this.discussions.unshift(response)
    },
    failSubmitComment () {
      this.toast({
        data: {
          message: 'Fail to post comment',
          type: 'is-danger'
        }
      })
    },
    updateScore () {
      let payload = {
        point: this.roomDetail.point
      }
      this.postAssignmentScore({
        data: {
          batchCode: this.$route.params.batchCode,
          assignmentId: this.$route.params.assignmentId,
          roomId: this.$route.params.studentId
        },
        payload,
        callback: this.successUpdatingScore,
        fail: this.failedUpdatingScore
      })
    },
    successUpdatingScore () {
      this.toast({
        data: {
          message: 'Successfully updated score',
          type: 'is-success'
        }
      })
    },
    failedUpdatingScore () {
      this.toast({
        data: {
          message: 'Fail to update score',
          type: 'is-danger'
        }
      })
    }
  }
}
