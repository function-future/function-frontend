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
      type: String
    },
    title: String,
    description: String,
    startDate: Number,
    dueDate: Number,
    isDisable: Boolean,
    isEdit: Boolean,
    isResult: Boolean,
    score: Number,
    isDetail: Boolean
  },
  methods: {
    goToEdit () {
      if (!this.isDisable) {
        this.$router.push({
          name: 'questionnairesEdit',
          params: { questionnaireId: this.id }
        })
      }
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
      if (this.description.length > MAX_CHAR_DESCRIPTION) {
        return this.description.substring(0, MAX_CHAR_DESCRIPTION).concat('...')
      } else {
        return this.description
      }
    },
    computedStartDate () {
      return moment(this.startDate).format('DD/MMM/YYYY, h:mm a')
    },
    computedDueDate () {
      return moment(this.dueDate).format('DD/MM/YYYY,  h:mm a')
    }
  }
}
