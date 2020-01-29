import { mapActions, mapGetters } from 'vuex'
import MenuBar from '@/components/skeletons/MenuBar'
import NavBar from '@/components/skeletons/NavBar'
import MobileNavBar from '@/components/skeletons/MobileNavBar'
import BottomNavBar from '@/components/skeletons/BottomNavBar'
import Login from '@/components/login/Login'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseCard from '@/components/BaseCard'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs'
import ChangePageTitleMixins from '@/mixins/ChangePageTitleMixins'

export default {
  name: 'App',
  components: {
    MenuBar,
    NavBar,
    MobileNavBar,
    BottomNavBar,
    Login,
    BaseButton,
    BaseInput,
    BaseCard,
    Breadcrumbs
  },
  mixins: [
    ChangePageTitleMixins
  ],
  data () {
    return {
      viewKey: 0
    }
  },
  methods: {
    ...mapActions([
      'getMenuList'
    ]),
    updateViewKey () {
      this.viewKey += 1
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'bottomNavBarVisible'
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
