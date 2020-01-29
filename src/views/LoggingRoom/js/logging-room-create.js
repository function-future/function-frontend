import UserSimpleCard from '@/components/UserSimpleCard'
import ReminderMemberModal from '@/views/Reminders/ReminderMemberModal'
import loggingRoomApi from '@/api/controller/logging-room'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'logging-room-create',
  components: {
    UserSimpleCard,
    ReminderMemberModal,
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
    ...mapActions([
      'toast'
    ]),
    removeParticipant (index) {
      this.membersTemp.splice(index, 1)
    },
    addParticipant (participant) {
      this.membersTemp.push(participant)
    },
    saveLoggingRoom () {
      if (this.titleTemp && this.descriptionTemp && this.members.length) {
        if (!this.isEdit) {
          loggingRoomApi.createLoggingRoom(response => {
            this.toast({
              data: {
                message: 'success created logging room',
                type: 'is-success'
              }
            })
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
            this.toast({
              data: {
                message: 'Success updated logging room',
                type: 'is-success'
              }
            })
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
        this.toast({
          data: {
            message: 'please fill all field',
            type: 'is-danger'
          }
        })
      }
    },
    errorCallBack (err) {
      console.log(err)
      this.toast({
        data: {
          message: 'something error',
          type: 'is-danger'
        }
      })
    },
    computedMembers () {
      let membersId = []
      this.membersTemp.forEach(member => membersId.push(member.id))
      return membersId
    }

  },
  created () {
    this.titleTemp = this.title
    this.descriptionTemp = this.description
    this.membersTemp = this.members
  }
}
