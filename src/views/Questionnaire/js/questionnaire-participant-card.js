import BaseCard from '@/components/BaseCard'

export default {
  name: 'QuestionnaireParticipantCard',
  components: {
    BaseCard
  },
  props: {
    name: String,
    avatar: String,
    university: String,
    role: String,
    batch: String,
    isEdit: Boolean,
    isResult: Boolean,
    score: Number
  },
  method: {
  },
  computed: {
    computedRole () {
      let res = this.role.substring(1, this.role.length).toLocaleLowerCase()
      return this.role[0].concat(res)
    }
  }
}
