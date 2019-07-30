import BaseCard from '@/components/BaseCard'

export default {
  name: 'QuestionnaireParticipantDetailCard',
  components: {
    BaseCard
  },
  props: {
    avatar: String,
    nameParticipant: String,
    university: String,
    batch: String,
    role: String,
    score: Number
  },
  computed: {
    computedRole () {
      let res = this.role.substring(1, this.role.length).toLocaleLowerCase()
      return this.role[0].concat(res)
    }
  }
}
