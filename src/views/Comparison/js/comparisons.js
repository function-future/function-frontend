import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
export default {
  name: 'Comparisons',
  components: {
    BaseCard,
    BaseButton,
    BaseInput,
    BaseSelect
  },
  data () {
    return {
      filters: [
        'Batch 1',
        'Batch 2',
        'Batch 3'
      ],
      sorts: [
        'Used Date',
        'Upload Date'
      ],
      selectedFilter: '',
      selectedSort: '',
      searchValue: '',
      isComplete: true
    }
  }
}
