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
        image: '',
        name: '',
        phone: '',
        email: '',
        university: '',
        address: '',
        batch: '',
        division: ''
      }
    }
  },
  methods: {
    onFileChange (user, e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(user, files[0])
    },
    createImage (user, file) {
      let image = new Image()
      let reader = new FileReader()

      reader.onload = (e) => {
        user.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
