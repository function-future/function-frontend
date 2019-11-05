import SkeletonBox from '@/components/skeletonBox/SkeletonBox'

export default {
  name: 'listItem',
  components: {
    SkeletonBox
  },
  props: {
    loading: {
      default: false,
      type: Boolean
    },
    simple: {
      default: false,
      type: Boolean
    },
    minHeight: {
      default: '60px',
      type: String
    }
  },
  inheritAttrs: false
}
