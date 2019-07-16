import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import BaseSelect from '@/components/BaseSelect'

export default {
  name: 'profile',
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea,
    BaseSelect
  },
  data () {
    return {
      maximumSizeAlert: false,
      avatarPreview: '',
      userDetail: {}
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  methods: {
    ...mapActions([
      'fetchProfile'
    ]),
    initPage () {
      this.fetchProfile({
        callback: this.successFetchProfile,
        fail: this.failFetchProfile
      })
    },
    successFetchProfile () {
      this.avatarPreview = this.profile.avatar
    },
    failFetchProfile () {
      this.$toasted.error('Fail to load profile')
    },
    goToChangePassword () {
      this.$router.push({ name: 'changePassword' })
    }
  }
}
