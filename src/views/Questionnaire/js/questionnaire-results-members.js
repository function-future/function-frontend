import SearchBar from '@/components/SearchBar'
import QuestionnaireParticipantCard from '../QuestionnaireParticipantCard'
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
  computed: {
    ...mapGetters([
      'listAppraiseeResults'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAppraiseeResults'
    ]),
    ...mapMutations([
      'RESET_LIST_APPRAISEE_RESULTS',
      'PUSH_LIST_APPRAISEE_RESULTS'
    ]),
    goToMemberDetail (userSummaryId) {
      this.$router.push({
        name: 'questionnaireResultsMemberDetail',
        params: {
          batchCode: this.$route.params.batchCode,
          userSummaryId: userSummaryId
        }
      })
    }
  },
  created () {
    this.fetchAppraiseeResults({
      data: {
        params: {
          batchCode: this.$route.params.batchCode,
          page: 1,
          size: 10
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}
