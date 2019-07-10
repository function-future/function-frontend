export default {
  name: 'QuestionnaireParticipantCard',
  props: {
    name: String,
    avatar: String,
    university: String,
    role: String,
    batch: String
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
