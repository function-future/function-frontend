import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'users',
  components: {
    BaseInput,
    BaseButton
  },
  data () {
    return {
      data: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'feeds' })
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    login () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
      alert()
    }
  }
}
