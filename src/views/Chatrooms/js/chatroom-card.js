import moment from 'moment'
import ChatroomType from '@/mixins/ChatroomType'

const MAX_CHAR_NAME = 30
const MAX_CHAR_LASTMESSAGE = 40

export default {
  name: 'ChatroomCard',
  mixins: [
    ChatroomType
  ],
  props: {
    name: String,
    isSeen: Boolean,
    time: Number,
    lastMessage: String,
    avatar: String,
    isChoosen: Boolean,
    type: String,
    totalMembers: Number
  },
  computed: {
    computedName () {
      if (this.name.length > MAX_CHAR_NAME) {
        return this.name.substring(0, MAX_CHAR_NAME - 3) + '...'
      } else {
        return this.name
      }
    },
    computedLastMessage () {
      if (this.lastMessage.length > MAX_CHAR_LASTMESSAGE) {
        return this.lastMessage.substring(0, MAX_CHAR_LASTMESSAGE - 3) + '...'
      } else {
        return this.lastMessage
      }
    },
    convertClock () {
      if (this.time) {
        if (moment(this.toDateList(Date.now())).diff(this.toDateList(this.time), 'days') >= 1) {
          return moment(this.time).format('DD MMM')
        }
        return moment(this.time).format('HH:mm')
      } else {
        return ''
      }
    }
  },
  methods: {
    toDateList (time) {
      return [moment(time).year(), moment(time).month(), moment(time).date()]
    }
  }
}
