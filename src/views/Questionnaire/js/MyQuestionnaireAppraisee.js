import SearchBar from '@/components/SearchBar'
import BaseButton from '@/components/BaseButton'
import BaseCard from '@/components/BaseCard'
import QuestionnaireCard from '../QuestionnaireCard'
import QuestionnaireParticipantCard from '../QuestionnaireParticipantCard'
import QuestionnaireForm from '../MyQuestionnaireForm'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: 'MyQuestionnaireAppraisee',
  components: {
    SearchBar,
    QuestionnaireCard,
    QuestionnaireParticipantCard,
    QuestionnaireForm,
    BaseButton,
    BaseCard
  },
  props: {
    currentAppraiseeName: {
      default: 'Unknown',
      type: String
    }
  },
  data () {
    return {
      currentApraiseeNameData: this.currentApraiseeName,
      myQuestionnaire: {
        id: '5d2352f94534202434730f2a',
        title: 'future batch 3',
        description: 'future 3 bootcamp questionnaire',
        startDate: 1562596044000,
        dueDate: 1562682444000
      },
      appraisee: {
        id: '5d2352954534202434730f29',
        name: 'Tzuyu',
        avatar: 'https://rankedwiki.com/wp-content/uploads/2018/12/Tzuyu-Wiki-Net-Worth-Dating-286x286.jpg',
        batch: {
          id: '5d234feb4534202434730f27',
          name: '3',
          code: '3'
        },
        role: 'STUDENT',
        university: 'ITB'
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchMyListApprisees',
      'fetchCurrentQuestionnaire'
    ]),
    ...mapMutations([
      'RESET_MY_LIST_APPRAISEE',
      'PUSH_MY_LIST_APPRAISEE',
      'RESET_CURRENT_QUESTIONNAIRE',
      'ASSIGN_CURRENT_QUESTIONNAIRE'
    ]),
    computedDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    goToInputQuestionnaireAnswer (appraisee) {
      this.$router.push({
        name: 'myQuestionnaireForm',
        params: { appraiseeId: appraisee.id }
      })
    }
  },
  computed: {
    ...mapGetters([
      'myListAppraisees',
      'currentQuestionnaire'
    ])
  },
  created () {
    this.fetchCurrentQuestionnaire({
      data: {
        params: {
          questionnaireId: this.$route.params.questionnaireId
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
    this.fetchMyListApprisees({
      data: {
        params: {
          questionnaireId: this.$route.params.questionnaireId
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }

}
