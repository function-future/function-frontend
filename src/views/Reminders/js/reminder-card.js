import BaseCard from '@/components/BaseCard'
export default {
  name: 'ReminderCard',
  components: {
    BaseCard
  },
  props: {
    reminder: Object
  },
  methods: {
    toFirstUpperCase (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    },
    formatDay (reminder) {
      if (reminder.isRepeatedMonthly) {
        return reminder.monthlyDate
      } else {
        if (reminder.repeatDays.length === 7) {
          return 'Every day'
        } else {
          return reminder.repeatDays.map(day => this.toFirstUpperCase(day)).join(', ')
        }
      }
    }
  }
}
