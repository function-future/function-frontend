import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'activityBlogs',
  components: {
    BaseButton,
    BaseCard
  },
  data () {
    return {
      activityBlogs: [
        {
          "id": "f532e5f8-1036-42cd-8f22-d10fd7fd6bb2",
          "title": "Activity Blog Title 1",
          "thumbnailUrl": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "description": "description",
          "author": {
            "email": "student@student.com",
            "name": "Student 1"
          }
        },
        {
          "id": "f532e5f8-1036-42cd-8f22-d10fd7fd6bb3",
          "title": "Activity Blog Title 2",
          "thumbnailUrl": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "description": "",
          "author": {
            "email": "student@student.com",
            "name": "Student 1"
          }
        },
        {
          "id": "f532e5f8-1036-42cd-8f22-d10fd7fd6bb4",
          "title": "Activity Blog Title 3",
          "thumbnailUrl": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "description": "",
          "author": {
            "email": "student@student.com",
            "name": "Student 1"
          }
        },
        {
          "id": "f532e5f8-1036-42cd-8f22-d10fd7fd6bb5",
          "title": "Activity Blog Title 4",
          "thumbnailUrl": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "description": "",
          "author": {
            "email": "student@student.com",
            "name": "Student 1"
          }
        },
        {
          "id": "f532e5f8-1036-42cd-8f22-d10fd7fd6bb6",
          "title": "Activity Blog Title 5",
          "thumbnailUrl": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
          "description": "",
          "author": {
            "email": "student@student.com",
            "name": "Student 1"
          }
        }
      ]
    }
  },
  methods: {
    goToActivityBlogDetail (id) {
      this.$router.push({
        name: 'activityBlogDetail',
        params: { id: id }
      })
    }
  }
}
