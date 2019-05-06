import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import config from '@/config/index'

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea
  },
  data () {
    return {
      activityBlog: {}
    }
  },
  created () {

  },
  methods: {
    getActivityBlog () {
    },

    postActivityBlog () {
    },

    cancel () {
      this.$router.go(-1)
    }
  }
}
