import moment from 'moment'

const MAX_CHAR_TITLE = 35
const MAX_CHAR_DESCRIPTION = 200

export default {
  name: 'QuestionnaireCard',
  props: {
    title: String,
    desc: String,
    startDate: Number,
    dueDate: Number,
    isUpdate: Boolean
  },
  computed: {
    computedTitle () {
      if (this.title.length > MAX_CHAR_TITLE) {
        return this.title.substring(0, MAX_CHAR_TITLE).concat('...')
      } else {
        return this.title
      }
    },
    computedDescription () {
      if (this.desc.length > MAX_CHAR_DESCRIPTION) {
        return this.desc.substring(0, MAX_CHAR_DESCRIPTION).concat('...')
      } else {
        return this.desc
      }
    },
    computedStartDate () {
      return moment(this.startDate).format('DD/MM/YYYY')
    },
    computedDueDate () {
      return moment(this.dueDate).format('DD/MM/YYYY')
    }
  },
  method: {

  }
}
