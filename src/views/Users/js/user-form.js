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
      imagePreview: '',
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
    onFileChange (e) {
      this.user.image = e.target.files[0]
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage (file) {
      let reader = new FileReader()

      reader.onload = (e) => {
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    imageUpload () {
      let formData = new FormData()
      formData.append('myFile', this.user.image, this.user.image.name)
      //continue post logic
    }
  }
}
