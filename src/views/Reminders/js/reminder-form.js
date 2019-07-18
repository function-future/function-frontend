import BaseInput from '@/components/BaseInput'
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
    ReminderMemberModal
  },
  props: {
    editMode: Boolean
  },
  data () {
    return {
      edit: this.editMode,
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
      if (this.edit) {
        this.edit = false
        this.save()
      } else {
        this.edit = true
      }
    },
    save () {
      console.log('save')
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
    reminderApi.getReminder(response => {
      this.reminder = response.data
    }, this.errorHandler, {
      params: {
        reminderId: this.$route.params.reminderId
      }
    })
  }
}
