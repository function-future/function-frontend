import Breakpoint from '@/mixins/Breakpoint'
export default {
  name: 'CustomMobileNavBar',
  mixins: [
    Breakpoint
  ],
  props: {
    title: String
  }
}
