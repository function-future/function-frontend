import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import BaseButton from '@/components/BaseButton'
import UserSimpleCard from '@/components/UserSimpleCard'
import reminderApi from '@/api/controller/reminders'
import ReminderMemberModal from '@/views/Reminders/ReminderMemberModal'
import CustomMobileNavBar from '@/components/skeletons/CustomMobileNavBar'
import Breakpoint from '@/mixins/Breakpoint'
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'ReminderForm',
  components: {
    BaseInput,
    BaseButton,
    UserSimpleCard,
    ReminderMemberModal,
    BaseTextArea,
    CustomMobileNavBar
  },
  mixins: [
    Breakpoint
  ],
  props: {
    editMode: Boolean,
    createMode: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      members: [],
      showModalMember: false,
      days: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
      daysChosen: ['SUNDAY'],
      timeType: 'EVERY_DAY',
      date: 1,
      time: null,
      title: '',
      description: ''
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    toDisplayDay (day) {
      return day.charAt(0).toUpperCase() + day.slice(1, 3).toLowerCase()
    },
    handleTopBtnClick () {
      if (this.editMode) {
        this.save()
      } else {
        this.$router.push({ name: 'reminderEdit', params: { reminderId: this.$route.params.reminderId } })
      }
    },
    parseTime () {
      return {
        minute: this.time ? this.time.getMinutes() : 0,
        hour: this.time ? this.time.getHours() : 0
      }
    },
    prepareDataForRequest () {
      return {
        title: this.title,
        description: this.description,
        isRepeatedMonthly: this.timeType === 'MONTHLY',
        members: this.members.map(member => member.id),
        repeatDays: this.timeType === 'EVERY_DAY' ? this.days : this.daysChosen,
        monthlyDate: this.date,
        minute: this.parseTime().minute,
        hour: this.parseTime().hour
      }
    },
    save () {
      const data = this.prepareDataForRequest()
      if (this.createMode) {
        reminderApi.createReminder(response => {
          this.toast({
            data: {
              message: 'Reminder has been successfully created',
              type: 'is-success'
            }
          })
          this.$router.replace({ name: 'reminderDetail', params: { reminderId: response.data.id } })
        }, this.errorHandler, { body: data })
      } else {
        const reminderId = this.$route.params.reminderId
        reminderApi.updateReminder(response => {
          this.toast({
            data: {
              message: 'Reminder has been successfully updated',
              type: 'is-success'
            }
          })
          this.$router.replace({ name: 'reminderDetail', params: { reminderId } })
        }, this.errorHandler, {
          body: data,
          params: {
            reminderId
          }
        })
      }
    },
    errorHandler (err) {
      console.log(err)
      this.toast({
        data: {
          message: 'Something went wrong',
          type: 'is-error'
        }
      })
    },
    addMemberHandler (member) {
      this.members.push(member)
    },
    removeMember (index) {
      this.members.splice(index, 1)
    },
    dayClickHandler (day) {
      if (this.editMode) {
        if (this.daysChosen.includes(day)) {
          if (this.daysChosen.length > 1) {
            this.daysChosen.splice(this.daysChosen.indexOf(day), 1)
          }
        } else {
          this.daysChosen.push(day)
        }
      }
    },
    setData (data) {
      this.reminder = data
      this.members = data.members
      this.title = data.title
      this.description = data.description
      if (data.isRepeatedMonthly) {
        this.timeType = 'MONTHLY'
        this.date = data.monthlyDate
      } else {
        this.timeType = data.repeatDays.length === 7 ? 'EVERY_DAY' : 'WEEKLY'
        this.daysChosen = data.repeatDays
      }
      this.time = moment(data.time, 'HH:mm').toDate()
    }
  },
  created () {
    if (!this.createMode) {
      reminderApi.getReminder(response => {
        this.setData(response.data)
      }, this.errorHandler, {
        params: {
          reminderId: this.$route.params.reminderId
        }
      })
    }
  }
}
