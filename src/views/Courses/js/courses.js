import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'courses',
  components: {
    BaseCard,
    CourseCard,
    BaseButton
  },
  data () {
    return {
      courses: [
        {
          'id': 'sample-id',
          'title': 'Course Title',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      ]
    }
  },
  methods: {
    goToAddCourse () {},
    editThisCourse () {},
    deleteThisCourse () {}
  }
}
