import SearchBar from '@/components/SearchBar'
import QuestionnaireCard from '../QuestionnaireCard'
import QuestionnaireParticipantCard from '../QuestionnaireParticipantCard'
import moment from 'moment'

export default {
  name: 'MyQuestionnaireAppraisee',
  components: {
    SearchBar,
    QuestionnaireCard,
    QuestionnaireParticipantCard
  },
  data () {
    return {
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
        // avatar: 'http://localhost:8080/api/core/resources/user/a96b55cf-e3b9-4ce6-b087-4aa666045bfb-thumbnail.jpg',
        // avatar: 'https://avatars0.githubusercontent.com/u/37922672?v=4',
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
    computedDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  computed: {
    computedStartDate () {
      return moment(this.myQuestionnaire.startDate).format('DD/MM/YYYY')
    },
    computedDueDate () {
      return moment(this.myQuestionnaire.dueDate).format('DD/MM/YYYY')
    }
  }
}
