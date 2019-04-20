import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
export default {
  name: 'Assignment',
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
        'Title',
        'Deadline',
        'Upload Date'
      ],
      selectedFilter: '',
      selectedSort: '',
      searchValue: '',
      isComplete: true
    }
  }
}
