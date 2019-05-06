import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'activityBlogDetail',
  components: {
    BaseButton,
    BaseCard
  },
  data () {
    return {
      activityBlog:
        {
          "id": "f532e5f8-1036-42cd-8f22-d10fd7fd6bb2",
          "title": "Activity Blog Title 1",
          "thumbnailUrl": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "description": "description",
          "author": {
            "email": "student@student.com",
            "name": "Student 1"
          }
        }
    }
  },
  methods: {
    goToEditActivityBlog (id) {
      this.$router.push({
        name: 'editActivityBlog',
        params: { id: id }
      })
    }
  }
}
