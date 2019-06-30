import BaseCard from '@/components/BaseCard'

export default {
  name: 'courseCard',
  components: { BaseCard },
  props: [
    'course'
  ],
  methods: {
    copy () {
      this.$emit('copy', this.course.id)
    },
    edit () {
      this.$emit('edit', this.course.id)
    },
    deleteCourse () {
      this.$emit('delete', this.course.id)
    }
  },
  computed: {
    title () {
      let maximumCharacters = 40
      if (this.course.title.length > maximumCharacters) {
        return this.course.title.slice(0, maximumCharacters) + '...'
      }
      return this.course.title
    }
  }
}
