import { mapActions } from 'vuex'

export default {
  name: 'changePassword',
  props: [ 'mobile' ],
  data () {
    return {
      data: {
        oldPassword: '',
        newPassword: ''
      },
      repeatPassword: '',
      showErrorMessage: false,
      isSubmitting: false
    }
  },
  methods: {
    ...mapActions([
      'changePassword',
      'toast'
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
      this.isSubmitting = true
      this.changePassword({
        data: this.data,
        callback: this.successChangePassword,
        fail: this.failChangePassword
      })
    },
    successChangePassword () {
      this.toast({
        data: {
          message: 'Successfully updated password',
          type: 'is-success'
        }
      })
      this.isSubmitting = false
      this.$router.push({ name: this.mobile ? 'account' : 'profile' })
    },
    failChangePassword (error) {
      this.isSubmitting = false
      if (error.response.status === 401) {
        this.showErrorMessage = true
        this.data.oldPassword = ''
        this.data.newPassword = ''
        this.repeatPassword = ''
        return
      }
      this.toast({
        data: {
          message: 'Fail to update password',
          type: 'is-danger'
        }
      })
    },
    cancel () {
      this.$router.push({ name: this.mobile ? 'account' : 'profile' })
    }
  }
}
