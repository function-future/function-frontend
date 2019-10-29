import SkeletonBox from '@/components/skeletonBox/SkeletonBox'

export default {
  name: 'UserListItem',
  components: {
    SkeletonBox
  },
  props: {
    loading: {
      default: false,
      type: Boolean
    },
    imageUrl: {
      default: '',
      type: String
    }
  },
  inheritAttrs: false
}
