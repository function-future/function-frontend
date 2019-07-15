import SearchBar from '@/components/SearchBar'
import QuestionnaireParticipantCard from '../QuestionnaireParticipantCard'

export default {
  name: 'QuestionnaireResultsMembers',
  components: {
    SearchBar,
    QuestionnaireParticipantCard
  },
  data () {
    return {
      appraisee: {
        id: 'sample-id',
        name: 'Ricky',
        avatar: 'cc5e1eb5-a580-4d5b-8d84-28ab17da9132',
        role: 'Student',
        university: 'ITB',
        batch: '3'
      }
    }
  },
  methods: {
    goToMemberDetail (appraiseeId) {
      this.$router.push({
        name: 'questionnaireResultsMemberDetail',
        params: {
          batchCode: this.$route.params.batchCode,
          memberId: appraiseeId
        }
      })
    }
  }
}
