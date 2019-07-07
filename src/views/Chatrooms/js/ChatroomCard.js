import moment from 'moment'

const MAX_CHAR_GROUP_NAME = 24
const MAX_CHAR_PRIVATE_NAME = 17
const MAX_CHAR_PRIVATE_LASTMESSAGE = 24
const MAX_CHAR_GROUP_LASTMESSAGE = 31

export default {
  name: 'ChatroomCard',
  props: {
    name: String,
    isSeen: Boolean,
    time: Number,
    lastMessage: String,
    avatar: String,
    type: String,
    isChoosen: Boolean
  },
  computed: {
    computedName () {
      if (this.type === 'PRIVATE' && this.name.length > MAX_CHAR_PRIVATE_NAME) {
        return this.name.substring(0, MAX_CHAR_PRIVATE_NAME - 3) + '...'
      } else if (this.type === 'GROUP' && this.name.length > MAX_CHAR_GROUP_NAME) {
        return this.name.substring(0, MAX_CHAR_GROUP_NAME - 3) + '...'
      } else {
        return this.name
      }
    },
    computedLastMessage () {
      if (this.type === 'PRIVATE' && this.lastMessage.length > MAX_CHAR_PRIVATE_LASTMESSAGE) {
        return this.lastMessage.substring(0, MAX_CHAR_PRIVATE_LASTMESSAGE - 3) + '...'
      } else if (this.type === 'GROUP' && this.lastMessage.length > MAX_CHAR_GROUP_LASTMESSAGE) {
        return this.lastMessage.substring(0, MAX_CHAR_GROUP_LASTMESSAGE - 3) + '...'
      } else {
        return this.lastMessage
      }
    },
    convertClock () {
      if (this.time) {
        if (moment.duration(Date.now() - this.time).asDays() >= 1) {
          return moment(this.time).format('DD MMM')
        }
        return moment(this.time).format('HH:mm')
      } else {
        return ''
      }
    }
  }
}
