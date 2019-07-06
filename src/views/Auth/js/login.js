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
      },
      errorAlert: ''
    }
  },
  methods: {
    ...mapActions([
      'attemptLogin'
    ]),
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
      this.attemptLogin({
        data: { ...this.data },
        callback: this.successLogin,
        fail: this.failLogin
      })
    },
    successLogin () {
      this.$router.push({ name: 'feeds' })
    },
    failLogin () {
      this.errorAlert = 'You have entered an invalid email or password'
    }
  }
}
