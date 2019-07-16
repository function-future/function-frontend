import { mapActions } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'changePassword',
  components: {
    BaseButton,
    BaseInput
  },
  data () {
    return {
      data: {
        oldPassword: '',
        newPassword: ''
      },
      repeatPassword: ''
    }
  },
  methods: {
    ...mapActions([
      'changePassword'
    ]),
    save () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    validationSuccess () {
      this.changePassword({
        data: this.data,
        callback: this.successChangePassword,
        fail: this.failChangePassword
      })
    },
    successChangePassword () {
      this.$toasted.success('Successfully updated password')
      this.$router.push({ name: 'profile' })
    },
    failChangePassword () {
      this.$toasted.error('Fail to update password')
    },
    cancel () {
      this.$router.push({ name: 'profile' })
    }
  }
}
