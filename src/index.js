import HeaderComp from '@/components/skeletons/HeaderComp'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseCard from '@/components/BaseCard'
import BaseTitle from '@/components/BaseTitle'
import UserBar from '@/components/UserBar'
import ChangePageTitleMixins from '@/mixins/ChangePageTitleMixins'

export default {
  name: 'App',
  components: {
    BaseTitle,
    HeaderComp,
    BaseButton,
    BaseInput,
    BaseCard,
    UserBar
  },
  mixins: [
    ChangePageTitleMixins
  ]
}
