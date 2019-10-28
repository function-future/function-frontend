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
    }
  },
  inheritAttrs: false
}
