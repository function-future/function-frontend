import BaseButton from '@/components/BaseButton'
import moment from 'moment'

const MAX_CHAR_TITLE = 35
const MAX_CHAR_DESCRIPTION = 200

export default {
  name: 'QuestionnaireCard',
  components: {
    BaseButton
  },
  props: {
    id: {
      type: String,
      default: 'testestes'
    },
    title: String,
    desc: String,
    startDate: Number,
    dueDate: Number,
    isDisable: Boolean,
    isEdit: Boolean
  },
  method: {
    goToEdit () {
      alert('jackie')
      console.log(this.id)
      this.$router.push({
        name: 'questionnaireEdit',
        params: { questionnaireId: this.id }
      })
    }
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
  }
}
