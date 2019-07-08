import BaseCard from '@/components/BaseCard'
import SearchBar from '@/components/SearchBar'
import QuestionnaireCard from '../QuestionnaireCard'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MyQuestionnaire',
  components: {
    BaseCard,
    SearchBar,
    QuestionnaireCard
  },
  data () {
    return {
      test: 'Helloworld',
      description: 'abcdefghijklaksdmfnasodiflkasdnfilaskdfialsdkfnoiasdlfknaisldfkskdfjiasdlfkjasoidfjlkasjdiflaskdjfilaskdfjiwoa;ldfkapsdfoasdasdasdasdasdjaslkdfjieslaimdflkmvklasjdifalsdkfmjasielamsdlfkmsaidflisajdflkjaisdld;laskd;lask;ldk',
      startdate: 1562319329000,
      duedate: 1562492129000
    }
  },
  computed: {
    ...mapGetters([
      'myQuestionnaires'
    ])
  },
  methods: {
    ...mapActions([
      'fetchMyQuestionnaires'
    ]),
    ...mapMutations([
      'RESET_MY_QUESTIONNAIRE',
      'PUSH_MY_QUESTIONNAIRE'
    ])
  },
  destroyed () {
    this.RESET_MY_QUESTIONNAIRES()
  }
}
