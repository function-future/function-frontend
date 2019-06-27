import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'masterCourses',
  components: {
    BaseCard,
    CourseCard,
    BaseButton
  },
  data () {
    return {
      paging: {
        page: 0,
        size: 10
      },
      masterCourses: []
    }
  },
  computed: {
    ...mapGetters([
      'masterCourseList'
    ])
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchMasterCourses'
    ]),
    initPage () {
      let data = {
        ...this.paging,
        page: this.paging.page + 1
      }
      this.fetchMasterCourses({
        data,
        callback: this.successFetchMasterCourses,
        fail: this.failFetchMasterCourses
      })
    },
    successFetchMasterCourses () {
      this.masterCourses = this.masterCourseList
    },
    failFetchMasterCourses () {
      this.$toasted.error('Fail to load course list')
    },
    goToThisMasterCourseDetail (id) {
      this.$router.push({
        name: 'masterCourseDetail',
        params: { id: id }
      })
    },
    goToAddMasterCourse () {
      this.$router.push({
        name: 'addMasterCourse'
      })
    },
    goToEditMasterCourse (id) {
      this.$router.push({
        name: 'editMasterCourse',
        params: { id: id }
      })
    },
    deleteThisMasterCourse () {}
  }
}
