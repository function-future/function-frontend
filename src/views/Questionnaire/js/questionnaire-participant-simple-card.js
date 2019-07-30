import BaseCard from '@/components/BaseCard'

export default {
  name: 'SimpleQuestionnaireParticipantCard',
  components: {
    BaseCard
  },
  props: {
    name: String,
    avatar: String,
    score: Number
  }
}
