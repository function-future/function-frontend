import { mapActions, mapGetters } from 'vuex'
import MenuBar from '@/components/skeletons/MenuBar'
import NavBar from '@/components/skeletons/NavBar'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseCard from '@/components/BaseCard'
import BaseTitle from '@/components/BaseTitle'
import UserBar from '@/components/UserBar'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs'
import ChangePageTitleMixins from '@/mixins/ChangePageTitleMixins'

export default {
  name: 'App',
  components: {
    BaseTitle,
    MenuBar,
    NavBar,
    BaseButton,
    BaseInput,
    BaseCard,
    UserBar,
    Breadcrumbs
  },
  mixins: [
    ChangePageTitleMixins
  ],
  methods: {
    ...mapActions([
      'getMenuList'
    ])
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    isLoginPage () {
      return this.$route.path === '/login'
    }
  },
  watch: {
    currentUser () {
      this.getMenuList()
    }
  }
}
