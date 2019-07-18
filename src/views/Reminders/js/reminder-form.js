import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import BaseButton from '@/components/BaseButton'
import UserSimpleCard from '@/components/UserSimpleCard'
import reminderApi from '@/api/controller/reminders'
import ReminderMemberModal from '@/views/Reminders/ReminderMemberModal'

export default {
  name: 'ReminderForm',
  components: {
    BaseInput,
    BaseButton,
    UserSimpleCard,
    ReminderMemberModal,
    BaseTextArea
  },
  props: {
    editMode: Boolean,
    createMode: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      reminder: null,
      showModalMember: false
    }
  },
  computed: {
    computedUser () {
      return this.reminder ? this.reminder.members : []
    }
  },
  methods: {
    handleTopBtnClick () {
      if (this.editMode) {
        this.save()
      } else {
        this.$router.push({ name: 'reminderEdit', params: { reminderId: this.$route.params.reminderId } })
      }
    },
    save () {
      console.log('save')
      this.$router.replace({ name: 'reminderDetail', params: { reminderId: this.$route.params.reminderId } })
    },
    errorHandler (err) {
      console.log(err)
      this.$toasted.error('Something went wrong')
    },
    addMemberHandler (member) {
      this.reminder.members.push(member)
    },
    removeMember (index) {
      this.reminder.members.splice(index, 1)
    }
  },
  created () {
    if (!this.createMode) {
      reminderApi.getReminder(response => {
        this.reminder = response.data
      }, this.errorHandler, {
        params: {
          reminderId: this.$route.params.reminderId
        }
      })
    }
  }
}
