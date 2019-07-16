import QuestionnaireForm from '../QuestionnaireForm'
import QuestionCard from '../QuestionCard'
import QuestionnaireParticipantCard from '../QuestionnaireParticipantCard'
import BaseButton from '@/components/BaseButton'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'QuestionnaireEdit',
  components: {
    QuestionnaireForm,
    QuestionCard,
    QuestionnaireParticipantCard,
    BaseButton
  },
  data () {
    return {
      appraisee: {
        id: 'sample-id',
        name: 'ricky',
        avatar: 'aa',
        role: 'STUDENT',
        university: 'ITB',
        batch: 'future3.0'
      },
      questions: [
        {
          id: 'question-id',
          description: 'Lorem-ipsum',
          score: 6.0
        }
      ],
      i: 1,
      currentQuestionnaire: {}
    }
  },
  computed: {
    ...mapGetters([
      'currentQuestionnaireAdmin'
    ]),
    kucing () {
      console.log('kucing:',this.currentQuestionnaireAdmin)
      return this.currentQuestionnaireAdmin
    }
  },
  methods: {
    ...mapActions([
      'fetchCurrentQuestionnaireAdmin'
    ]),
    ...mapMutations([
      'RESET_CURRENT_QUESTIONNAIRE',
      'ASSIGN_CURRENT_QUESTIONNAIRE',
      'RESET_CURRENT_QUESTIONS',
      'PUSH_CURRENT_QUESTIONS',
      'RESET_CURRENT_APPRAISEE',
      'PUSH_CURRENT_APPRAISEE',
      'RESET_CURRENT_APPRAISER',
      'PUSH_CURRENT_APPRAISER'
    ])
  },
  created () {
    this.fetchCurrentQuestionnaireAdmin({
      data: {
        params: {
          questionnaireId: this.$route.params.questionnaireId
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
    Object.assign(this.currentQuestionnaire, this.currentQuestionnaireAdmin)
    console.log(this.currentQuestionnaireAdmin)
    console.log(this.kucing)
  }
}
