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
      user: {
        name: '',
        phone: '',
        email: '',
        university: '',
        address: '',
        batch: '',
        division: ''
      }
    }
  }
}
