import QuestionnaireParticipantDetailCard from '../QuestionnaireParticipantDetailCard'

export default {
  name: 'QuestionnaireResultsMemberDetail',
  components: {
    QuestionnaireParticipantDetailCard
  },
  data () {
    return {
      appraisee: {
        avatar: 'http://localhost:8080/api/core/resources/user/cc5e1eb5-a580-4d5b-8d84-28ab17da9132-thumbnail.jpg',
        name: 'Ricky',
        university: 'ITB',
        role: 'STUDENT',
        batch: {
          code: '3',
          name: 'FUTURE_BATCH3'
        },
        score: 5.7
      }
    }
  }
}
