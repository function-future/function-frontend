import SearchBar from '@/components/SearchBar'
import BaseButton from '@/components/BaseButton'
import QuestionnaireCard from '../QuestionnaireCard'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import questionnaireApi from '@/api/controller/questionnaire'

export default {
  name: 'Questionnaires',
  components: {
    SearchBar,
    BaseButton,
    QuestionnaireCard
  },
  methods: {
    ...mapActions([
      'fetchListQuestionnaires'
    ]),
    ...mapMutations([
      'RESET_LIST_QUESTIONNAIRES',
      'PUSH_LIST_QUESTIONNAIRES'
    ]),
    goToCreate () {
      this.$router.push({
        name: 'questionnairesCreate'
      })
    },
    deleteQuestionnaireWithId (questionnaireId) {
      questionnaireApi.deleteQuestionnaire(response => {
        this.$toasted.success('successs delete')
      }, this.submitMessageErrorCallback,
      {
        params: {
          questionnaireId: questionnaireId
        }
      })
    },
    submitMessageErrorCallback (err) {
      console.log(err)
      this.$toasted.error('Fail to deleteQuestionnaire')
    }
  },
  computed: {
    ...mapGetters([
      'listQuestionnaires'
    ])
  },
  created () {
    this.fetchListQuestionnaires({
      data: {
        page: 1,
        size: 10
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}
