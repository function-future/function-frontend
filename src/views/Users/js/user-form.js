import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import ModalProfilePicturePreview from '@/components/modals/ModalProfilePicturePreview'
import config from '@/config/index'

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea,
    ModalProfilePicturePreview
  },
  data () {
    return {
      imagePreview: '',
      newImage: '',
      maximumSizeAlert: false,
      visibleModal: false,
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
      this.newImage = e.target.files[0]
      let files = e.target.files || e.dataTransfer.files
      if (files[0].size > 1000000) {
        this.maximumSizeAlert = true
      } else {
        this.visibleModal = true
        this.createImage(files[0])
      }
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
      formData.append('image', this.newImage)
      //continue post logic
    },
    cancel () {
    },
    save () {}
  }
}
