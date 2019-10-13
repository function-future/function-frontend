import { mapGetters } from 'vuex'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs'
import BaseTitle from '@/components/BaseTitle'

export default {
  name: 'NavBar',
  components: {
    Breadcrumbs,
    BaseTitle
  },
  computed: {
    ...mapGetters([
      'menuList',
      'currentUser'
    ])
  }
}
