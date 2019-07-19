import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

export default {
  name: 'files',
  components: {
    BaseCard,
    BaseButton,
    ModalDeleteConfirmation
  },
  data () {
    return {
      isLoading: false,
      selectedId: '',
      previousFolderId: '',
      showDeleteConfirmationModal: false
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'accessList'
    ])
  },
  methods: {
    goToFolder () {},
    goToPreviousFolder () {},
    downloadFileFromUrl () {},
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    deleteThisFile () {}
  }
}
