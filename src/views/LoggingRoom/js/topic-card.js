import BaseCard from '@/components/BaseCard'

export default {
  name: 'topic-card',
  components: {
    BaseCard
  },
  props: {
    title: {
      type: String,
      default: 'Lorem Ipsum'
    }
  }
}
