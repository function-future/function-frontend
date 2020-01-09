import ParticipantCard from '@/views/LoggingRoom/ParticipantCard'

export default {
  name: 'members-page',
  components: {
    ParticipantCard
  },
  props: {
    iconMenu: {
      type: String,
      default: 'plus'
    },
    iconTitle: {
      type: String,
      default: 'Title'
    }
  },
  methods: {
    testclick () {
      window.alert('hai')
      console.log('broken')
      this.iconTitle = 'skipskip'
      this.$emit('click')
    }
  }
}
