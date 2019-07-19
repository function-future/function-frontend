import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  name: 'JudgingDetail',
  components: {
    BaseInput,
    BaseCard,
    BaseButton,
    BaseTextArea
  },
  data () {
    return {

    }
  },
  created () {

  },
  computed: {

  },
  methods: {
    goToComparison () {
      this.$router.push({
        name: 'comparison',
        params: {
          judgingId: this.$route.params.judgingId
        }
      })
    }
  }
}
