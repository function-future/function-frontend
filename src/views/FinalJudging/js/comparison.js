import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'

export default {
  name: 'Comparison',
  components: {
    BaseCard,
    BaseInput,
    BaseButton
  },
  data () {
    return {
      scores: []
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'comparison',
      'score'
    ])
  },
  methods: {
    ...mapActions([
      'fetchComparison',
      'submitScore'
    ]),
    initPage () {
      this.fetchComparison({
        data: {
          batchCode: this.$route.params.batchCode,
          judgingId: this.$route.params.judgingId
        },
        callback: this.successFetchingComparison,
        fail: this.failedFetchingComparison
      })
    },
    successFetchingComparison () {
      this.comparison.forEach((item, index) => {
        this.scores[index] = item.point
      })
    },
    failedFetchingComparison () {
      this.$toasted.error('Something went wrong')
    },
    returnButtonClicked () {
      this.$router.go(-1)
    },
    submitButtonClicked () {
      let payload = {
        scores: []
      }
      this.comparison.forEach((item, index) => payload.scores.push({
        studentId: item.studentId,
        score: this.scores[index]
      }))
      this.submitScore({
        data: {
          batchCode: this.$route.params.batchCode,
          judgingId: this.$route.params.judgingId
        },
        payload,
        callback: this.successSubmittingScore,
        fail: this.failedSubmittingScore
      })
    },
    successSubmittingScore () {
      this.$router.push({
        name: 'judgingList',
        params: {
          batchCode: this.$route.params.batchCode
        }
      })
      this.$toasted.success('Successfully updated score')
    },
    failedSubmittingScore () {
      this.$toasted.error('Something went wrong')
    }
  }
}
