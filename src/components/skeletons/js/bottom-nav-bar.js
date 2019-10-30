import { mapGetters } from 'vuex'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs'

export default {
  name: 'NavBar',
  components: {
    Breadcrumbs
  },
  computed: {
    ...mapGetters([
      'menuList',
      'currentUser'
    ])
  }
}
