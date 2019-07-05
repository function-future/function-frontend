import BaseCard from '@/components/BaseCard'
import SearchBar from '@/components/SearchBar'
import QuestionnaireCard from '../QuestionnaireCard'

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
  }
}
