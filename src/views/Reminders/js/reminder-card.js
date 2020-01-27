export default {
  name: 'ReminderCard',
  props: {
    reminder: Object
  },
  methods: {
    toFirstUpperCase (string) {
      return string.charAt(0).toUpperCase() + string.slice(1, 3).toLowerCase()
    },
    formatDay (reminder) {
      if (reminder.isRepeatedMonthly) {
        return 'Every month on ' + reminder.monthlyDate
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
