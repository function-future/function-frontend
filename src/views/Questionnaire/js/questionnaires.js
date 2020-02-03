import SearchBar from '@/components/SearchBar'
import QuestionnaireCard from '@/views/Questionnaire/QuestionnaireCard'
import questionnaireApi from '@/api/controller/questionnaire'
import InfiniteLoading from 'vue-infinite-loading'
import EmptyState from '@/components/emptyState/EmptyState'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import { mapActions } from 'vuex'

export default {
  name: 'Questionnaires',
  components: {
    SearchBar,
    QuestionnaireCard,
    InfiniteLoading,
    ModalDeleteConfirmation,
    EmptyState
  },
  data () {
    return {
      questionnaires: [],
      keyword: null,
      page: 1,
      size: 10,
      deleteConfirmationModal: {
        show: false,
        id: '',
        title: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'createChatroom',
      'toast'
    ]),
    goToCreate () {
      this.$router.push({
        name: 'questionnairesCreate'
      })
    },
    openDeleteModal (value) {
      this.deleteConfirmationModal.show = true
      this.deleteConfirmationModal.id = value.id
      this.deleteConfirmationModal.title = value.title
    },
    closeDeleteModal () {
      this.deleteConfirmationModal.show = false
      this.deleteConfirmationModal.id = ''
      this.deleteConfirmationModal.title = ''
    },
    deleteQuestionnaireWithId () {
      questionnaireApi.deleteQuestionnaire(response => {
        this.toast({
          data: {
            message: 'Delete Questionnaire success',
            type: 'is-success'
          }
        })
        this.$refs.infiniteLoading.stateChanger.reset()
        this.resetState()
        this.closeDeleteModal()
      }, this.submitMessageErrorCallback,
      {
        params: {
          questionnaireId: this.deleteConfirmationModal.id
        }
      })
    },
    submitMessageErrorCallback (err) {
      console.log(err)
      this.toast({
        data: {
          message: 'fail to delete questionnaire',
          type: 'is-danger'
        }
      })
    },
    searchHandler (value) {
      this.page = 1
      this.keyword = value
      questionnaireApi.getQuestionnaires(response => {
        this.questionnaires = response.data
      }, this.errorCallback, {
        params: {
          page: this.page,
          size: this.size,
          keyword: this.keyword
        }
      })
    },
    infiniteHandler ($state) {
      if (!this.keyword) {
        questionnaireApi.getQuestionnaires(response => {
          if (this.page === 1) {
            this.questionnaires = []
          }
          if (response.data.length) {
            this.page += 1
            this.questionnaires.push(...response.data)
            $state.loaded()
          } else {
            $state.complete()
          }
        }, this.errorCallback, {
          params: {
            page: this.page,
            size: this.size,
            keyword: this.keyword
          }
        })
      } else {
        $state.complete()
      }
    },
    resetState () {
      this.questionnaires = []
      this.keyword = ''
      this.page = 1
      this.size = 10
    }
  }
}
