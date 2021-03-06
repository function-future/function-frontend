export default {
  name: 'participant-card',
  props: {
    name: String,
    avatar: String,
    university: String,
    role: String,
    batch: String
  },
  computed: {
    computedRole () {
      let res = this.role.substring(1, this.role.length).toLocaleLowerCase()
      return this.role[0].concat(res)
    }
  }
}
