export default {
  name: "UserListCard",
  props: {
    name: String,
    role: String,
    batch: String,
    university: String
  },
  computed: {
    userType() {
      let toFirstUpperCase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }
      return this.role === 'STUDENT' ? toFirstUpperCase(this.role) + ' - Batch ' + this.batch :
        toFirstUpperCase(this.role)
    }
  }
}
