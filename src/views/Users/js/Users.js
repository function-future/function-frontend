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
      currentTab: 'students',
      students: [
        {
          id: 1,
          name: 'Jonathan',
          university: 'BINUS',
          batch: '1',
          division: 'Technology'
        },
        {
          id: 2,
          name: 'Oliver',
          university: 'UGM',
          batch: '2',
          division: 'Technology'
        }
      ],
      admins: [
        {
          id: 1,
          name: 'David'
        },
        {
          id: 2,
          name: 'Stelli'
        }
      ],
      judges: [
        {
          id: 1,
          name: 'Karnando',
          division: 'Technology'
        },
        {
          id: 2,
          name: 'Ricky',
          division: 'Technology'
        }
      ],
      mentors: [
        {
          id: 1,
          name: 'David',
          division: 'Technology'
        },
        {
          id: 2,
          name: 'Stelli',
          division: 'Technology'
        }
      ]
    }
  },
  methods: {
    changeTab (destinationTab) {
      this.currentTab = destinationTab
    }
  }
}
