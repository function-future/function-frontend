import QuestionnaireForm from '../QuestionnaireForm'
import QuestionCard from '../QuestionCard'
import QuestionnaireParticipantCard from '../QuestionnaireParticipantCard'
import BaseButton from '@/components/BaseButton'

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
      currentQuestionnaire:{

      },
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
        },
        {
          id: 'question-id1',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id2',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id3',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id1',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id2',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id3',
          description: 'Lorem-ipsum',
          score: 6.0
        },{
          id: 'question-id',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id1',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id2',
          description: 'Lorem-ipsum',
          score: 6.0
        },
        {
          id: 'question-id3',
          description: 'Lorem-ipsum',
          score: 6.0
        }
      ],
      i: 1
    }
  }
}
