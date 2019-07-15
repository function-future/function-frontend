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
      appraisee: {
        id: 'sample-id',
        name: 'ricky',
        avatar: 'aa',
        role: 'STUDENT',
        university: 'ITB',
        batch: 'future3.0'
      }
    }
  }
}
