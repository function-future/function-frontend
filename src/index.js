import { mapActions, mapGetters } from 'vuex'
import MenuBar from '@/components/skeletons/MenuBar'
import NavBar from '@/components/skeletons/NavBar'
import Login from '@/components/Login/Login'
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
    Login,
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
    showLoginModal () {
      return this.$route.query.auth === 'login'
    }
  },
  watch: {
    currentUser () {
      this.getMenuList()
    }
  }
}
