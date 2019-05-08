import BaseButton from '@/components/BaseButton'
import UserCard from '@/components/users/UserCard'
import Tabs from 'vue-tabs-with-active-line'

export default {
  name: 'announcements',
  components: {
    UserCard,
    BaseButton,
    Tabs
  },
  data () {
    return {
      tabs: [
        { title: 'Students', value: 'students' },
        { title: 'Admins', value: 'admins' },
        { title: 'Mentors', value: 'mentors' },
        { title: 'Judges', value: 'judges' }
      ],
      currentTab: 'students'
    }
  },
  methods: {
    changeTab (destinationTab) {
      this.currentTab = destinationTab
    }
  }
}
