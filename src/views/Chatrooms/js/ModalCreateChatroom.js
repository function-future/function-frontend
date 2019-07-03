import BaseButton from '@/components/BaseButton'
import SearchBar from '@/components/SearchBar'


export default {
  name: 'modal',
  components: {
    BaseButton,
    SearchBar
  },
  data() {
    return {
      chatroomData: {},
      users: []
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    create () {
      this.$emit('submit', this.chatroomData)
    }
  }
}
