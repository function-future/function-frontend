import BaseCard from '@/components/BaseCard'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import UserSimpleCard from '@/components/UserSimpleCard'
import ReminderMemberModal from '@/views/Reminders/ReminderMemberModal'
import loggingRoomApi from '@/api/controller/logging-room'
import { mapGetters } from 'vuex'

export default {
  name: 'logging-room-create',
  components: {
    BaseCard,
    BaseInput,
    BaseTextArea,
    UserSimpleCard,
    ReminderMemberModal,
    BaseButton,
    loggingRoomApi
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    members: {
      type: Array,
      default: function () {
        return []
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      titleLabel: 'TITLE',
      descriptionLabel: 'DESCRIPTION',
      titleTemp: '',
      descriptionTemp: '',
      membersTemp: [],
      participantModal: false
    }
  },
  computed: {
    ...mapGetters([
      'accessList'
    ])
  },
  methods: {
    removeParticipant (index) {
      this.members.splice(index, 1)
    },
    addParticipant (participant) {
      this.members.push(participant)
    },
    saveLoggingRoom () {
      if (this.titleTemp && this.descriptionTemp && this.members.length) {
        if (!this.isEdit) {
          loggingRoomApi.createLoggingRoom(response => {
            this.$toasted.success('created')
            this.$router.push({
              name: 'loggingRoom'
            })
          }, this.errorCallBack, {
            body: {
              title: this.titleTemp,
              description: this.descriptionTemp,
              members: this.computedMembers()
            }
          })
        } else {
          loggingRoomApi.updateLoggingRoom(() => {
            this.$toasted.success('updated')
            this.$router.push({
              name: 'loggingRoom'
            })
          }, this.errorCallBack, {
            params: {
              loggingRoomId: this.$route.params.loggingRoomId
            },
            body: {
              title: this.titleTemp,
              description: this.descriptionTemp,
              members: this.computedMembers()
            }
          })
        }
      } else {
        this.$toasted.error('please fill all field!')
      }
    },
    errorCallBack (err) {
      console.log(err)
      this.$toasted.error('Something Error')
    },
    computedMembers () {
      let membersId = []
      this.membersTemp.forEach(member => membersId.push(member.id))
      return membersId
    },

  },
  created () {
    this.titleTemp = this.title
    this.descriptionTemp = this.description
    this.membersTemp = this.members
  }
}
