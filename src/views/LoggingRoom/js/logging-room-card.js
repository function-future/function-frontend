import BaseCard from '@/components/BaseCard'

const MAX_CHAR_TITLE = 35
const MAX_CHAR_DESCRIPTION = 150

export default {
  name: 'logging-room-card',
  components: {
    BaseCard,
  },
  props: {
    title: {
      type: String,
      default: 'Lorem ipsum dolor sit amet, consectetur cras amet.'
    },
    description: {
      type: String,
      default: 'Lorem ipsum dolor sit amet,' +
        ' consectetur adipiscing elit.' +
        ' Maecenas blandit dictum turpis,' +
        ' et rutrum odio vulputate sed. Etiam at ante lacus.'+
        'Lorem ipsum dolor sit amet'
    },
    memberCount: {
      type: Number,
      default: 0
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
    computedMemberCount () {
      return this.memberCount.toString().concat(' Members')
    }
  }
}
